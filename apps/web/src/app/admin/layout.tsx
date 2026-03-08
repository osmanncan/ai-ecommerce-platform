"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Box,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAppContext } from "@/context/AppContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/auth");
            } else {
                setIsAuthChecking(false);
            }
        };
        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                router.push("/auth");
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    if (isAuthChecking) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-zinc-500 font-medium">Yetki kontrol ediliyor...</p>
                </div>
            </div>
        );
    }

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
        { name: "Siparişler", icon: ShoppingBag, path: "/admin/orders" },
        { name: "Ürün Yönetimi", icon: Box, path: "/admin/products" },
        { name: "Müşteriler", icon: Users, path: "/admin/customers" },
        { name: "Ayarlar", icon: Settings, path: "/admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
                <div className="h-full flex flex-col p-8">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-black font-black text-xs">A</span>
                        </div>
                        <h1 className="text-xl font-black tracking-tighter uppercase">AURA <span className="text-[10px] text-zinc-500 ml-1">ADMIN</span></h1>
                    </div>
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    className={`flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-bold transition-all ${isActive
                                        ? 'bg-white text-black shadow-lg shadow-white/5'
                                        : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    <item.icon size={20} />
                                    {item.name}
                                </a>
                            );
                        })}
                    </nav>
                    <div className="pt-8 border-t border-zinc-800">
                        <button
                            onClick={() => { supabase.auth.signOut(); router.push("/"); }}
                            className="flex items-center gap-4 px-4 py-4 w-full text-zinc-500 hover:text-red-400 text-sm font-bold transition-colors"
                        >
                            <LogOut size={20} />
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white border-b border-zinc-200 px-8 flex items-center justify-between sticky top-0 z-40">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-zinc-500 hover:bg-zinc-100 rounded-lg">
                        <Menu size={20} />
                    </button>

                    <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Sipariş, ürün veya müşteri ara..."
                            className="w-full bg-zinc-100 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-black/5"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-zinc-400 hover:text-black transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="w-px h-6 bg-zinc-200" />
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="text-right">
                                <p className="text-xs font-black uppercase tracking-tight">Osmancan</p>
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Yönetici</p>
                            </div>
                            <div className="w-10 h-10 bg-zinc-100 rounded-full overflow-hidden border-2 border-transparent group-hover:border-black transition-all">
                                <img src="https://ui-avatars.com/api/?name=Osmancan&background=000&color=fff" alt="Profile" />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
