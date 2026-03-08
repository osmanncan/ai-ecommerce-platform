"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingBag, Sparkles, Truck, RotateCcw } from "lucide-react";
import { MOCK_PRODUCTS, Product } from "@ai-first/shared";
import { useAppContext } from "@/context/AppContext";
import { supabase } from "@/lib/supabase";

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;

    const [product, setProduct] = useState<Partial<Product> | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isAdded, setIsAdded] = useState(false);
    const [sizeError, setSizeError] = useState(false);

    const { addToCart, toggleWishlist, wishlist, t } = useAppContext();

    useEffect(() => {
        const fetchProduct = async () => {
            // Try Supabase first
            const { data } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();

            if (data) {
                setProduct(data);
            } else {
                // Fallback to mock
                const found = MOCK_PRODUCTS.find(p => p.id === productId);
                setProduct(found || null);
            }
        };
        fetchProduct();
    }, [productId]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#050505]">
                <div className="w-8 h-8 border-4 border-zinc-200 border-t-black dark:border-zinc-800 dark:border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    const sizes = ["S", "M", "L", "XL"];
    const isWishlisted = wishlist.includes(product.id as string);

    const handleAddToCart = () => {
        if (!selectedSize && product.category !== 'Aksesuar' && product.category !== 'Saat' && product.category !== 'Çanta') {
            setSizeError(true);
            return;
        }

        setSizeError(false);
        addToCart({
            id: product.id as string,
            name: product.name as string,
            price: product.price as number,
            image_url: product.image_url as string,
            selectedSize: selectedSize || undefined,
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black">

            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-6 flex justify-between items-center bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-900 lg:bg-transparent lg:backdrop-blur-none lg:border-none lg:mix-blend-difference text-black dark:text-white lg:text-white">
                <Link href="/" className="flex items-center gap-3 uppercase text-[10px] font-black tracking-[0.3em] hover:-translate-x-2 transition-transform">
                    <ArrowLeft size={16} /> <span className="hidden sm:inline">{t.product.back}</span>
                </Link>
                <Link href="/" className="text-2xl font-black tracking-tighter uppercase">AURA</Link>
                <div className="w-20" /> {/* Spacer for centering */}
            </nav>

            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* MOBILE ONLY HERO IMAGE */}
                <div className="lg:hidden w-full h-[65vh] relative bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden shrink-0 mt-[72px]">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover object-top"
                    />
                </div>

                {/* LEFT: Cinematic Full-Bleed Imagery & Details (Scrollable) */}
                <div className="w-full lg:w-[65%] order-3 lg:order-1 flex flex-col pt-0">

                    {/* DESKTOP ONLY Hero Image */}
                    <div className="hidden lg:block w-full h-screen relative bg-zinc-100 dark:bg-zinc-900 overflow-hidden shrink-0">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-[5000ms]"
                        />
                    </div>

                    {/* Editorial Description Content */}
                    <div className="max-w-3xl mx-auto px-6 sm:px-16 py-12 lg:py-24 space-y-16 lg:space-y-24">

                        {/* Material & Concept */}
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{t.product.designCodes}</h3>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight uppercase">
                                {t.product.touch} <br /><span className="italic font-serif font-light lowercase text-zinc-500">{t.product.architecture}</span>
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed md:text-lg">
                                {product.description} {t.product.description}
                            </p>
                        </div>

                        {/* AI Curator's Note */}
                        <div className="bg-zinc-100 dark:bg-[#111] rounded-[32px] p-8 md:p-12 border border-black/5 dark:border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-900 dark:via-white to-transparent opacity-20" />
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
                                    <Sparkles size={20} className="animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t.product.curatorNote}</span>
                                </div>
                                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium italic leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
                                    &ldquo;{product.category} {t.product.curatorText} <span className="text-zinc-900 dark:text-white font-bold">Aura</span> {t.product.curatorTextEnd}&rdquo;
                                </p>
                            </div>
                        </div>

                        {/* Accordion Details */}
                        <div className="space-y-6 pt-12 border-t border-zinc-200 dark:border-zinc-900">
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold uppercase tracking-widest">{t.product.fabric}</h4>
                                <p className="text-sm text-zinc-500 leading-relaxed">{t.product.fabricDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Sticky Checkout Panel */}
                <div className="w-full lg:w-[35%] order-2 lg:order-2 bg-[#fafafa] dark:bg-[#050505] lg:bg-white lg:dark:bg-[#0a0a0a] border-b lg:border-l lg:border-b-0 border-zinc-200 dark:border-zinc-900 relative">
                    <div className="lg:sticky top-0 lg:h-screen lg:overflow-y-auto px-6 sm:px-12 py-10 lg:py-24 flex flex-col no-scrollbar">

                        {/* Product Header */}
                        <div className="space-y-4 mb-10 lg:mb-16 mt-0 lg:mt-10">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">{product.category}</h4>
                                    <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{product.name}</h1>
                                </div>
                                <button
                                    onClick={() => toggleWishlist(product.id as string)}
                                    className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:scale-110 transition-transform flex-shrink-0"
                                >
                                    <Heart size={20} className={isWishlisted ? "fill-current text-zinc-900 dark:text-white" : "text-zinc-400"} />
                                </button>
                            </div>
                            <p className="text-2xl font-light">{(product.price ?? 0).toLocaleString('tr-TR')} TL</p>
                        </div>

                        {/* Size Selection (If applicable) */}
                        {product.category !== 'Aksesuar' && product.category !== 'Saat' && product.category !== 'Çanta' && (
                            <div className="space-y-6 mb-16">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em]">{t.product.sizeSelect}</label>
                                    <button className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider underline underline-offset-4 hover:text-zinc-900 dark:hover:text-white transition-colors">{t.product.sizeGuide}</button>
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => { setSelectedSize(size); setSizeError(false); }}
                                            className={`py-4 text-xs font-bold transition-all border ${selectedSize === size
                                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-transparent scale-105 shadow-xl'
                                                : 'bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {sizeError && (
                                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 animate-pulse">{t.product.selectSize}</p>
                                )}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-4 mt-auto">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdded}
                                className={`w-full py-6 uppercase font-black text-[10px] tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${isAdded
                                    ? 'bg-green-600 dark:bg-green-500 text-white'
                                    : 'bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98]'
                                    }`}
                            >
                                {isAdded ? t.product.added : <> <ShoppingBag size={16} fill={isAdded ? "none" : "currentColor"} /> {t.product.addToCart}</>}
                            </button>

                            <p className="text-center text-[10px] font-medium text-zinc-400 uppercase tracking-widest pt-4 flex items-center justify-center gap-2">
                                <Sparkles size={12} /> {t.product.limited}
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 mt-12 pt-12 border-t border-zinc-200 dark:border-zinc-900">
                            <div className="flex items-center gap-3 text-zinc-500">
                                <Truck size={18} strokeWidth={1.5} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">{t.product.sameDay} <br />{t.product.shipping}</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-500">
                                <RotateCcw size={18} strokeWidth={1.5} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">{t.product.unconditional} <br />{t.product.returnLabel}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}
