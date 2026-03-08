"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Heart, LogOut, Globe, Menu, X } from "lucide-react";
import SearchModal from "@/components/search/SearchModal";
import CartDrawer from "@/components/cart/CartDrawer";
import WishlistDrawer from "@/components/wishlist/WishlistDrawer";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useAppContext } from "@/context/AppContext";

interface NavbarProps {
    scrollY?: number;
}

export default function Navbar({ scrollY = 0 }: NavbarProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout, cart, wishlist, t, locale, toggleLocale } = useAppContext();

    return (
        <>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

            <nav className={`sticky top-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 md:px-12 flex items-center justify-between border-b ${scrollY > 20
                ? "bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl h-16 sm:h-20 border-zinc-200 dark:border-white/10"
                : "bg-[#fafafa] dark:bg-[#050505] h-16 sm:h-24 border-transparent"
                }`}>
                <div className="flex items-center gap-8 lg:gap-16">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-60 transition-opacity"
                    >
                        {isMobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
                    </button>

                    <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                        <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase">AURA</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                        <Link href="/stylist" className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white transition-colors relative">
                            {t.nav.studio}
                            <span className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-zinc-900 dark:bg-white rounded-full animate-pulse" />
                        </Link>
                        <Link href="/about" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.nav.about}</Link>
                        <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.nav.contact}</Link>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-6">
                    <button onClick={toggleLocale} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest hover:opacity-60 transition-opacity">
                        <Globe size={14} strokeWidth={2} />
                        <span className="hidden sm:inline">{locale === 'tr' ? 'EN' : 'TR'}</span>
                    </button>

                    <ThemeToggle />

                    <button onClick={() => setIsSearchOpen(true)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-60 transition-opacity">
                        <Search size={22} strokeWidth={1.5} />
                    </button>

                    {user ? (
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="text-[11px] font-bold tracking-widest uppercase hidden sm:block">{user.name.split(' ')[0]}</span>
                            <button onClick={logout} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-60 transition-opacity"><LogOut size={20} strokeWidth={1.5} /></button>
                        </div>
                    ) : (
                        <Link href="/auth" className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-60 transition-opacity"><User size={22} strokeWidth={1.5} /></Link>
                    )}

                    <button onClick={() => setIsWishlistOpen(true)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-60 transition-opacity relative">
                        <Heart size={22} strokeWidth={1.5} className={wishlist.length > 0 ? "fill-current" : ""} />
                        {wishlist.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-black dark:bg-white rounded-full border border-[#fafafa] dark:border-[#050505]" />}
                    </button>

                    <button onClick={() => setIsCartOpen(true)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center relative hover:opacity-60 transition-opacity">
                        <ShoppingBag size={22} strokeWidth={1.5} />
                        {cart.length > 0 && (
                            <span className="absolute bottom-0 right-0 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </button>
                </div>
            </nav>
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-16 z-40 bg-white dark:bg-[#050505] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col px-6 py-8 space-y-1">
                        <Link href="/stylist" onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between py-4 text-lg font-black uppercase tracking-tight border-b border-zinc-100 dark:border-zinc-900 hover:pl-2 transition-all">
                            {t.nav.studio}
                            <span className="w-2 h-2 bg-zinc-900 dark:bg-white rounded-full animate-pulse" />
                        </Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}
                            className="py-4 text-lg font-black uppercase tracking-tight border-b border-zinc-100 dark:border-zinc-900 hover:pl-2 transition-all">
                            {t.nav.about}
                        </Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}
                            className="py-4 text-lg font-black uppercase tracking-tight border-b border-zinc-100 dark:border-zinc-900 hover:pl-2 transition-all">
                            {t.nav.contact}
                        </Link>
                        <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)}
                            className="py-4 text-lg font-black uppercase tracking-tight border-b border-zinc-100 dark:border-zinc-900 hover:pl-2 transition-all">
                            {locale === 'tr' ? 'S.S.S.' : 'FAQ'}
                        </Link>
                        {!user && (
                            <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-6 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black text-center font-black uppercase text-sm tracking-widest">
                                {locale === 'tr' ? 'GiriÅŸ Yap' : 'Sign In'}
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
