import type { Metadata } from "next";
import { Leaf, Recycle, Droplets } from "lucide-react";
import SubpageNavbar from "@/components/layout/SubpageNavbar";

export const metadata: Metadata = {
    title: "Sürdürülebilirlik | AURA",
    description: "AURA sürdürülebilirlik taahhüdü. Organik hammaddeler, sıfır atık hedefi ve karbon nötr teslimat.",
};

export default function SustainabilityPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <SubpageNavbar />

            <section className="max-w-4xl mx-auto px-6 sm:px-12 py-24 space-y-20">
                <div className="space-y-6">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Sürdürülebilirlik</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium md:text-lg max-w-xl leading-relaxed">
                        Lüks, gezegenin pahasına olmamalı. AURA olarak sorumlu üretim ve bilinçli tüketimi destekliyoruz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-4">
                        <Leaf size={28} className="text-zinc-400" />
                        <h3 className="text-lg font-black uppercase tracking-tight">Organik Hammaddeler</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                            Koleksiyonlarımızın %70&apos;i organik sertifikalı pamuk, keten ve geri dönüştürülmüş polyester kullanılarak üretilmektedir.
                        </p>
                    </div>
                    <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-4">
                        <Recycle size={28} className="text-zinc-400" />
                        <h3 className="text-lg font-black uppercase tracking-tight">Sıfır Atık Hedefi</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                            2026 yılı itibarıyla üretim süreçlerimizdeki tekstil atığını %90 oranında azaltmayı hedefliyoruz.
                        </p>
                    </div>
                    <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-4">
                        <Droplets size={28} className="text-zinc-400" />
                        <h3 className="text-lg font-black uppercase tracking-tight">Su Tasarrufu</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                            Boyama süreçlerimizde geleneksel yöntemlere kıyasla %60 daha az su tüketimi sağlayan teknolojiler kullanıyoruz.
                        </p>
                    </div>
                </div>

                <div className="space-y-6 pt-12 border-t border-zinc-200 dark:border-zinc-900">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Karbon Nötr Teslimat</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
                        Tüm kargo ve lojistik operasyonlarımızda oluşan karbon ayak izini, sertifikalı ağaçlandırma projeleri ve yenilenebilir enerji yatırımlarıyla dengeliyoruz.
                    </p>
                </div>
            </section>
        </main>
    );
}
