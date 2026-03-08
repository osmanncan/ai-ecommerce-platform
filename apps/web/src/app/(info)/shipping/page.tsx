import type { Metadata } from "next";
import { Truck, Clock, Globe } from "lucide-react";
import SubpageNavbar from "@/components/layout/SubpageNavbar";

export const metadata: Metadata = {
    title: "Kargo ve Teslimat | AURA",
    description: "AURA kargo seçenekleri, teslimat süreleri ve lüks paketleme hizmeti.",
};

export default function ShippingPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <SubpageNavbar />

            <section className="max-w-4xl mx-auto px-6 sm:px-12 py-24 space-y-20">
                <div className="space-y-6">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Kargo ve Teslimat</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium md:text-lg max-w-xl leading-relaxed">
                        Siparişiniz, AURA kalitesiyle özenle paketlenip en kısa sürede kapınıza ulaşır.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-4">
                        <Truck size={28} className="text-zinc-400" />
                        <h3 className="text-lg font-black uppercase tracking-tight">Standart Kargo</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">2-4 iş günü. 500 TL ve üzeri siparişlerde ücretsiz.</p>
                    </div>
                    <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-4">
                        <Clock size={28} className="text-zinc-400" />
                        <h3 className="text-lg font-black uppercase tracking-tight">Ekspres Kargo</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">Aynı gün veya ertesi gün teslimat. 14:00&apos;e kadar verilen siparişler geçerlidir.</p>
                    </div>
                    <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-4">
                        <Globe size={28} className="text-zinc-400" />
                        <h3 className="text-lg font-black uppercase tracking-tight">Uluslararası</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">12 ülkeye teslimat. 5-10 iş günü arasında teslimat süresi.</p>
                    </div>
                </div>

                <div className="space-y-8 pt-12 border-t border-zinc-200 dark:border-zinc-900">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Takip ve Bildirimler</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
                        Siparişiniz kargoya verildiği anda SMS ve e-posta ile bilgilendirilirsiniz. Kargo takip numaranız ile anında teslimat durumunu sorgulayabilirsiniz.
                    </p>
                </div>

                <div className="space-y-8 pt-12 border-t border-zinc-200 dark:border-zinc-900">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Lüks Paketleme</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
                        Her AURA siparişi, markanın ikonik mat siyah kutusunda, ipek kağıt ve koruyucu tülbentle sarılarak gönderilir. Sürdürülebilir materyallerden üretilen ambalajlarımız tamamen geri dönüştürülebilirdir.
                    </p>
                </div>
            </section>
        </main>
    );
}
