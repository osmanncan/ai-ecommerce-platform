"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Sparkles,
    Play,
    Heart,
} from "lucide-react";
import { MOCK_PRODUCTS, Product } from "@ai-first/shared";
import Navbar from "@/components/layout/Navbar";
import { useAppContext } from "@/context/AppContext";
import { supabase } from "@/lib/supabase";

export default function Home() {
    const [activeMood, setActiveMood] = useState("Minimalist");
    const [scrollY, setScrollY] = useState(0);
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

    const { user, cart, addToCart, wishlist, toggleWishlist, t, locale } = useAppContext();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [trendingProducts, setTrendingProducts] = useState<Partial<Product>[]>([]);
    const [curatedProducts, setCuratedProducts] = useState<Partial<Product>[]>([]);

    const moods = t.mood.moods;

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase
                .from('products')
                .select('*')
                .limit(20);

            if (data && data.length > 0) {
                setTrendingProducts(data.slice(0, 8));
                setCuratedProducts(data.slice(8, 12));
            } else {
                setTrendingProducts(MOCK_PRODUCTS.slice(4, 12));
                setCuratedProducts(MOCK_PRODUCTS.slice(12, 14));
            }
        };
        fetchProducts();
    }, []);

    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 transition-colors duration-500 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black font-sans">
            <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black py-2.5 text-center transition-colors">
                <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase">
                    {t.announcement}
                </p>
            </div>

            <Navbar scrollY={scrollY} />
            <section className="relative px-4 sm:px-8 pt-6 pb-24">
                <div className="w-full h-[80vh] md:h-[85vh] relative rounded-3xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <Image
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover object-top scale-105"
                        alt="Koleksiyon"
                        fill
                        priority
                        sizes="100vw"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                    <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                        <div className="max-w-3xl space-y-6 text-white">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                <Sparkles size={14} className="text-white/80" />
                                <span className="text-[10px] font-bold tracking-widest uppercase">{t.hero.badge}</span>
                            </div>
                            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                                {t.hero.title_1} <span className="font-serif italic font-light lowercase">{t.hero.title_2}</span>
                            </h1>
                            <p className="md:text-lg font-medium text-white/80 max-w-xl leading-relaxed">
                                {t.hero.subtitle}
                            </p>
                            <div className="pt-4 flex flex-wrap gap-4">
                                <Link href="/stylist" className="px-8 py-4 bg-white text-black font-bold uppercase text-[11px] tracking-widest hover:bg-zinc-200 transition-colors rounded-full">
                                    {t.hero.cta}
                                </Link>
                                <button className="px-8 py-4 bg-black/40 backdrop-blur-md border border-white/30 text-white font-bold uppercase text-[11px] tracking-widest hover:bg-black/60 transition-colors rounded-full flex items-center gap-2">
                                    <Play size={14} fill="currentColor" /> {t.hero.film}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-24 px-6 sm:px-12 bg-white dark:bg-[#0a0a0a] transition-colors duration-500 mx-4 sm:mx-8 -mt-16 relative z-10 rounded-[30px] shadow-xl shadow-black/5 dark:shadow-white/5">
                <div className="max-w-screen-2xl mx-auto space-y-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-10">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{t.trending.title}</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium max-w-md">
                                {t.trending.subtitle}
                            </p>
                        </div>
                        <Link href="/stylist" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">
                            {t.trending.explore}
                            <span className="w-8 h-[1px] bg-current group-hover:w-12 transition-all" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                        {trendingProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group cursor-pointer flex flex-col"
                                onMouseEnter={() => setHoveredProduct(product.id as string)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-xl mb-6">
                                    <Link href={`/product/${product.id}`} className="block w-full h-full">
                                        <Image
                                            src={product.image_url || ''}
                                            className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                            alt={product.name || ''}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                    </Link>
                                    <div className={`absolute top-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full transition-all duration-300 sm:${hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} opacity-100 sm:opacity-0 sm:group-hover:opacity-100`}>
                                        <Sparkles size={12} className="text-zinc-900 dark:text-white" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase">%94 {t.trending.match}</span>
                                    </div>
                                    <div className="absolute bottom-4 inset-x-4 flex items-center justify-between translate-y-0 opacity-100 sm:translate-y-10 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 ease-out">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id as string); }}
                                            className="w-12 h-12 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                                        >
                                            <Heart size={20} className={wishlist.includes(product.id as string) ? "fill-current text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-500"} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); addToCart(product as { id: string; name: string; price: number; image_url: string }); }}
                                            className="h-12 px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest hover:scale-105 transition-transform"
                                        >
                                            {t.trending.addToCart}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2 mt-auto px-2">
                                    <h3 className="text-sm md:text-base font-bold tracking-wide group-hover:underline underline-offset-4 decoration-1">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-widest">{product.category}</span>
                                        <span className="text-base font-black tracking-tight">{product.price} TL</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-32 px-6 sm:px-12">   
                <div className="max-w-screen-2xl mx-auto space-y-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="max-w-2xl space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                                {t.mood.title_1} <span className="text-zinc-400 dark:text-zinc-600 font-serif italic font-light lowercase">{t.mood.title_2}</span>
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-lg font-medium leading-relaxed">
                                {t.mood.subtitle}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {moods.map(m => (
                                <button
                                    key={m}
                                    onClick={() => setActiveMood(m)}
                                    className={`px-6 py-3 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all border ${activeMood === m
                                        ? "bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white"
                                        : "bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500"
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-zinc-100 dark:bg-[#111] rounded-3xl p-10 flex flex-col justify-between">
                            <div className="space-y-6">
                                <Sparkles size={24} className="text-zinc-400" />
                                <h3 className="text-2xl font-black uppercase tracking-tight">{t.mood.curator}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                                    "{activeMood}" konsepti. <br /><br />
                                    {user ? t.mood.loggedIn : t.mood.loggedOut}
                                </p>
                            </div>
                            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 mt-8">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t.mood.analysis}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${user ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                                        {user ? t.mood.active : t.mood.waiting}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {curatedProducts.map(p => (
                            <Link key={p.id} href={`/product/${p.id}`} className="group cursor-pointer">
                                <div className="aspect-[4/5] overflow-hidden rounded-3xl mb-4 bg-zinc-100 dark:bg-zinc-900 relative">
                                    <Image src={p.image_url || ''} className="object-cover transition-transform duration-[3000ms] group-hover:scale-105" alt={p.name || ''} fill sizes="(max-width: 768px) 100vw, 33vw" />
                                </div>
                                <div className="space-y-1 px-2">
                                    <h5 className="text-sm font-bold tracking-wide group-hover:underline underline-offset-4 decoration-1">{p.name}</h5>
                                    <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{p.price} TL</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <footer className="bg-white dark:bg-[#0a0a0a] border-t border-zinc-200 dark:border-white/5 pt-24 pb-12 transition-colors duration-500">
                <div className="max-w-screen-2xl mx-auto px-6 sm:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20 border-b border-zinc-200 dark:border-white/5 mb-20 text-center md:text-left">
                        <div className="space-y-2">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest">{t.footer.freeShipping}</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium max-w-xs mx-auto md:mx-0">{t.footer.freeShippingDesc}</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest">{t.footer.easyReturns}</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium max-w-xs mx-auto md:mx-0">{t.footer.easyReturnsDesc}</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest">{t.footer.luxuryPacking}</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium max-w-xs mx-auto md:mx-0">{t.footer.luxuryPackingDesc}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-6 mb-24">
                        <div className="col-span-2 lg:col-span-2 space-y-6">
                            <span className="text-3xl font-black tracking-tighter uppercase italic">AURA</span>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
                                {t.footer.tagline}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.footer.help}</h5>
                            <div className="flex flex-col gap-4 text-xs font-bold text-zinc-900 dark:text-white">
                                <Link href="/faq" className="hover:text-zinc-500 transition-colors">{t.footer.faq}</Link>
                                <Link href="/shipping" className="hover:text-zinc-500 transition-colors">{t.footer.shipping}</Link>
                                <Link href="/returns" className="hover:text-zinc-500 transition-colors">{t.footer.returns}</Link>
                                <Link href="/contact" className="hover:text-zinc-500 transition-colors">{t.footer.contactLink}</Link>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.footer.legal}</h5>
                            <div className="flex flex-col gap-4 text-xs font-bold text-zinc-900 dark:text-white">
                                <Link href="/privacy" className="hover:text-zinc-500 transition-colors">{t.footer.privacy}</Link>
                                <Link href="/terms" className="hover:text-zinc-500 transition-colors">{t.footer.terms}</Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        <div>&copy; 2026 AURA. {t.footer.rights}</div>
                        <div className="flex gap-4 cursor-pointer hover:text-zinc-900 dark:hover:text-white transition-colors">
                            <span>{locale === 'tr' ? 'TR / TL' : 'EN / TL'}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
