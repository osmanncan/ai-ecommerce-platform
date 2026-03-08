"use client";

import {
    TrendingUp,
    ShoppingBag,
    Users,
    DollarSign,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles
} from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { label: "Toplam SatÄ±ÅŸ", value: "â‚º142.950", icon: DollarSign, trend: "+12.5%", isPositive: true },
        { label: "SipariÅŸ SayÄ±sÄ±", value: "324", icon: ShoppingBag, trend: "+8.2%", isPositive: true },
        { label: "Yeni MÃ¼ÅŸteriler", value: "48", icon: Users, trend: "+14.6%", isPositive: true },
        { label: "Ä°ade OranÄ±", value: "%1.2", icon: TrendingUp, trend: "-2.4%", isPositive: false },
    ];

    const recentOrders = [
        { id: "#AURA-8F2D", customer: "Ahmet YÄ±lmaz", date: "2 dakika Ã¶nce", amount: "â‚º4.250", status: "HazÄ±rlanÄ±yor", color: "blue" },
        { id: "#AURA-9A1C", customer: "AyÅŸe Kaya", date: "15 dakika Ã¶nce", amount: "â‚º1.890", status: "Ã–dendi", color: "green" },
        { id: "#AURA-7B4E", customer: "Mehmet Demir", date: "1 saat Ã¶nce", amount: "â‚º12.400", status: "KargolandÄ±", color: "orange" },
        { id: "#AURA-2D9F", customer: "Zeynep Aras", date: "3 saat Ã¶nce", amount: "â‚º850", status: "TamamlandÄ±", color: "emerald" },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-zinc-900 leading-none">Dashboard</h1>
                    <p className="text-sm font-medium text-zinc-400 mt-2 italic leading-relaxed">Ä°statistikleri ve gÃ¼nlÃ¼k operasyonlarÄ± buradan yÃ¶netin.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-colors">Rapor Al</button>
                    <button className="px-6 py-3 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-xl shadow-zinc-900/10">
                        <Sparkles size={14} /> Yeni ÃœrÃ¼n Ekle
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-zinc-50 rounded-2xl text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-500">
                                <stat.icon size={22} strokeWidth={2.5} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {stat.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.trend}
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tight text-zinc-900">{stat.value}</h3>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-900">Son SipariÅŸler</h3>
                        <button className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black">Hepsini GÃ¶r</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-zinc-50">
                                <tr>
                                    <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">ID</th>
                                    <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">MÃ¼ÅŸteri</th>
                                    <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Tutar</th>
                                    <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Durum</th>
                                    <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Tarih</th>
                                    <th className="py-5 px-8"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="py-6 px-8 text-sm font-black text-zinc-900">{order.id}</td>
                                        <td className="py-6 px-8 text-sm font-bold text-zinc-600">{order.customer}</td>
                                        <td className="py-6 px-8 text-sm font-black text-zinc-900">{order.amount}</td>
                                        <td className="py-6 px-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${order.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                                                    order.color === 'green' ? 'bg-green-50 text-green-500' :
                                                        order.color === 'orange' ? 'bg-orange-50 text-orange-500' :
                                                            'bg-emerald-50 text-emerald-500'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8 text-xs font-medium text-zinc-400">{order.date}</td>
                                        <td className="py-6 px-8 text-right">
                                            <button className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-300 hover:text-black transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-zinc-100">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-900">En Ã‡ok Satanlar</h3>
                    </div>
                    <div className="p-8 space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-14 h-16 bg-zinc-100 rounded-xl overflow-hidden group-hover:scale-105 transition-transform">
                                    <img src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&h=300&fit=crop`} alt="Product" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-zinc-900 truncate uppercase tracking-tight">ÃœrÃ¼n AdÄ± Gelecek</h4>
                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Giyim â€¢ 42 SatÄ±ÅŸ</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-zinc-900">â‚º{450 * (5 - i)}</p>
                                    <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest">+12%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
