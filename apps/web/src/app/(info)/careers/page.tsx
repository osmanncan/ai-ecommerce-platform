import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import SubpageNavbar from "@/components/layout/SubpageNavbar";

export const metadata: Metadata = {
    title: "Kariyer | AURA",
    description: "AURA kariyer fırsatları. Modanın geleceğini birlikte inşa edecek takım arkadaşları arıyoruz.",
};

const positions = [
    { title: "Senior Full-Stack Geliştirici", dept: "Mühendislik", type: "Tam Zamanlı", location: "İstanbul / Remote" },
    { title: "AI / ML Mühendisi", dept: "Veri Bilimi", type: "Tam Zamanlı", location: "İstanbul / Remote" },
    { title: "UX/UI Tasarımcı", dept: "Tasarım", type: "Tam Zamanlı", location: "İstanbul" },
    { title: "Dijital Pazarlama Uzmanı", dept: "Pazarlama", type: "Tam Zamanlı", location: "Remote" },
];

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <SubpageNavbar />

            <section className="max-w-4xl mx-auto px-6 sm:px-12 py-24 space-y-20">
                <div className="space-y-6">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Kariyer</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium md:text-lg max-w-xl leading-relaxed">
                        Modanın geleceğini birlikte inşa edecek vizyoner takım arkadaşları arıyoruz. AURA&apos;da her gün sınırları zorluyoruz.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Açık Pozisyonlar</h3>
                    {positions.map((pos) => (
                        <div key={pos.title} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-zinc-200 dark:border-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group cursor-pointer">
                            <div className="space-y-1">
                                <h4 className="text-base font-bold group-hover:underline underline-offset-4 decoration-1">{pos.title}</h4>
                                <p className="text-xs text-zinc-500 font-medium">{pos.dept}</p>
                            </div>
                            <div className="flex items-center gap-6 mt-4 md:mt-0">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{pos.type}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{pos.location}</span>
                                <Briefcase size={16} className="text-zinc-400" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-10 space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-tight">Spontan Başvuru</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-lg">
                        Listelenen pozisyonlar dışında da yetenekli insanları ekibimize katmak istiyoruz. CV&apos;nizi ve kısa bir motivasyon mektubunu <span className="text-zinc-900 dark:text-white font-bold">kariyer@aura.com</span> adresine gönderin.
                    </p>
                </div>
            </section>
        </main>
    );
}
