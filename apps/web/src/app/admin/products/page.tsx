"use client";

import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, Image as ImageIcon } from "lucide-react";

export default function AdminProducts() {
    const [products, setProducts] = useState([
        { id: "PRD-001", name: "Premium İpek Gömlek", category: "Üst Giyim", price: 2450, stock: 45, status: "Aktif", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=400" },
        { id: "PRD-002", name: "Minimalist Deri Çanta", category: "Çanta", price: 8900, stock: 12, status: "Azalıyor", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400" },
        { id: "PRD-003", name: "Oversize Kaşe Kaban", category: "Dış Giyim", price: 12500, stock: 0, status: "Tükendi", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=400" },
        { id: "PRD-004", name: "Klasik Kumaş Pantolon", category: "Alt Giyim", price: 1850, stock: 156, status: "Aktif", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=400" },
    ]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-zinc-900 leading-none">Ürün Yönetimi</h1>
                    <p className="text-zinc-400 text-sm mt-2 font-medium">Toplam {products.length} ürün listeleniyor.</p>
                </div>
                <button className="px-6 py-3 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-xl shadow-zinc-900/10">
                    <Plus size={16} /> Yeni Ürün Ekle
                </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-zinc-200">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder="Ürün adı veya ID ara..."
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600 focus:outline-none focus:ring-2 focus:ring-black/5 appearance-none">
                        <option>Tüm Kategoriler</option>
                        <option>Üst Giyim</option>
                        <option>Dış Giyim</option>
                        <option>Çanta</option>
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
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Ürün</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Kategori</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Fiyat</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Stok</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Durum</th>
                                <th className="py-5 px-8 text-right text-[10px] font-black uppercase tracking-widest text-zinc-400">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors group">
                                    <td className="py-4 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-16 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                                        <ImageIcon size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-zinc-900 uppercase tracking-tight">{product.name}</h4>
                                                <p className="text-[10px] text-zinc-400 font-bold tracking-widest mt-1">{product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-8 text-xs font-bold text-zinc-500">{product.category}</td>
                                    <td className="py-4 px-8 text-sm font-black text-zinc-900">â‚º{product.price.toLocaleString('tr-TR')}</td>
                                    <td className="py-4 px-8">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${product.stock > 20 ? 'bg-green-500' :
                                                    product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'
                                                }`} />
                                            <span className="text-sm font-bold text-zinc-700">{product.stock} Adet</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-8">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${product.status === 'Aktif' ? 'bg-green-50 text-green-600' :
                                                product.status === 'Azalıyor' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-red-50 text-red-600'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-8 text-right">
                                        <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-lg transition-colors" title="Düzenle">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors" title="Sil">
                                                <Trash2 size={16} />
                                            </button>
                                            <button className="p-2 text-zinc-400 hover:text-black transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-zinc-200 flex items-center justify-between text-xs font-bold text-zinc-500 bg-zinc-50/50">
                    <span>Gösterilen: 1-4 / Toplam: 42</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1.5 border border-zinc-200 rounded bg-white hover:bg-zinc-50 disabled:opacity-50" disabled>Önceki</button>
                        <button className="px-3 py-1.5 border border-zinc-200 rounded bg-white hover:bg-zinc-50">Sonraki</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
