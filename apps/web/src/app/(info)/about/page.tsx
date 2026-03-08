import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import SubpageNavbar from "@/components/layout/SubpageNavbar";

export const metadata: Metadata = {
    title: "Hakkımızda | AURA",
    description: "AURA - Teknoloji ile kumaşın buluştuğu nokta. AI destekli lüks moda platformu.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <SubpageNavbar />

            <section className="relative h-[50vh] bg-zinc-900 overflow-hidden flex items-end">
                <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="About AURA" />
                <div className="relative z-10 p-8 md:p-16 max-w-4xl">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-white leading-[0.9]">
                        Hakkımızda
                    </h1>
                    <p className="text-white/60 text-sm md:text-base font-medium mt-4 max-w-lg">Teknoloji ile kumaşın buluştuğu nokta.</p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-6 sm:px-12 py-24 space-y-20">
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <Sparkles size={16} className="text-zinc-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Vizyonumuz</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
                        Moda, Veri ve <br /><span className="italic font-serif font-light lowercase text-zinc-500">Sezginin Sentezi.</span>
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed md:text-lg max-w-2xl">
                        AURA, 2024 yılında geleneksel e-ticaretin sınırlarını aşmak amacıyla kuruldu. Amacımız, yapay zeka destekli kişiselleştirme teknolojileri ile kullanıcıya özel, akıllı ve estetik bir alışveriş deneyimi sunmaktır.
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed md:text-lg max-w-2xl">
                        Milyonlarca stil verisini analiz eden algoritmalarımız, her kullanıcının aurasına uygun kapsül koleksiyonlar oluşturur. Biz sadece ürün satmıyoruz; bir stil partneri, bir dijital küratör sunuyoruz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-zinc-200 dark:border-zinc-900">
                    <div className="space-y-4">
                        <h3 className="text-4xl font-black">50K+</h3>
                        <p className="text-sm text-zinc-500 font-medium">Aktif Kullanıcı</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-4xl font-black">%94</h3>
                        <p className="text-sm text-zinc-500 font-medium">Ortalama Stil Uyum Oranı</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-4xl font-black">12</h3>
                        <p className="text-sm text-zinc-500 font-medium">Ülkeye Teslimat</p>
                    </div>
                </div>

                <div className="space-y-8 pt-12 border-t border-zinc-200 dark:border-zinc-900">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Ekibimiz</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
                        AURA&apos;nın arkasında moda, mühendislik ve veri bilimi alanlarında deneyimli, disiplinler arası bir ekip bulunmaktadır. Tasarım kararlarımızı veriye dayalı içgörülerle, teknoloji kararlarımızı ise estetik hassasiyetle alırız.
                    </p>
                </div>
            </section>
        </main>
    );
}
