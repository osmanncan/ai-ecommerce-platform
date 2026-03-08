import type { Metadata } from "next";
import SubpageNavbar from "@/components/layout/SubpageNavbar";

export const metadata: Metadata = {
    title: "Kullanım Koşulları | AURA",
    description: "AURA kullanım koşulları ve hizmet şartları.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <SubpageNavbar />

            <section className="max-w-3xl mx-auto px-6 sm:px-12 py-24 space-y-16">
                <div className="space-y-4">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Kullanım Koşulları</h1>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Son güncelleme: 1 Ocak 2026</p>
                </div>

                <div className="space-y-12 text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">1. Genel Hükümler</h3>
                        <p>Bu web sitesini (aura.com) kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. AURA, bu koşulları önceden haber vermeksizin değiştirme hakkını saklı tutar.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">2. Hesap Sorumluluğu</h3>
                        <p>Kullanıcılar, hesap bilgilerinin gizliliğinden ve hesapları üzerinden gerçekleştirilen tüm işlemlerden sorumludur.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">3. Ürün ve Fiyatlandırma</h3>
                        <p>AURA, ürün bilgileri ve fiyatlarda olası hataları düzeltme hakkını saklı tutar. Ürün görselleri referans amaçlıdır; gerçek ürün farklılık gösterebilir. Fiyatlar KDV dahildir.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">4. Sipariş ve Ödeme</h3>
                        <p>Sipariş vermek, bir satın alma teklifi niteliğindedir. AURA, siparişi onaylama veya reddetme hakkını saklı tutar. Ödeme, sipariş onaylandığında işleme alınır.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">5. Fikri Mülkiyet</h3>
                        <p>Bu web sitesindeki tüm içerik AURA&apos;nın fikri mülkiyetidir ve telif hakları ile korunmaktadır. İçeriğin izinsiz kopyalanması yasaktır.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">6. Sorumluluk Sınırlaması</h3>
                        <p>AURA, web sitesinin kesintisiz veya hatasız çalışacağını garanti etmez. Kullanıcılar, siteyi kendi risk ve sorumluluklarında kullanır.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">7. Uygulanacak Hukuk</h3>
                        <p>Bu koşullar, Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda İstanbul Mahkemeleri yetkilidir.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
