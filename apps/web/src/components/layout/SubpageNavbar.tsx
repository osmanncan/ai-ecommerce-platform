import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SubpageNavbarProps {
    backLabel?: string;
}

export default function SubpageNavbar({ backLabel = "Geri" }: SubpageNavbarProps) {
    return (
        <nav className="sticky top-0 z-50 px-6 sm:px-12 py-6 flex justify-between items-center bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-900">
            <Link href="/" className="flex items-center gap-3 uppercase text-[10px] font-black tracking-[0.3em] hover:-translate-x-2 transition-transform">
                <ArrowLeft size={16} /> {backLabel}
            </Link>
            <Link href="/" className="text-2xl font-black tracking-tighter uppercase">AURA</Link>
            <div className="w-16" />
        </nav>
    );
}
