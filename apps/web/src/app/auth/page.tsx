"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Mail,
    Lock,
    User,
    Loader2,
    Eye,
    EyeOff
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import NeuralCore from "@/components/auth/NeuralCore";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSecureMode, setIsSecureMode] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push("/");
            } else {
                const { error: signUpError, data } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (signUpError) throw signUpError;

                if (data.user) {
                    await supabase.from('profiles').insert({
                        id: data.user.id,
                        full_name: name,
                    });
                }

                router.push("/");
            }
        } catch (error: any) {
            const msg = error.message || "";
            if (msg.includes("Invalid login credentials")) {
                setErrorMsg("E-posta veya ÅŸifre hatalÄ±. LÃ¼tfen tekrar deneyin.");
            } else if (msg.includes("Email not confirmed")) {
                setErrorMsg("E-posta adresiniz henÃ¼z onaylanmamÄ±ÅŸ. LÃ¼tfen gelen kutunuzu kontrol edin veya Supabase panelinden 'Confirm email' ayarÄ±nÄ± kapatÄ±n.");
            } else if (msg.includes("User already registered")) {
                setErrorMsg("Bu e-posta adresi zaten kayÄ±tlÄ±. GiriÅŸ yapmayÄ± deneyin.");
            } else {
                setErrorMsg(msg || "Bir hata oluÅŸtu.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-zinc-200/50 dark:bg-zinc-800/30 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-zinc-200/50 dark:bg-zinc-800/30 rounded-full blur-[100px]" />

            <div className="relative w-full max-w-5xl min-h-[500px] md:h-[750px] bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded-[24px] md:rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col md:flex-row animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <a href="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-50 inline-flex items-center gap-3 text-zinc-400 hover:text-black dark:hover:text-white transition-all group uppercase text-[9px] font-black tracking-[0.3em]">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> MaÄŸazaya DÃ¶n
                </a>
                <div className="relative w-full h-full flex flex-col md:flex-row z-10 bg-white dark:bg-[#0a0a0a]">
                    <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-10 md:p-16">
                        <div className={`w-full max-w-sm space-y-8 md:space-y-12 transition-all duration-700 delay-100 ${isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none absolute md:relative'}`}>
                            <div className="space-y-3">
                                <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white tracking-tighter uppercase leading-none">Oturum AÃ§</h2>
                                <p className="text-zinc-400 font-medium text-sm">LÃ¼ksÃ¼n dijital dÃ¼nyasÄ±na tekrar hoÅŸ geldiniz.</p>
                                {errorMsg && <p className="text-red-500 font-bold text-xs">{errorMsg}</p>}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">E-POSTA ADRESÄ°</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                                            <input
                                                required
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-transparent border-b border-zinc-100 py-4 pl-8 pr-4 text-black focus:outline-none focus:border-black transition-all font-medium placeholder:text-zinc-200"
                                                placeholder="mail@domain.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">ÅžÄ°FRE</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                                            <input
                                                required
                                                type={showPassword ? "text" : "password"}
                                                onFocus={() => setIsSecureMode(true)}
                                                onBlur={() => setIsSecureMode(false)}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-transparent border-b border-zinc-100 dark:border-zinc-800 py-4 pl-8 pr-12 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-all font-medium placeholder:text-zinc-200 dark:placeholder:text-zinc-700"
                                                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                                            />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-black dark:hover:text-white transition-colors">
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                    <button disabled={isLoading} className="w-full bg-black dark:bg-white text-white dark:text-black py-5 md:py-6 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-2xl shadow-black/10 dark:shadow-white/5">
                                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : "GÄ°RÄ°Åž YAP"}
                                </button>
                            </form>
                            <button onClick={() => setIsLogin(false)} className="md:hidden w-full text-center text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors">
                                HesabÄ±n yok mu? <span className="underline underline-offset-4">Kaydol</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-10 md:p-16">
                        <div className={`w-full max-w-sm space-y-8 md:space-y-12 transition-all duration-700 delay-100 ${!isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none absolute md:relative'}`}>
                            <div className="space-y-3">
                                <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white tracking-tighter uppercase leading-none">Kaydol</h2>
                                <p className="text-zinc-400 font-medium text-sm">Sizin iÃ§in kÃ¼ratize edilmiÅŸ moda dÃ¼nyasÄ±na katÄ±lÄ±n.</p>
                                {errorMsg && <p className="text-red-500 font-bold text-xs">{errorMsg}</p>}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">AD SOYAD</label>
                                        <div className="relative group">
                                            <User className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                                            <input
                                                required
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-transparent border-b border-zinc-100 dark:border-zinc-800 py-4 pl-8 pr-4 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-all font-medium placeholder:text-zinc-200 dark:placeholder:text-zinc-700"
                                                placeholder="AdÄ±nÄ±z SoyadÄ±nÄ±z"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">E-POSTA ADRESÄ°</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                                            <input
                                                required
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-transparent border-b border-zinc-100 dark:border-zinc-800 py-4 pl-8 pr-4 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-all font-medium placeholder:text-zinc-200 dark:placeholder:text-zinc-700"
                                                placeholder="mail@domain.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">ÅžÄ°FRE</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                                            <input
                                                required
                                                type="password"
                                                onFocus={() => setIsSecureMode(true)}
                                                onBlur={() => setIsSecureMode(false)}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-transparent border-b border-zinc-100 dark:border-zinc-800 py-4 pl-8 pr-4 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-all font-medium placeholder:text-zinc-200 dark:placeholder:text-zinc-700"
                                                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button disabled={isLoading} className="w-full bg-black dark:bg-white text-white dark:text-black py-5 md:py-6 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : "HESAP OLUÅžTUR"}
                                </button>
                            </form>
                            <button onClick={() => setIsLogin(true)} className="md:hidden w-full text-center text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors">
                                Zaten Ã¼ye misin? <span className="underline underline-offset-4">GiriÅŸ Yap</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`absolute top-0 w-1/2 h-full bg-black transition-all duration-1000 cubic-bezier(0.85, 0, 0.15, 1) z-40 overflow-hidden hidden md:flex flex-col items-center justify-center text-center p-8 lg:p-16 ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}>
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    <div className="relative z-10 space-y-12">
                        <NeuralCore isSecureMode={isSecureMode} />

                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-white tracking-[0.2em] uppercase leading-none">
                                {isLogin ? "KeÅŸfet" : "Geri DÃ¶n"}
                            </h2>
                            <div className="w-12 h-[1px] bg-white/20 mx-auto" />
                            <p className="text-zinc-500 font-medium max-w-[260px] mx-auto leading-relaxed text-sm">
                                {isLogin
                                    ? "HenÃ¼z Ã¼ye deÄŸil misiniz? AURA topluluÄŸuna katÄ±lmak iÃ§in kaydolun."
                                    : "KiÅŸisel stil profilinize ve favorilerinize ulaÅŸmak iÃ§in giriÅŸ yapÄ±n."
                                }
                            </p>
                        </div>

                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="px-14 py-5 border-[0.5px] border-white/20 hover:border-white/60 text-white rounded-full font-bold uppercase text-[9px] tracking-[0.4em] transition-all hover:bg-white/5 active:scale-95"
                        >
                            {isLogin ? "Kaydol" : "GiriÅŸ Yap"}
                        </button>
                    </div>
                    <div className="absolute top-1/2 -left-px w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                    <div className="absolute top-1/2 -right-px w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                </div>

            </div>
        </div>
    );
}
