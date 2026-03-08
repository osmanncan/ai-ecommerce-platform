"use client";

import { useState } from "react";
import { Search, Filter, Eye, Plane, CheckCircle, Clock, XCircle } from "lucide-react";

export default function AdminOrders() {
    const [orders, setOrders] = useState([
        { id: "#ORD-9128", customer: "Berke Yılmaz", email: "berke@example.com", items: 3, total: 11250, date: "12 Mar 2026, 14:30", status: "Kargolandı" },
        { id: "#ORD-9127", customer: "Aslı Çelik", email: "asli@example.com", items: 1, total: 8900, date: "12 Mar 2026, 09:15", status: "Hazırlanıyor" },
        { id: "#ORD-9126", customer: "Kaan Aras", email: "kaan@example.com", items: 4, total: 4200, date: "11 Mar 2026, 18:45", status: "Beklemede" },
        { id: "#ORD-9125", customer: "Zeynep Demir", email: "zeynep@example.com", items: 2, total: 18500, date: "10 Mar 2026, 11:20", status: "Tamamlandı" },
        { id: "#ORD-9124", customer: "Can Kaya", email: "can.k@example.com", items: 1, total: 2450, date: "09 Mar 2026, 16:00", status: "İptal Edildi" },
    ]);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Tamamlandı": return "bg-emerald-50 text-emerald-600";
            case "Kargolandı": return "bg-blue-50 text-blue-600";
            case "Hazırlanıyor": return "bg-indigo-50 text-indigo-600";
            case "Beklemede": return "bg-orange-50 text-orange-600";
            case "İptal Edildi": return "bg-red-50 text-red-600";
            default: return "bg-zinc-50 text-zinc-600";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Tamamlandı": return <CheckCircle size={14} />;
            case "Kargolandı": return <Plane size={14} />;
            case "Hazırlanıyor": return <Clock size={14} />;
            case "Beklemede": return <Clock size={14} className="animate-spin" />;
            case "İptal Edildi": return <XCircle size={14} />;
            default: return null;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-zinc-900 leading-none">Siparişler</h1>
                    <p className="text-zinc-400 text-sm mt-2 font-medium">Toplam {orders.length} sipariş listeleniyor.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-colors">Dışa Aktar</button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-zinc-200">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder="Müşteri adı, e-posta veya sipariş no..."
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600 focus:outline-none focus:ring-2 focus:ring-black/5 appearance-none">
                        <option>Tüm Durumlar</option>
                        <option>Beklemede</option>
                        <option>Hazırlanıyor</option>
                        <option>Kargolandı</option>
                        <option>Tamamlandı</option>
                    </select>
                    <button className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-600 hover:bg-zinc-100 transition-colors flex items-center gap-2">
                        <Filter size={18} />
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                            <tr>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Sipariş ID</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Müşteri Detayı</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Tarih</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Tutar / İçerik</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Durum</th>
                                <th className="py-5 px-8 text-right text-[10px] font-black uppercase tracking-widest text-zinc-400">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors group">
                                    <td className="py-6 px-8 text-sm font-black text-zinc-900 tracking-tight">{order.id}</td>
                                    <td className="py-6 px-8">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-zinc-800">{order.customer}</span>
                                            <span className="text-[10px] font-medium text-zinc-400 mt-0.5">{order.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8 text-xs font-bold text-zinc-500">{order.date}</td>
                                    <td className="py-6 px-8">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-zinc-900">â‚º{order.total.toLocaleString('tr-TR')}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">{order.items} Ürün</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="py-6 px-8 text-right">
                                        <button className="p-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2 lg:ml-auto">
                                            <Eye size={14} className="inline-block mr-1" /> Detay
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-zinc-200 flex items-center justify-between text-xs font-bold text-zinc-500 bg-zinc-50/50">
                    <span>Gösterilen: 1-5 / Toplam: 124</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1.5 border border-zinc-200 rounded bg-white hover:bg-zinc-50 disabled:opacity-50" disabled>Önceki</button>
                        <button className="px-3 py-1.5 border border-zinc-200 rounded bg-white hover:bg-zinc-50">Sonraki</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
