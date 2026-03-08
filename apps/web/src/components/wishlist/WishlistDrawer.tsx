"use client";

import { useEffect } from "react";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { MOCK_PRODUCTS } from "@ai-first/shared";

interface WishlistDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
    const { wishlist, toggleWishlist, addToCart, locale } = useAppContext();

    const wishlistItems = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id as string));

    // Scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] overflow-hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white dark:bg-[#0a0a0a] shadow-2xl animate-in slide-in-from-right duration-500">
                <div className="h-full flex flex-col">
                    <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-pink-500 rounded-xl text-white">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <h2 className="text-xl font-black tracking-tight uppercase">
                                {locale === 'tr' ? 'FAVORİLERİM' : 'WISHLIST'} ({wishlist.length})
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                            <X size={24} className="text-zinc-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-6">
                        {wishlistItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-[32px] flex items-center justify-center">
                                    <Heart size={32} className="text-zinc-200 dark:text-zinc-700" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{locale === 'tr' ? 'Listeniz Boş' : 'Your List is Empty'}</h3>
                                    <p className="text-sm text-zinc-400">{locale === 'tr' ? 'Favori ürünlerinizi burada biriktirin.' : 'Save your favorite products here.'}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all"
                                >
                                    {locale === 'tr' ? 'Ürünleri Keşfet' : 'Explore Products'}
                                </button>
                            </div>
                        ) : (
                            wishlistItems.map((item) => (
                                <div key={item.id} className="flex gap-6 group">
                                    <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden shrink-0">
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 py-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-sm font-black truncate uppercase tracking-tight">{item.name}</h4>
                                            <button
                                                onClick={() => toggleWishlist(item.id as string)}
                                                className="p-2 text-zinc-300 dark:text-zinc-600 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="text-base font-black mb-4">{item.price} TL</div>
                                        <button
                                            onClick={() => addToCart(item as { id: string; name: string; price: number; image_url: string })}
                                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors min-h-[44px]"
                                        >
                                            <ShoppingBag size={14} /> {locale === 'tr' ? 'Sepete Ekle' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
