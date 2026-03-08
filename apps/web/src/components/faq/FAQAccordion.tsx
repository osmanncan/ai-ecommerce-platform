"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
    q: string;
    a: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="space-y-2">
            {faqs.map((faq, i) => (
                <div key={i} className="border border-zinc-200 dark:border-zinc-900">
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                    >
                        <span className="text-sm font-bold pr-8">{faq.q}</span>
                        <ChevronDown size={18} className={`text-zinc-400 transition-transform shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-6 px-6' : 'max-h-0'}`}>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">{faq.a}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
