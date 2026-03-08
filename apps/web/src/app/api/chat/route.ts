import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { MOCK_PRODUCTS } from "@ai-first/shared";

export const dynamic = "force-dynamic";

function buildProductCatalog(products: any[]): string {
    return products.map(p =>
        `- [ID:${p.id}] ${p.name} | ${p.category} | ${p.price} TL | ${p.stock > 0 ? 'Stokta' : 'TÃ¼kendi'} | ${p.description}`
    ).join('\n');
}

const BASE_SYSTEM_PROMPT = `Sen AURA adlÄ± lÃ¼ks bir moda e-ticaret platformunun yapay zeka destekli stil danÄ±ÅŸmanÄ±sÄ±n.

GÃ¶revin:
- KullanÄ±cÄ±lara kiÅŸiselleÅŸtirilmiÅŸ stil ve kombin Ã¶nerileri sunmak
- Moda trendleri hakkÄ±nda bilgi vermek
- Etkinliklere uygun kÄ±yafet Ã¶nerileri yapmak
- Renk uyumu, kumaÅŸ kalitesi ve stil ilkeleri hakkÄ±nda rehberlik etmek
- AURA maÄŸazasÄ±ndaki gerÃ§ek Ã¼rÃ¼nleri Ã¶nermek

Kurallar:
- Her zaman profesyonel, zarif ve samimi ol
- CevaplarÄ±nÄ± kÄ±sa ve Ã¶z tut (maksimum 3-4 paragraf)
- KullanÄ±cÄ±nÄ±n bÃ¼tÃ§esine ve tarzÄ±na saygÄ± gÃ¶ster
- TÃ¼rkÃ§e ve Ä°ngilizce konuÅŸabilirsin, kullanÄ±cÄ±nÄ±n dilinde yanÄ±t ver
- Emoji kullanma, profesyonel kal

Ã–NEMLÄ° - ÃœrÃ¼n Ã–nerme KurallarÄ±:
- Bir Ã¼rÃ¼n Ã¶nerdiÄŸinde mutlaka aÅŸaÄŸÄ±daki formatta yaz (bu format kullanÄ±cÄ±ya Ã¼rÃ¼n kartÄ± olarak gÃ¶sterilecek):
  [[PRODUCT:Ã¼rÃ¼n_id]]
- Ã–rneÄŸin "Onyx Deri Biker Ceket" Ã¶nermek istiyorsan: [[PRODUCT:1]]
- Ã–nce Ã¼rÃ¼nÃ¼ neden Ã¶nerdiÄŸini aÃ§Ä±kla, sonra Ã¼rÃ¼n etiketini koy
- Sadece aÅŸaÄŸÄ±daki katalogda bulunan Ã¼rÃ¼nleri Ã¶ner, uydurma
- Stokta olmayan Ã¼rÃ¼nleri Ã¶nerme
- Bir yanÄ±tta en fazla 3-4 Ã¼rÃ¼n Ã¶ner, daha fazla olmasÄ±n
- Kombin Ã¶nerirken birbirine uyumlu Ã¼rÃ¼nleri seÃ§

Sen bir moda uzmanÄ±sÄ±n ve AURA markasÄ±nÄ±n premium deÄŸerlerini temsil ediyorsun.`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Groq API key yapÄ±landÄ±rÄ±lmamÄ±ÅŸ." },
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
        const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\n--- AURA ÃœRÃœN KATALOÄžU ---\n${catalog}\n--- KATALOG SONU ---`;

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

        const response = chatCompletion.choices[0]?.message?.content || "YanÄ±t oluÅŸturulamadÄ±.";

        return NextResponse.json({ content: response, products });
    } catch (error: any) {
        console.error("Groq API Error:", error);
        return NextResponse.json(
            { error: error.message || "AI servisi ÅŸu an yanÄ±t veremiyor." },
            { status: 500 }
        );
    }
}
