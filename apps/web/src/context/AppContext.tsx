"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { tr } from '@/i18n/tr';
import { en } from '@/i18n/en';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    image_url: string;
    quantity: number;
}

interface CartProduct {
    id: string;
    name: string;
    price: number;
    image_url: string;
    selectedSize?: string;
}

interface AppContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    cart: CartItem[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: string) => void;
    decreaseCartQuantity: (productId: string) => void;
    clearCart: () => void;
    wishlist: string[];
    toggleWishlist: (productId: string) => void;
    isLoggedIn: boolean;
    isAdmin: boolean;
    logout: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    isInitialized: boolean;
    locale: 'tr' | 'en';
    toggleLocale: () => void;
    t: typeof tr;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUserState] = useState<User | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [locale, setLocale] = useState<'tr' | 'en'>('tr');
    const [isInitialized, setIsInitialized] = useState(false);

    const t = locale === 'tr' ? tr : en;

    useEffect(() => {
        const savedCart = localStorage.getItem('aura_cart');
        const savedWishlist = localStorage.getItem('aura_wishlist');
        const savedTheme = localStorage.getItem('aura_theme') as 'light' | 'dark';

        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
        if (savedTheme) setTheme(savedTheme);

        const savedLocale = localStorage.getItem('aura_locale') as 'tr' | 'en';
        if (savedLocale) setLocale(savedLocale);

        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name, role')
                    .eq('id', session.user.id)
                    .single();

                setUserState({
                    id: session.user.id,
                    email: session.user.email || '',
                    name: profile?.full_name || session.user.email?.split('@')[0] || 'Aura Member',
                    role: profile?.role === 'admin' ? 'admin' : 'customer',
                });
            }
            setIsInitialized(true);
        };

        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name, role')
                    .eq('id', session.user.id)
                    .single();

                setUserState({
                    id: session.user.id,
                    email: session.user.email || '',
                    name: profile?.full_name || session.user.email?.split('@')[0] || 'Aura Member',
                    role: profile?.role === 'admin' ? 'admin' : 'customer',
                });
            } else if (event === 'SIGNED_OUT') {
                setUserState(null);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!isInitialized) return;

        localStorage.setItem('aura_cart', JSON.stringify(cart));
        localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
        localStorage.setItem('aura_theme', theme);
        localStorage.setItem('aura_locale', locale);

        if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            if (theme === 'dark') {
                root.classList.add('dark');
                root.style.colorScheme = 'dark';
            } else {
                root.classList.remove('dark');
                root.style.colorScheme = 'light';
            }
        }
    }, [cart, wishlist, theme, locale, isInitialized]);

    const setUser = (u: User | null) => setUserState(u);

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const addToCart = (product: CartProduct) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                quantity: 1,
            }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const decreaseCartQuantity = (productId: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing && existing.quantity > 1) {
                return prev.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
            return prev.filter(item => item.id !== productId);
        });
    };

    const clearCart = () => setCart([]);

    const toggleWishlist = (productId: string) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleLocale = useCallback(() => {
        setLocale(prev => prev === 'tr' ? 'en' : 'tr');
    }, []);

    return (
        <AppContext.Provider value={{
            user, setUser, cart, addToCart, removeFromCart, decreaseCartQuantity, clearCart,
            wishlist, toggleWishlist, logout,
            isLoggedIn: !!user,
            isAdmin: user?.role === 'admin',
            theme,
            toggleTheme,
            isInitialized,
            locale,
            toggleLocale,
            t,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
