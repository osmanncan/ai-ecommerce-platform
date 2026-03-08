"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Sparkles, Loader2, ArrowLeft, RotateCcw, ShoppingBag, ExternalLink } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    stock: number;
}

interface Message {
    role: "user" | "assistant";
    content: string;
}

function parseMessageContent(content: string, products: Product[]) {
    const parts: Array<{ type: 'text'; value: string } | { type: 'product'; product: Product }> = [];
    const regex = /\[\[PRODUCT:(\d+)\]\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', value: content.slice(lastIndex, match.index) });
        }
        const productId = match[1];
        const product = products.find(p => String(p.id) === productId);
        if (product) {
            parts.push({ type: 'product', product });
        } else {
            parts.push({ type: 'text', value: match[0] });
        }
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
        parts.push({ type: 'text', value: content.slice(lastIndex) });
    }

    return parts;
}

function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useAppContext();

    return (
        <div className="my-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group">
            <div className="flex gap-4 p-3">
                <a href={`/product/${product.id}`} className="shrink-0">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl group-hover:scale-105 transition-transform"
                    />
                </a>
                <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                    <div>
                        <a href={`/product/${product.id}`} className="text-xs sm:text-sm font-bold hover:underline line-clamp-1">
                            {product.name}
                        </a>
                        <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 uppercase tracking-wider font-medium">
                            {product.category}
                        </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                        <span className="text-sm sm:text-base font-black tracking-tight">
                            {product.price.toLocaleString('tr-TR')} TL
                        </span>
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image_url: product.image_url })}
                                className="flex items-center gap-1.5 px-3 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg text-[10px] sm:text-xs font-bold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors active:scale-95"
                            >
                                <ShoppingBag size={12} />
                                Sepete Ekle
                            </button>
                            <a
                                href={`/product/${product.id}`}
                                className="p-2.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                title="Ürünü İncele"
                            >
                                <ExternalLink size={14} className="text-zinc-500" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AIStylist() {
    const { locale, t } = useAppContext();

    const welcomeMessage = locale === 'tr'
        ? "Merhaba! Ben AURA'nın yapay zeka destekli stil danışmanıyım. Size özel kombin önerileri, kumaş tavsiyeleri ve stil rehberliği sunabilirim. Bugün size nasıl yardımcı olabilirim?"
        : "Hello! I'm AURA's AI-powered style consultant. I can offer personalized outfit suggestions, fabric recommendations and style guidance. How can I help you today?";

    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: welcomeMessage }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input.trim() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setError(null);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Bir hata oluştu");
            }

            if (data.products && data.products.length > 0) {
                setProducts(data.products);
            }

            setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
        } catch (err: any) {
            setError(err.message);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: locale === 'tr'
                    ? "Üzgünüm, şu an yanıt üretemiyorum. Lütfen tekrar deneyin."
                    : "Sorry, I can't generate a response right now. Please try again."
            }]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleReset = () => {
        setMessages([{ role: "assistant", content: welcomeMessage }]);
        setProducts([]);
        setError(null);
    };

    const quickPrompts = locale === 'tr'
        ? ["Düğün için kombin öner", "Günlük şık bir stil istiyorum", "Ofis kıyafeti tavsiyesi", "İlk buluşma için ne giymeliyim?"]
        : ["Suggest a wedding outfit", "I want a casual chic style", "Office wear advice", "What to wear on a first date?"];

    return (
        <div className="flex flex-col h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <header className="px-6 sm:px-8 py-5 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-900 flex justify-between items-center z-10">
                <div className="flex items-center gap-4 sm:gap-6">
                    <a href="/" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </a>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white dark:text-black" />
                        </div>
                        <div>
                            <h1 className="text-sm sm:text-lg font-black tracking-tight uppercase">
                                {locale === 'tr' ? 'AI Stil Danışmanı' : 'AI Style Consultant'}
                            </h1>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <p className="text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                                    AURA AI • {locale === 'tr' ? 'Çevrimiçi' : 'Online'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={handleReset} className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl text-zinc-500 transition-colors" title={locale === 'tr' ? 'Sohbeti Sıfırla' : 'Reset Chat'}>
                    <RotateCcw size={18} />
                </button>
            </header>
            <div className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 space-y-8 scroll-smooth max-w-5xl mx-auto w-full">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-4 max-w-[90%] sm:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user'
                                ? 'bg-zinc-200 dark:bg-zinc-800'
                                : 'bg-zinc-900 dark:bg-white'}`}>
                                {msg.role === 'user'
                                    ? <User size={18} className="text-zinc-600 dark:text-zinc-300" />
                                    : <Sparkles size={18} className="text-white dark:text-black" />}
                            </div>
                            <div className={`px-5 py-4 text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl rounded-tr-sm'
                                : 'bg-white dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm'
                                }`}>
                                {msg.role === 'assistant' && products.length > 0
                                    ? parseMessageContent(msg.content, products).map((part, j) =>
                                        part.type === 'text'
                                            ? <span key={j} className="whitespace-pre-wrap">{part.value}</span>
                                            : <ProductCard key={j} product={part.product} />
                                    )
                                    : <span className="whitespace-pre-wrap">{msg.content}</span>
                                }
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex gap-4">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center">
                                <Loader2 size={18} className="text-white dark:text-black animate-spin" />
                            </div>
                            <div className="bg-white dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 px-5 py-4 rounded-2xl rounded-tl-sm">
                                <div className="flex items-center gap-2 text-sm text-zinc-400">
                                    <span className="inline-block w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="inline-block w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="inline-block w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {messages.length <= 1 && (
                <div className="px-4 sm:px-12 pb-4 max-w-4xl mx-auto w-full">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {quickPrompts.map(hint => (
                            <button key={hint} onClick={() => { setInput(hint); }}
                                className="text-[10px] sm:text-xs font-bold px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                {hint}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div className="px-4 sm:px-10 py-6 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-900">
                <div className="max-w-4xl mx-auto">
                    <div className="relative flex items-center">
                        <input
                            ref={inputRef}
                            autoFocus
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={locale === 'tr' ? "Stiliniz hakkında bir şey sorun..." : "Ask something about your style..."}
                            disabled={isLoading}
                            className="flex-1 bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-6 pr-16 py-5 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all text-sm font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-600 disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 p-3.5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-30 disabled:hover:bg-zinc-900 dark:disabled:hover:bg-white"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="text-center text-[9px] font-medium text-zinc-400 mt-3 uppercase tracking-widest">
                        Powered by AURA AI
                    </p>
                </div>
            </div>
        </div>
    );
}
