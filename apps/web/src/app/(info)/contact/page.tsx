import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import SubpageNavbar from "@/components/layout/SubpageNavbar";

export const metadata: Metadata = {
    title: "İletişim | AURA",
    description: "AURA ile iletişime geçin. 7/24 destek hattı, e-posta ve canlı sohbet.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <SubpageNavbar />

            <section className="max-w-4xl mx-auto px-6 sm:px-12 py-24 space-y-20">
                <div className="space-y-6">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">İletişim</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium md:text-lg max-w-xl leading-relaxed">
                        Sorularınız, önerileriniz veya işbirliği teklifleriniz için bize ulaşın. 7/24 yanınızdayız.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-4 flex items-start gap-4">
                        <Mail size={22} className="text-zinc-400 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider">E-Posta</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">destek@aura.com</p>
                            <p className="text-[10px] text-zinc-400 font-medium mt-2">Ortalama yanıt süresi: 2 saat</p>
                        </div>
                    </div>
                    <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-4 flex items-start gap-4">
                        <Phone size={22} className="text-zinc-400 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider">Telefon</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">+90 (212) 555 00 00</p>
                            <p className="text-[10px] text-zinc-400 font-medium mt-2">Pazartesi - Cuma, 09:00 - 18:00</p>
                        </div>
                    </div>
                    <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-4 flex items-start gap-4">
                        <MessageSquare size={22} className="text-zinc-400 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider">Canlı Destek</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">7/24 aktif AI destekli sohbet</p>
                            <p className="text-[10px] text-zinc-400 font-medium mt-2">Anında yanıt</p>
                        </div>
                    </div>
                    <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-4 flex items-start gap-4">
                        <MapPin size={22} className="text-zinc-400 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider">Genel Merkez</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">Levent, İstanbul, Türkiye</p>
                            <p className="text-[10px] text-zinc-400 font-medium mt-2">Randevulu ziyaret</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
