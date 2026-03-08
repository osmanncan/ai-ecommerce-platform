"use client";

import { Sun, Moon } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useAppContext();

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-between w-14 h-7 bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 cursor-pointer transition-all duration-500 border border-zinc-200 dark:border-white/10 group overflow-hidden"
            aria-label="Toggle Theme"
        >
            {/* Background Track UI */}
            <div className="flex items-center justify-between w-full px-1">
                <Sun size={12} className={`transition-all duration-500 ${theme === 'light' ? 'text-zinc-400 opacity-20' : 'text-zinc-500 opacity-100'}`} />
                <Moon size={12} className={`transition-all duration-500 ${theme === 'dark' ? 'text-zinc-400 opacity-20' : 'text-zinc-400 opacity-100'}`} />
            </div>

            {/* Sliding Circle */}
            <div
                className={`absolute w-5 h-5 rounded-full bg-white dark:bg-black shadow-lg flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${theme === 'light' ? 'translate-x-0' : 'translate-x-7'
                    }`}
            >
                {theme === 'light' ? (
                    <Sun size={10} className="text-orange-500 fill-orange-500 animate-in zoom-in duration-300" />
                ) : (
                    <Moon size={10} className="text-indigo-400 fill-indigo-400 animate-in zoom-in duration-300" />
                )}
            </div>

            {/* Outer Glow */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'light' ? 'bg-orange-500/5 opacity-100' : 'bg-indigo-500/5 opacity-100'
                }`} />
        </button>
    );
}
