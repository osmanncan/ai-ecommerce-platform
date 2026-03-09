import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { MOCK_PRODUCTS } from "@ai-first/shared";

export const dynamic = "force-dynamic";

// --- Rate Limiter ---
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 dakika
const RATE_LIMIT_MAX = 10; // dakikada max istek
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

function buildProductCatalog(products: any[]): string {
    return products.map(p =>
        `- [ID:${p.id}] ${p.name} | ${p.category} | ${p.price} TL | ${p.stock > 0 ? 'Stokta' : 'Tükendi'} | ${p.description}`
    ).join('\n');
}

function cleanupRateLimitMap(now: number) {
    if (rateLimitMap.size < 1000) {
        return;
    }

    for (const [key, value] of rateLimitMap.entries()) {
        if (now > value.resetAt) {
            rateLimitMap.delete(key);
        }
    }
}

function validateMessages(messages: unknown) {
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
        return false;
    }

    return messages.every((message) => {
        if (!message || typeof message !== 'object') {
            return false;
        }

        const candidate = message as { role?: unknown; content?: unknown };
        return (
            (candidate.role === 'user' || candidate.role === 'assistant')
            && typeof candidate.content === 'string'
            && candidate.content.trim().length > 0
            && candidate.content.length <= MAX_MESSAGE_LENGTH
        );
    });
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
        // Rate limit kontrolü
        const now = Date.now();
        cleanupRateLimitMap(now);

        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Çok fazla istek gönderdiniz. Lütfen biraz bekleyin." },
                { status: 429 }
            );
        }

        const { messages } = await req.json();

        if (!validateMessages(messages)) {
            return NextResponse.json(
                { error: "Geçersiz sohbet verisi gönderildi." },
                { status: 400 }
            );
        }

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
            ...messages.slice(-MAX_MESSAGES).map((msg: any) => ({
                role: msg.role as "user" | "assistant",
                content: msg.content.trim(),
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
            { error: "AI servisi şu an yanıt veremiyor." },
            { status: 500 }
        );
    }
}
