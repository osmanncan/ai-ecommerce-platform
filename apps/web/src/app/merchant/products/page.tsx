"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Package, Edit, Trash2, Sparkles, LayoutDashboard, Settings, ShoppingCart, ArrowLeft, Lock, Menu, X } from "lucide-react";
import { MOCK_PRODUCTS } from "@ai-first/shared";
import { useAppContext } from "@/context/AppContext";

export default function MerchantProducts() {
    const { user, locale } = useAppContext();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            router.replace("/auth");
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Lock size={48} strokeWidth={1} className="text-zinc-300 dark:text-zinc-700 mx-auto" />
                    <h1 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                        {locale === 'tr' ? 'Giriş Gerekli' : 'Login Required'}
                    </h1>
                    <p className="text-sm text-zinc-500 font-medium">
                        {locale === 'tr' ? 'Bu sayfaya erişmek için giriş yapmalısınız.' : 'You must be logged in to access this page.'}
                    </p>
                    <Link href="/auth" className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                        {locale === 'tr' ? 'Giriş Yap' : 'Sign In'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-[#050505]">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Merchant Sidebar */}
            <aside className={`w-64 bg-zinc-900 dark:bg-[#0a0a0a] text-white flex flex-col fixed inset-y-0 border-r border-zinc-800 z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-6 md:p-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <ShoppingCart size={18} className="text-white" />
                        </div>
                        <span className="font-black tracking-tighter text-lg uppercase">Vendor Central</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-zinc-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <LayoutDashboard size={20} />
                        <span className="text-sm font-bold">{locale === 'tr' ? 'Genel Bakış' : 'Overview'}</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 rounded-xl transition-all">
                        <Package size={20} />
                        <span className="text-sm font-bold">{locale === 'tr' ? 'Envanter' : 'Inventory'}</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <Sparkles size={20} />
                        <span className="text-sm font-bold">{locale === 'tr' ? 'AI Araçları' : 'AI Tools'}</span>
                    </button>
                    <div className="pt-4 mt-4 border-t border-white/5">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                            <Settings size={20} />
                            <span className="text-sm font-bold">{locale === 'tr' ? 'Ayarlar' : 'Settings'}</span>
                        </button>
                    </div>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-300 transition-all text-xs font-bold uppercase tracking-widest">
                        <ArrowLeft size={16} /> {locale === 'tr' ? 'Mağazaya Dön' : 'Back to Store'}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-0 md:ml-64 p-4 sm:p-8 lg:p-12">
                {/* Mobile Header with Hamburger */}
                <div className="flex items-center gap-3 mb-6 md:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center bg-zinc-900 dark:bg-zinc-800 text-white rounded-xl">
                        <Menu size={20} />
                    </button>
                    <span className="font-black tracking-tighter text-lg uppercase text-zinc-900 dark:text-white">Vendor Central</span>
                </div>

                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
                            {locale === 'tr' ? 'Ürün Envanteri' : 'Product Inventory'}
                        </h1>
                        <p className="text-zinc-400 mt-2 font-medium text-sm">
                            {locale === 'tr'
                                ? `Toplam ${MOCK_PRODUCTS.length} aktif ürün sistemde kayıtlı.`
                                : `${MOCK_PRODUCTS.length} active products registered in the system.`}
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-white/5 w-full sm:w-auto justify-center sm:justify-start">
                        <Plus size={18} /> {locale === 'tr' ? 'Yeni Ürün Ekle' : 'Add New Product'}
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-6">
                        <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                            <Sparkles className="text-indigo-600 dark:text-indigo-400" size={24} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                                {locale === 'tr' ? 'AI SEO Skoru' : 'AI SEO Score'}
                            </div>
                            <div className="text-2xl font-black text-zinc-900 dark:text-white">%98.4</div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-6">
                        <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center">
                            <Package className="text-zinc-900 dark:text-zinc-300" size={24} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                                {locale === 'tr' ? 'Toplam Stok' : 'Total Stock'}
                            </div>
                            <div className="text-2xl font-black text-zinc-900 dark:text-white">
                                {MOCK_PRODUCTS.reduce((acc, p) => acc + (p.stock || 0), 0)}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-6">
                        <div className="w-14 h-14 bg-green-50 dark:bg-green-500/10 rounded-2xl flex items-center justify-center">
                            <ShoppingCart className="text-green-600 dark:text-green-400" size={24} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                                {locale === 'tr' ? 'Aktif Siparişler' : 'Active Orders'}
                            </div>
                            <div className="text-2xl font-black text-zinc-900 dark:text-white">12</div>
                        </div>
                    </div>
                </div>

                {/* Products List */}
                <div className="space-y-4">
                    {MOCK_PRODUCTS.map((product) => (
                        <div key={product.id} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 sm:p-5 rounded-[20px] sm:rounded-[28px] flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/20 transition-all group">
                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-zinc-100 dark:border-zinc-800">
                                <Image src={product.image_url || ''} fill className="object-cover" alt={product.name || ''} sizes="96px" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-black text-zinc-900 dark:text-white truncate uppercase tracking-tight">{product.name}</h3>
                                    <div className="px-2.5 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-[9px] font-black uppercase rounded-lg border border-green-100 dark:border-green-500/20">
                                        {locale === 'tr' ? 'Stokta' : 'In Stock'}
                                    </div>
                                </div>
                                <p className="text-zinc-400 text-sm line-clamp-1 mb-4 font-medium">{product.description}</p>
                                <div className="flex items-center flex-wrap gap-3 sm:gap-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{product.category}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-black text-zinc-900 dark:text-white">{product.price?.toLocaleString('tr-TR')} TL</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Package size={16} className="text-zinc-300 dark:text-zinc-600" />
                                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                            {product.stock} {locale === 'tr' ? 'Adet' : 'Units'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                                <button className="p-4 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all shadow-sm">
                                    <Sparkles size={20} />
                                </button>
                                <button className="p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black rounded-2xl transition-all shadow-sm">
                                    <Edit size={20} />
                                </button>
                                <button className="p-4 bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
