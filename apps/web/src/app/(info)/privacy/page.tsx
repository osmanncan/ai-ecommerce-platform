import type { Metadata } from "next";
import SubpageNavbar from "@/components/layout/SubpageNavbar";

export const metadata: Metadata = {
    title: "Gizlilik Politikası | AURA",
    description: "AURA gizlilik politikası. Verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <SubpageNavbar />

            <section className="max-w-3xl mx-auto px-6 sm:px-12 py-24 space-y-16">
                <div className="space-y-4">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Gizlilik Politikası</h1>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Son güncelleme: 1 Ocak 2026</p>
                </div>

                <div className="space-y-12 text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">1. Toplanan Veriler</h3>
                        <p>AURA olarak hizmetlerimizi sunabilmek için şu verileri toplarız: ad-soyad, e-posta adresi, teslimat adresi, telefon numarası, ödeme bilgileri (şifreli olarak işlenir), sipariş geçmişi, tarayıcı ve cihaz bilgileri, çerez verileri ve stil tercihleriniz.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">2. Verilerin Kullanımı</h3>
                        <p>Topladığımız verileri şu amaçlarla kullanırız: siparişlerinizi işlemek, kişiselleştirilmiş stil önerileri sunmak (AI Küratör), müşteri desteği sağlamak, yasal yükümlülükleri yerine getirmek ve platformumuzu geliştirmek. Verileriniz hiçbir koşulda üçüncü taraflara satılmaz.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">3. Yapay Zeka ve Kişiselleştirme</h3>
                        <p>AURA&apos;nın AI motoru, stil tercihleriniz ve alışveriş geçmişiniz üzerinden analiz yaparak kişiselleştirilmiş ürün önerileri oluşturur. Bu analizler tamamen anonim hale getirilmiş veriler üzerinden çalışır ve kişisel bilgileriniz AI modeline doğrudan aktarılmaz.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">4. Çerezler</h3>
                        <p>Platformumuzda deneyiminizi iyileştirmek için çerezler kullanılmaktadır. Zorunlu çerezler site işlevselliği için gereklidir. Analitik çerezler anonim kullanım verileri toplar. Pazarlama çerezleri ise onayınız dahilinde kişiselleştirilmiş reklamlar sunar.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">5. Veri Güvenliği</h3>
                        <p>Tüm kişisel verileriniz SSL/TLS şifreleme (256-bit) ile korunur. Ödeme bilgileriniz PCI DSS standartlarına uygun olarak işlenir ve saklanır. Sunucularımız Avrupa Birliği sınırları içerisinde, GDPR uyumlu veri merkezlerinde barındırılmaktadır.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">6. Haklarınız</h3>
                        <p>KVKK ve GDPR kapsamında şu haklara sahipsiniz: verilerinize erişim hakkı, düzeltme hakkı, silme hakkı (unutulma hakkı), veri taşınabilirliği hakkı ve işleme itiraz hakkı. Talepleriniz için destek@aura.com adresinden bize ulaşabilirsiniz.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">7. İletişim</h3>
                        <p>Gizlilik politikasıyla ilgili sorularınız için: destek@aura.com adresine e-posta gönderebilir veya +90 (212) 555 00 00 numaralı hattımızı arayabilirsiniz.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
