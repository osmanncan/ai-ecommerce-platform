import type { Metadata } from "next";
import { RotateCcw, CheckCircle } from "lucide-react";
import SubpageNavbar from "@/components/layout/SubpageNavbar";

export const metadata: Metadata = {
    title: "İade Politikası | AURA",
    description: "AURA iade politikası. 30 gün koşulsuz iade garantisi.",
};

export default function ReturnsPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <SubpageNavbar />

            <section className="max-w-4xl mx-auto px-6 sm:px-12 py-24 space-y-20">
                <div className="space-y-6">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">İade Politikası</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium md:text-lg max-w-xl leading-relaxed">
                        AURA&apos;da müşteri memnuniyeti en öncelikli taahhüdümüzdür. Koşulsuz, zahmetsiz iade garantisi sunuyoruz.
                    </p>
                </div>

                <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">İade Süreci</h3>
                    <div className="space-y-4">
                        {[
                            { step: "01", title: "İade Talebi Oluşturun", desc: "Hesabınızdaki sipariş detaylarından veya müşteri hizmetleri üzerinden iade talebinizi başlatın." },
                            { step: "02", title: "Ürünü Hazırlayın", desc: "Ürünü orijinal ambalajında, etiketleri çıkarmadan ve kullanılmamış durumda hazırlayın." },
                            { step: "03", title: "Kurye Gelir", desc: "Kurye, belirttiğiniz adrese gelerek ürünü teslim alır. Ek bir kargo ücreti ödemenize gerek yoktur." },
                            { step: "04", title: "İade Onayı", desc: "Ürün tarafımıza ulaştıktan sonra 1-2 iş günü içinde kontrol edilir ve iade onaylanır." },
                            { step: "05", title: "Ödeme İadesi", desc: "Onay sonrası 3-5 iş günü içinde ödemeniz aynı yöntemle iade edilir." },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 p-6 border border-zinc-200 dark:border-zinc-900">
                                <span className="text-3xl font-black text-zinc-200 dark:text-zinc-800 shrink-0">{item.step}</span>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold">{item.title}</h4>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <RotateCcw size={20} className="text-zinc-400" />
                        <h3 className="text-lg font-black uppercase tracking-tight">Önemli Notlar</h3>
                    </div>
                    <ul className="space-y-3">
                        {[
                            "İade süresi, ürünün teslim alınmasından itibaren 30 takvim günüdür.",
                            "İç giyim, mayo ve kişisel bakım ürünleri hijyen nedeniyle iade edilemez.",
                            "İndirimli ürünlerde de aynı iade koşulları geçerlidir.",
                            "Beden değişikliği talepleri doğrudan işleme alınır.",
                        ].map((note) => (
                            <li key={note} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                                <CheckCircle size={16} className="text-zinc-400 shrink-0 mt-0.5" />
                                {note}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
