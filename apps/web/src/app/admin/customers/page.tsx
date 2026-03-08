"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react";

export default function AdminCustomers() {
    const [customers] = useState([
        { id: "#CUST-101", name: "Berke Yılmaz", email: "berke@example.com", phone: "+90 532 123 4567", orders: 12, spent: "₺45.200", joined: "15 Ocak 2026", status: "Premium" },
        { id: "#CUST-102", name: "Aslı Çelik", email: "asli@example.com", phone: "+90 544 987 6543", orders: 3, spent: "₺8.900", joined: "2 Mart 2026", status: "Aktif" },
        { id: "#CUST-103", name: "Kaan Aras", email: "kaan@example.com", phone: "+90 555 111 2233", orders: 1, spent: "₺1.200", joined: "10 Mart 2026", status: "Yeni" },
        { id: "#CUST-104", name: "Zeynep Demir", email: "zeynep@example.com", phone: "+90 533 444 5566", orders: 28, spent: "₺112.500", joined: "5 Kasım 2025", status: "VIP" },
    ]);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "VIP": return "bg-purple-50 text-purple-600 border-purple-100";
            case "Premium": return "bg-blue-50 text-blue-600 border-blue-100";
            case "Aktif": return "bg-green-50 text-green-600 border-green-100";
            case "Yeni": return "bg-orange-50 text-orange-600 border-orange-100";
            default: return "bg-zinc-50 text-zinc-600 border-zinc-100";
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-zinc-900 leading-none">Müşteriler</h1>
                    <p className="text-zinc-400 text-sm mt-2 font-medium">Sisteme kayıtlı {customers.length} müşteri bulunuyor.</p>
                </div>
                <button className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-colors">Dışa Aktar (CSV)</button>
            </div>

            {/* Filters Area */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-zinc-200">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder="Müşteri adı, telefon veya e-posta..."
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600 focus:outline-none focus:ring-2 focus:ring-black/5 appearance-none">
                        <option>Tüm Müşteriler</option>
                        <option>VIP</option>
                        <option>Premium</option>
                        <option>Aktif</option>
                    </select>
                    <button className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-600 hover:bg-zinc-100 transition-colors">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                            <tr>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Müşteri Profili</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">İletişim</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Sipariş / Harcama</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Kayıt Tarihi</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Segment</th>
                                <th className="py-5 px-8"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-zinc-50/50 transition-colors group">
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white font-black text-xs shrink-0">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-zinc-900 leading-none">{customer.name}</h4>
                                                <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-widest">{customer.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                                                <Mail size={12} className="text-zinc-400" /> {customer.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                                                <Phone size={12} className="text-zinc-400" /> {customer.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-zinc-900">{customer.spent}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-0.5">{customer.orders} Sipariş</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                                            <Calendar size={14} className="text-zinc-400" /> {customer.joined}
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(customer.status)}`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="py-5 px-8 text-right">
                                        <button className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-lg transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
