"use client";

import React, { useState, useEffect, useRef } from 'react';

interface NeuralCoreProps {
    isSecureMode: boolean;
}

export default function NeuralCore({ isSecureMode }: NeuralCoreProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 25;
                const y = (e.clientY - rect.top - rect.height / 2) / 25;
                setMousePos({
                    x: Math.max(-10, Math.min(10, x)),
                    y: Math.max(-10, Math.min(10, y))
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="relative w-56 h-56 mx-auto mb-12 flex items-center justify-center">
            <div className={`absolute inset-0 rounded-full blur-[100px] transition-all duration-1000 ${isSecureMode ? 'bg-red-500/5' : 'bg-white/10'
                }`} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full border-[0.5px] border-white/10 rounded-full animate-[spin_20s_linear_infinite]" style={{ transform: `rotateX(70deg) rotateY(${mousePos.x * 2}deg)` }} />
                <div className="absolute w-[85%] h-[85%] border-[0.5px] border-white/5 rounded-full animate-[spin_15s_linear_reverse_infinite]" style={{ transform: `rotateX(-60deg) rotateY(${mousePos.y * 2}deg)` }} />
            </div>
            <div
                className={`relative w-28 h-28 flex items-center justify-center transition-all duration-1000 ${isSecureMode ? 'scale-90' : 'scale-100'
                    }`}
                style={{
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                }}
            >
                <div className={`absolute inset-0 bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl transition-all duration-1000 rotate-45 ${isSecureMode ? 'border-red-500/30 bg-red-500/[0.02]' : 'border-white/20'
                    }`} />
                <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.8)] transition-all duration-1000 ${isSecureMode ? 'bg-red-500 shadow-[0_0_40px_rgba(239,68,68,1)] scale-[20] opacity-10' : 'bg-white scale-100'
                    }`} />

                <div className={`absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-1000 animate-pulse ${isSecureMode ? 'opacity-100' : 'opacity-0'
                    }`} />
            </div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full blur-[1px]"
                        style={{
                            top: `${40 + i * 10}%`,
                            left: `${40 + (i % 2) * 20}%`,
                            animation: `pulse ${2 + i}s infinite ease-in-out`
                        }}
                    />
                ))}
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="flex flex-col items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-[0.5em] transition-all duration-1000 ${isSecureMode ? 'text-red-500 tracking-[0.7em]' : 'text-zinc-500'
                        }`}>
                        {isSecureMode ? 'Security Protocol' : 'Identity Core'}
                    </span>
                    <div className={`h-[1px] transition-all duration-1000 bg-current ${isSecureMode ? 'w-24 bg-red-500' : 'w-12 bg-zinc-800'}`} />
                </div>
            </div>
        </div>
    );
}
