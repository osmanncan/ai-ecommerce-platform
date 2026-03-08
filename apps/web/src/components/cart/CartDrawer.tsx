"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, addToCart, decreaseCartQuantity, t, locale } = useAppContext();

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
                            <div className="p-2 bg-zinc-900 dark:bg-white rounded-xl text-white dark:text-black">
                                <ShoppingBag size={20} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight uppercase">
                                {locale === 'tr' ? 'SEPETÄ°M' : 'MY CART'} ({cart.length})
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                            <X size={24} className="text-zinc-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-6">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-[32px] flex items-center justify-center">
                                    <ShoppingBag size={32} className="text-zinc-200 dark:text-zinc-700" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{locale === 'tr' ? 'Sepetiniz BoÅŸ' : 'Your Cart is Empty'}</h3>
                                    <p className="text-sm text-zinc-400">{locale === 'tr' ? 'HenÃ¼z bir Ã¼rÃ¼n eklemediniz.' : 'You haven\'t added any products yet.'}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all"
                                >
                                    {locale === 'tr' ? 'AlÄ±ÅŸveriÅŸe BaÅŸla' : 'Start Shopping'}
                                </button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-6 group">
                                    <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden shrink-0">
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 py-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-sm font-black truncate uppercase tracking-tight">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-zinc-300 dark:text-zinc-600 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="text-base font-black mb-4">{item.price.toLocaleString('tr-TR')} TL</div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 rounded-lg px-2 border border-zinc-100 dark:border-zinc-800">
                                                <button onClick={() => decreaseCartQuantity(item.id)} className="p-2 hover:text-black dark:hover:text-white text-zinc-400"><Minus size={14} /></button>
                                                <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                                                <button onClick={() => addToCart(item)} className="p-2 hover:text-black dark:hover:text-white text-zinc-400"><Plus size={14} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-8 bg-zinc-50 dark:bg-[#111] border-t border-zinc-100 dark:border-zinc-800 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium text-zinc-500">
                                    <span>{locale === 'tr' ? 'Ara Toplam' : 'Subtotal'}</span>
                                    <span>{total.toLocaleString('tr-TR')} TL</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-zinc-500">
                                    <span>{locale === 'tr' ? 'Kargo' : 'Shipping'}</span>
                                    <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">{locale === 'tr' ? 'Ãœcretsiz' : 'Free'}</span>
                                </div>
                                <div className="pt-4 flex justify-between items-end border-t border-zinc-200 dark:border-zinc-700">
                                    <span className="text-xs font-black uppercase tracking-[0.2em]">{locale === 'tr' ? 'Toplam' : 'Total'}</span>
                                    <span className="text-2xl font-black">{total.toLocaleString('tr-TR')} TL</span>
                                </div>
                            </div>
                            <Link href="/checkout" onClick={onClose} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-white/5 flex items-center justify-center gap-3 group">
                                {locale === 'tr' ? 'Ã–demeye GeÃ§' : 'Checkout'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
