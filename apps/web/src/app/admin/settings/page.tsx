"use client";

import { Save, Store, CreditCard, Building, Globe, Mail, Shield, Smartphone } from "lucide-react";

export default function AdminSettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-zinc-900 leading-none">Ayarlar</h1>
                    <p className="text-zinc-400 text-sm mt-2 font-medium">MaÄŸaza tercihlerini ve sistem yapÄ±landÄ±rmalarÄ±nÄ± yÃ¶netin.</p>
                </div>
                <button className="px-8 py-4 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-xl shadow-zinc-900/10 active:scale-95">
                    <Save size={16} /> DeÄŸiÅŸiklikleri Kaydet
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-3 space-y-1 z-10 sticky top-28">
                    {[
                        { title: "Kargo & Teslimat", icon: Building },
                        { title: "Ã‡oklu Dil", icon: Globe },
                        { title: "GÃ¶rÃ¼nÃ¼m", icon: Smartphone },
                        { title: "GÃ¼venlik", icon: Shield }
                    ].map((item, idx) => (
                        <button key={item.title} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${idx === 0 ? 'bg-white shadow-md text-black border border-zinc-200/50' : 'text-zinc-500 hover:bg-white/50 hover:text-black'
                            }`}>
                            <item.icon size={18} className={idx === 0 ? 'text-zinc-900' : 'text-zinc-400'} /> {item.title}
                        </button>
                    ))}
                </div>
                <div className="lg:col-span-9 space-y-8">
                    <div className="bg-white rounded-[32px] border border-zinc-200 p-10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-50 rounded-full blur-3xl -z-10 group-hover:bg-zinc-100 transition-colors" />
                        <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-8 flex items-center gap-3">
                            <Store className="text-zinc-400" /> Genel MaÄŸaza AyarlarÄ±
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">MaÄŸaza AdÄ±</label>
                                <input type="text" defaultValue="AURA E-Commerce" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3.5 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Destek E-PostasÄ±</label>
                                <input type="email" defaultValue="support@aurastore.com" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3.5 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all" />
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">KÄ±sa AÃ§Ä±klama (SEO)</label>
                                <textarea defaultValue="Yeni Nesil LÃ¼ks E-Ticaret Platformu" rows={3} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3.5 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all resize-none" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[32px] border border-zinc-200 p-10 shadow-sm">
                        <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-8 flex items-center gap-3">
                            <CreditCard className="text-zinc-400" /> Ã–deme AltyapÄ±sÄ±
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-5 border border-zinc-200 rounded-2xl bg-zinc-50 hover:bg-white transition-colors cursor-pointer">
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-tight text-zinc-900">Iyzico (Sanal POS)</h4>
                                    <p className="text-xs text-zinc-500 mt-1 font-medium">Kredi kartÄ± ile Ã¶deme almak iÃ§in aktif.</p>
                                </div>
                                <div className="w-12 h-6 bg-zinc-900 rounded-full relative shadow-inner">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-5 border border-zinc-200 rounded-2xl bg-zinc-50 hover:bg-white transition-colors cursor-pointer opacity-50">
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-tight text-zinc-900">Stripe (Global)</h4>
                                    <p className="text-xs text-zinc-500 mt-1 font-medium">YurtdÄ±ÅŸÄ± Ã¶demeleri iÃ§in kullanÄ±labilir.</p>
                                </div>
                                <div className="w-12 h-6 bg-zinc-200 rounded-full relative shadow-inner">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
