import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { MOCK_PRODUCTS } from "@ai-first/shared";

export const dynamic = "force-dynamic";

function buildProductCatalog(products: any[]): string {
    return products.map(p =>
        `- [ID:${p.id}] ${p.name} | ${p.category} | ${p.price} TL | ${p.stock > 0 ? 'Stokta' : 'Tükendi'} | ${p.description}`
    ).join('\n');
}

const BASE_SYSTEM_PROMPT = `Sen AURA adlı lüks bir moda e-ticaret platformunun yapay zeka destekli stil danışmanısın.

Görevin:
- Kullanıcılara kişiselleştirilmiş stil ve kombin önerileri sunmak
- Moda trendleri hakkında bilgi vermek
- Etkinliklere uygun kıyafet önerileri yapmak
- Renk uyumu, kumaş kalitesi ve stil ilkeleri hakkında rehberlik etmek
- AURA mağazasındaki gerçek ürünleri önermek

Kurallar:
- Her zaman profesyonel, zarif ve samimi ol
- Cevaplarını kısa ve öz tut (maksimum 3-4 paragraf)
- Kullanıcının bütçesine ve tarzına saygı göster
- Türkçe ve İngilizce konuşabilirsin, kullanıcının dilinde yanıt ver
- Emoji kullanma, profesyonel kal

ÖNEMLİ - Ürün Önerme Kuralları:
- Bir ürün önerdiğinde mutlaka aşağıdaki formatta yaz (bu format kullanıcıya ürün kartı olarak gösterilecek):
  [[PRODUCT:ürün_id]]
- Örneğin "Onyx Deri Biker Ceket" önermek istiyorsan: [[PRODUCT:1]]
- Önce ürünü neden önerdiğini açıkla, sonra ürün etiketini koy
- Sadece aşağıdaki katalogda bulunan ürünleri öner, uydurma
- Stokta olmayan ürünleri önerme
- Bir yanıtta en fazla 3-4 ürün öner, daha fazla olmasın
- Kombin önerirken birbirine uyumlu ürünleri seç

Sen bir moda uzmanısın ve AURA markasının premium değerlerini temsil ediyorsun.`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Groq API key yapılandırılmamış." },
                { status: 500 }
            );
        }

        let products: any[] = [];
        try {
            const { data, error } = await supabase
                .from('products')
                .select('id, name, description, price, category, stock')
                .gt('stock', 0);

            if (data && data.length > 0) {
                products = data;
            } else {
                products = MOCK_PRODUCTS.filter(p => (p.stock ?? 0) > 0);
            }
        } catch {
            products = MOCK_PRODUCTS.filter(p => (p.stock ?? 0) > 0);
        }

        const catalog = buildProductCatalog(products);
        const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\n--- AURA ÜRÜN KATALOĞU ---\n${catalog}\n--- KATALOG SONU ---`;

        const groq = new Groq({ apiKey });

        const groqMessages = [
            { role: "system" as const, content: systemPrompt },
            ...messages.map((msg: any) => ({
                role: msg.role as "user" | "assistant",
                content: msg.content,
            })),
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages: groqMessages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
        });

        const response = chatCompletion.choices[0]?.message?.content || "Yanıt oluşturulamadı.";

        return NextResponse.json({ content: response, products });
    } catch (error: any) {
        console.error("Groq API Error:", error);
        return NextResponse.json(
            { error: error.message || "AI servisi şu an yanıt veremiyor." },
            { status: 500 }
        );
    }
}
