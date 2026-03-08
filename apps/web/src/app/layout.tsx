import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
    title: "AURA | Yeni Nesil Lüks E-Ticaret",
    description: "Kişiselleştirilmiş stil deneyimi ile geleceğin e-ticaret platformu.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{
                    __html: `
                    (function() {
                        try {
                            var theme = localStorage.getItem('aura_theme');
                            if (theme === 'dark') {
                                document.documentElement.classList.add('dark');
                                document.documentElement.style.colorScheme = 'dark';
                            } else {
                                document.documentElement.classList.remove('dark');
                                document.documentElement.style.colorScheme = 'light';
                            }
                        } catch(e) {}
                    })();
                `}} />
            </head>
            <body className="antialiased">
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}
