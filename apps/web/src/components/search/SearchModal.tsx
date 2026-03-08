"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, Image as ImageIcon, Sparkles, Loader2, ShoppingBasket } from "lucide-react";
import { MOCK_PRODUCTS } from "@ai-first/shared";
import { useAppContext } from "@/context/AppContext";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addToCart, locale } = useAppContext();

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose, isOpen]);

    const searchResults = useMemo(() => {
        if (!searchQuery.trim() || searchQuery.length < 2) return [];
        const query = searchQuery.toLowerCase();
        return MOCK_PRODUCTS.filter(p =>
            (p.name && p.name.toLowerCase().includes(query)) ||
            (p.category && p.category.toLowerCase().includes(query)) ||
            (p.description && p.description.toLowerCase().includes(query))
        ).slice(0, 6);
    }, [searchQuery]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target?.result as string);
                setIsAnalyzing(true);
                setTimeout(() => setIsAnalyzing(false), 2500);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[5vh] sm:pt-[15vh] px-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-3xl bg-white dark:bg-[#0a0a0a] rounded-[24px] sm:rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-4 sm:p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-4 sm:gap-6">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
                    <input
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={locale === 'tr' ? "Koleksiyonda ara veya görsel yükle..." : "Search collection or upload image..."}
                        className="flex-1 bg-transparent border-none outline-none text-lg sm:text-2xl font-bold text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-600 tracking-tight"
                    />
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl transition-colors"
                    >
                        <X className="w-6 h-6 text-zinc-400" />
                    </button>
                </div>

                <div className="p-4 sm:p-10 max-h-[60vh] overflow-y-auto">
                    {searchQuery.length >= 2 && !selectedImage && (
                        <div className="space-y-6">
                            {searchResults.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-zinc-400 text-sm font-medium">
                                        {locale === 'tr' ? `"${searchQuery}" için sonuç bulunamadı.` : `No results for "${searchQuery}".`}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                                        {searchResults.length} {locale === 'tr' ? 'sonuç bulundu' : 'results found'}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {searchResults.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.id}`}
                                                onClick={onClose}
                                                className="bg-white dark:bg-[#111] border border-zinc-100 dark:border-zinc-800 p-4 rounded-[32px] flex items-center gap-6 hover:shadow-xl hover:shadow-zinc-100/50 dark:hover:shadow-none transition-all cursor-pointer group"
                                            >
                                                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 shrink-0">
                                                    <img src={product.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{product.category}</div>
                                                    <h5 className="font-bold text-base truncate uppercase tracking-tight">{product.name}</h5>
                                                    <span className="text-sm font-black tracking-tight">{product.price} TL</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    {!selectedImage && searchQuery.length < 2 && (
                        <div className="grid md:grid-cols-2 gap-10">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="group relative border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[32px] p-12 flex flex-col items-center justify-center gap-6 hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all cursor-pointer overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/50"
                            >
                                <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-lg shadow-zinc-200 dark:shadow-none group-hover:scale-110 transition-transform">
                                    <ImageIcon className="w-8 h-8 text-indigo-500" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-black uppercase tracking-tight mb-1">
                                        {locale === 'tr' ? 'Görsel Arama' : 'Visual Search'}
                                    </h3>
                                    <p className="text-zinc-400 text-sm font-medium">
                                        {locale === 'tr' ? 'Fotoğraf sürükleyin veya seçin' : 'Drag or select a photo'}
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
                                        <Sparkles size={12} className="text-indigo-500" /> {locale === 'tr' ? 'Popüler Aramalar' : 'Popular Searches'}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(locale === 'tr' ? ['Deri Ceket', 'Minimal Saat', 'Keten Üst', 'Premium Bot'] : ['Leather Jacket', 'Watch', 'Linen Top', 'Premium Boot']).map(tag => (
                                            <button key={tag} onClick={() => setSearchQuery(tag)} className="px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black rounded-xl text-xs font-bold transition-all uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isAnalyzing && (
                        <div className="py-20 flex flex-col items-center justify-center gap-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse" />
                                <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                            </div>
                            <div className="text-center space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                    <Sparkles className="w-4 h-4 text-indigo-500" />
                                    <span className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.2em] text-xs">
                                        {locale === 'tr' ? 'AI Analiz Ediyor' : 'AI Analyzing'}
                                    </span>
                                </div>
                                <p className="text-zinc-400 text-sm font-medium uppercase tracking-tight">
                                    {locale === 'tr' ? 'Koleksiyon taranıyor, mükemmel eşleşmeler bulunuyor...' : 'Scanning collection, finding perfect matches...'}
                                </p>
                            </div>
                        </div>
                    )}
                    {!isAnalyzing && selectedImage && (
                        <div className="space-y-10">
                            <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 p-6 rounded-[28px]">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white dark:border-zinc-700 shadow-xl">
                                        <img src={selectedImage} alt="Query" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-1">
                                            {locale === 'tr' ? 'Görsel Sorgusu' : 'Visual Query'}
                                        </span>
                                        <span className="text-sm font-bold">{locale === 'tr' ? 'Fotoğrafınız için akıllı eşleşmeler' : 'Smart matches for your photo'}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="px-6 py-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-black uppercase tracking-widest border border-zinc-100 dark:border-zinc-700 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all"
                                >
                                    {locale === 'tr' ? 'Temizle' : 'Clear'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                                {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        onClick={onClose}
                                        className="bg-white dark:bg-[#111] border border-zinc-100 dark:border-zinc-800 p-4 rounded-[32px] flex items-center gap-6 hover:shadow-xl transition-all cursor-pointer group"
                                    >
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 shrink-0">
                                            <img src={product.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">
                                                {locale === 'tr' ? '~%94 Eşleşme' : '~94% Match'}
                                            </div>
                                            <h5 className="font-bold text-base truncate uppercase tracking-tight">{product.name}</h5>
                                            <span className="text-sm font-black tracking-tight">{product.price} TL</span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                addToCart(product as { id: string; name: string; price: number; image_url: string });
                                            }}
                                            className="p-3 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black rounded-full transition-all text-zinc-400 mr-2"
                                        >
                                            <ShoppingBasket size={18} />
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
