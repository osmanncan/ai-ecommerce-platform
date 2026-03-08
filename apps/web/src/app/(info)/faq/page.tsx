import type { Metadata } from "next";
import SubpageNavbar from "@/components/layout/SubpageNavbar";
import FAQAccordion from "@/components/faq/FAQAccordion";

export const metadata: Metadata = {
    title: "S.S.S. | AURA",
    description: "AURA sıkça sorulan sorular. Kargo, iade, ödeme ve AI stil küratörü hakkında bilgi.",
};

const faqs = [
    { q: "Sipariş verdikten sonra ne kadar sürede teslim edilir?", a: "Standart siparişler 2-4 iş günü içinde teslim edilir. Aynı gün kargo seçeneği ile saat 14:00'e kadar verilen siparişler aynı gün kargoya verilir. Uluslararası gönderimler yaklaşık 5-10 iş günü sürer." },
    { q: "İade süreci nasıl işliyor?", a: "Ürününüzü teslim aldıktan sonra 30 gün içinde iade edebilirsiniz. İade talebi oluşturduktan sonra kurye adresinize gelir, ürünü teslim alır. İade onaylandıktan sonra ödemeniz 3-5 iş günü içinde iade edilir." },
    { q: "Beden değişikliği yapabilir miyim?", a: "Evet. İade sürecinden geçmeden doğrudan beden değişikliği talep edebilirsiniz. Hesabınızdaki sipariş detaylarından 'Beden Değiştir' seçeneğini kullanmanız yeterlidir." },
    { q: "AI Stil Küratörü nasıl çalışır?", a: "AURA'nın yapay zeka motoru, beğenilerinizi, geçmiş alışverişlerinizi ve stil tercihlerinizi analiz ederek size kişiselleştirilmiş ürün önerileri sunar. Küratör Notu, her üründe sizin için özel bir stil rehberliği sağlar." },
    { q: "Ödeme seçenekleri nelerdir?", a: "Kredi kartı (Visa, Mastercard, Amex), banka kartı, havale/EFT ve kapıda ödeme (nakit/kart) seçeneklerini destekliyoruz. Ayrıca 3, 6 ve 9 taksit imkanı sunuyoruz." },
    { q: "Ürünler orijinal mi?", a: "AURA'da satılan tüm ürünler %100 orijinal ve garantilidir. Her ürün, tedarikçilerden doğrudan temin edilmekte ve kalite kontrol sürecinden geçmektedir." },
    { q: "Hediye paketi yaptırabilir miyim?", a: "Evet. Sipariş sırasında 'Lüks Hediye Paketi' seçeneğini işaretleyebilirsiniz. AURA imzalı özel kutu, ipek kurdele ve el yazısıyla yazılmış not kartı ile gönderilir. Bu hizmet ücretsizdir." },
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <SubpageNavbar />

            <section className="max-w-3xl mx-auto px-6 sm:px-12 py-24 space-y-16">
                <div className="space-y-6">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">S.S.S.</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-lg">Sıkça sorulan sorular ve cevapları.</p>
                </div>

                <FAQAccordion faqs={faqs} />
            </section>
        </main>
    );
}
