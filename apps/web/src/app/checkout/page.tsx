"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CreditCard, Lock, Truck, CheckCircle, ShoppingBag, Sparkles, AlertTriangle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function CheckoutPage() {
    const { cart, removeFromCart, clearCart, user, t, locale } = useAppContext();
    const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
    });

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 49.90;
    const total = subtotal + shipping;

    const handleInput = (field: string, value: string) => {
        if (field === 'cardNumber') {
            value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
        }
        if (field === 'expiry') {
            value = value.replace(/\D/g, '').slice(0, 4);
            if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
        }
        if (field === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 3);
        }
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
        }
    };

    const validateShipping = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = locale === 'tr' ? 'Ad zorunludur' : 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = locale === 'tr' ? 'Soyad zorunludur' : 'Last name is required';
        if (!formData.email.trim()) newErrors.email = locale === 'tr' ? 'E-posta zorunludur' : 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = locale === 'tr' ? 'Telefon zorunludur' : 'Phone is required';
        if (!formData.address.trim()) newErrors.address = locale === 'tr' ? 'Adres zorunludur' : 'Address is required';
        if (!formData.city.trim()) newErrors.city = locale === 'tr' ? 'Åžehir zorunludur' : 'City is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePayment = (): boolean => {
        const newErrors: Record<string, string> = {};
        const cardDigits = formData.cardNumber.replace(/\s/g, '');
        if (cardDigits.length < 16) newErrors.cardNumber = locale === 'tr' ? 'GeÃ§erli bir kart numarasÄ± girin' : 'Enter a valid card number';
        if (!formData.cardName.trim()) newErrors.cardName = locale === 'tr' ? 'Kart sahibi adÄ± zorunludur' : 'Cardholder name is required';
        if (formData.expiry.length < 5) newErrors.expiry = locale === 'tr' ? 'GeÃ§erli bir tarih girin' : 'Enter a valid expiry';
        if (formData.cvv.length < 3) newErrors.cvv = locale === 'tr' ? 'GeÃ§erli bir CVV girin' : 'Enter a valid CVV';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = () => {
        if (!validatePayment()) return;
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            clearCart();
            setStep('success');
        }, 2500);
    };

    if (cart.length === 0 && step !== 'success') {
        return (
            <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans flex flex-col items-center justify-center px-6">
                <ShoppingBag size={48} strokeWidth={1} className="text-zinc-300 dark:text-zinc-700 mb-6" />
                <h1 className="text-2xl font-black uppercase tracking-tight mb-2">{locale === 'tr' ? 'Sepetiniz BoÅŸ' : 'Your Cart is Empty'}</h1>
                <p className="text-sm text-zinc-500 font-medium mb-8">{locale === 'tr' ? 'Ã–deme yapabilmek iÃ§in sepetinize Ã¼rÃ¼n ekleyin.' : 'Add products to your cart to checkout.'}</p>
                <Link href="/" className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                    {locale === 'tr' ? 'AlÄ±ÅŸveriÅŸe BaÅŸla' : 'Start Shopping'}
                </Link>
            </main>
        );
    }

    if (step === 'success') {
        return (
            <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans flex flex-col items-center justify-center px-6 text-center">
                <div className="relative mb-8">
                    <div className="w-24 h-24 bg-green-500/10 dark:bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                        <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <Sparkles size={16} className="absolute -top-2 -right-2 text-green-400 animate-bounce" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                    {locale === 'tr' ? 'SipariÅŸ OnaylandÄ±!' : 'Order Confirmed!'}
                </h1>
                <p className="text-zinc-500 font-medium max-w-md mb-2">
                    {locale === 'tr'
                        ? 'SipariÅŸiniz baÅŸarÄ±yla alÄ±ndÄ±. Kargo bilgileri e-posta adresinize gÃ¶nderilecektir.'
                        : 'Your order has been received successfully. Shipping details will be sent to your email.'}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-10">
                    {locale === 'tr' ? 'SipariÅŸ No' : 'Order No'}: #AURA-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                </p>
                <div className="flex gap-4">
                    <Link href="/" className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                        {locale === 'tr' ? 'Ana Sayfaya DÃ¶n' : 'Back to Home'}
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 font-sans">
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertTriangle size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {locale === 'tr' ? 'Demo Projesi â€” GerÃ§ek Ã¶deme alÄ±nmaz' : 'Demo Project â€” No real payments are processed'}
                </span>
            </div>
            <nav className="sticky top-0 z-50 px-6 sm:px-12 py-6 flex justify-between items-center bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-900">
                <Link href="/" className="flex items-center gap-3 uppercase text-[10px] font-black tracking-[0.3em] hover:-translate-x-2 transition-transform">
                    <ArrowLeft size={16} /> {locale === 'tr' ? 'Geri' : 'Back'}
                </Link>
                <Link href="/" className="text-2xl font-black tracking-tighter uppercase">AURA</Link>
                <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <Lock size={12} />
                    {locale === 'tr' ? 'GÃ¼venli Ã–deme' : 'Secure Checkout'}
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
                <div className="flex-1 space-y-12">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setStep('info')}
                            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] pb-2 border-b-2 transition-colors ${step === 'info' ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white' : 'border-transparent text-zinc-400'}`}>
                            <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[8px]">1</span>
                            {locale === 'tr' ? 'Teslimat' : 'Shipping'}
                        </button>
                        <div className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
                        <button onClick={() => step === 'payment' ? null : null}
                            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] pb-2 border-b-2 transition-colors ${step === 'payment' ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white' : 'border-transparent text-zinc-400'}`}>
                            <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[8px]">2</span>
                            {locale === 'tr' ? 'Ã–deme' : 'Payment'}
                        </button>
                    </div>
                    {step === 'info' && (
                        <div className="space-y-8 animate-in fade-in">
                            <h2 className="text-2xl font-black uppercase tracking-tight">{locale === 'tr' ? 'Teslimat Bilgileri' : 'Shipping Information'}</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{locale === 'tr' ? 'Ad' : 'First Name'} <span className="text-red-400">*</span></label>
                                    <input type="text" value={formData.firstName} onChange={e => handleInput('firstName', e.target.value)}
                                        className={`w-full bg-transparent border-b-2 py-4 text-sm font-medium focus:outline-none transition-colors ${errors.firstName ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white'}`} />
                                    {errors.firstName && <p className="text-[10px] text-red-400 font-medium mt-1">{errors.firstName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{locale === 'tr' ? 'Soyad' : 'Last Name'} <span className="text-red-400">*</span></label>
                                    <input type="text" value={formData.lastName} onChange={e => handleInput('lastName', e.target.value)}
                                        className={`w-full bg-transparent border-b-2 py-4 text-sm font-medium focus:outline-none transition-colors ${errors.lastName ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white'}`} />
                                    {errors.lastName && <p className="text-[10px] text-red-400 font-medium mt-1">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{locale === 'tr' ? 'E-Posta' : 'Email'} <span className="text-red-400">*</span></label>
                                    <input type="email" value={formData.email} onChange={e => handleInput('email', e.target.value)}
                                        className={`w-full bg-transparent border-b-2 py-4 text-sm font-medium focus:outline-none transition-colors ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white'}`} />
                                    {errors.email && <p className="text-[10px] text-red-400 font-medium mt-1">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{locale === 'tr' ? 'Telefon' : 'Phone'} <span className="text-red-400">*</span></label>
                                    <input type="tel" value={formData.phone} onChange={e => handleInput('phone', e.target.value)} placeholder="+90 5XX XXX XX XX"
                                        className={`w-full bg-transparent border-b-2 py-4 text-sm font-medium focus:outline-none transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 ${errors.phone ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white'}`} />
                                    {errors.phone && <p className="text-[10px] text-red-400 font-medium mt-1">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{locale === 'tr' ? 'Adres' : 'Address'} <span className="text-red-400">*</span></label>
                                <input type="text" value={formData.address} onChange={e => handleInput('address', e.target.value)}
                                    className={`w-full bg-transparent border-b-2 py-4 text-sm font-medium focus:outline-none transition-colors ${errors.address ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white'}`} />
                                {errors.address && <p className="text-[10px] text-red-400 font-medium mt-1">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{locale === 'tr' ? 'Åžehir' : 'City'} <span className="text-red-400">*</span></label>
                                    <input type="text" value={formData.city} onChange={e => handleInput('city', e.target.value)}
                                        className={`w-full bg-transparent border-b-2 py-4 text-sm font-medium focus:outline-none transition-colors ${errors.city ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white'}`} />
                                    {errors.city && <p className="text-[10px] text-red-400 font-medium mt-1">{errors.city}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{locale === 'tr' ? 'Posta Kodu' : 'ZIP Code'}</label>
                                    <input type="text" value={formData.zipCode} onChange={e => handleInput('zipCode', e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-4 text-sm font-medium focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors" />
                                </div>
                            </div>

                            <button onClick={() => { if (validateShipping()) setStep('payment'); }}
                                className="w-full py-6 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors active:scale-[0.98] flex items-center justify-center gap-3">
                                <Truck size={16} /> {locale === 'tr' ? 'Ã–demeye GeÃ§' : 'Continue to Payment'}
                            </button>
                        </div>
                    )}
                    {step === 'payment' && (
                        <div className="space-y-8 animate-in fade-in">
                            <h2 className="text-2xl font-black uppercase tracking-tight">{locale === 'tr' ? 'Ã–deme Bilgileri' : 'Payment Details'}</h2>
                            <div className="relative w-full max-w-sm aspect-[1.6/1] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 rounded-2xl p-6 flex flex-col justify-between text-white dark:text-black overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 dark:bg-black/5 rounded-full blur-3xl" />
                                <div className="flex justify-between items-start relative z-10">
                                    <span className="text-lg font-black tracking-tighter uppercase">AURA</span>
                                    <CreditCard size={28} strokeWidth={1.5} className="opacity-60" />
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <p className="text-lg font-mono tracking-[0.15em]">
                                        {formData.cardNumber || 'â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢'}
                                    </p>
                                    <div className="flex justify-between items-end text-xs font-bold uppercase tracking-widest opacity-80">
                                        <span>{formData.cardName || (locale === 'tr' ? 'KART SAHÄ°BÄ°' : 'CARDHOLDER')}</span>
                                        <span>{formData.expiry || 'MM/YY'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{locale === 'tr' ? 'Kart NumarasÄ±' : 'Card Number'}</label>
                                    <input type="text" value={formData.cardNumber} onChange={e => handleInput('cardNumber', e.target.value)} placeholder="0000 0000 0000 0000"
                                        className={`w-full bg-transparent border-b-2 py-4 text-sm font-mono font-medium focus:outline-none transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 ${errors.cardNumber ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white'}`} />
                                    {errors.cardNumber && <p className="text-[10px] text-red-400 font-medium mt-1">{errors.cardNumber}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{locale === 'tr' ? 'Kart Ãœzerindeki Ä°sim' : 'Name on Card'}</label>
                                    <input type="text" value={formData.cardName} onChange={e => handleInput('cardName', e.target.value.toUpperCase())}
                                        className={`w-full bg-transparent border-b-2 py-4 text-sm font-medium uppercase focus:outline-none transition-colors ${errors.cardName ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white'}`} />
                                    {errors.cardName && <p className="text-[10px] text-red-400 font-medium mt-1">{errors.cardName}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{locale === 'tr' ? 'Son Kullanma' : 'Expiry'}</label>
                                        <input type="text" value={formData.expiry} onChange={e => handleInput('expiry', e.target.value)} placeholder="MM/YY"
                                            className={`w-full bg-transparent border-b-2 py-4 text-sm font-mono font-medium focus:outline-none transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 ${errors.expiry ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white'}`} />
                                        {errors.expiry && <p className="text-[10px] text-red-400 font-medium mt-1">{errors.expiry}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">CVV</label>
                                        <input type="password" value={formData.cvv} onChange={e => handleInput('cvv', e.target.value)} placeholder="â€¢â€¢â€¢"
                                            className={`w-full bg-transparent border-b-2 py-4 text-sm font-mono font-medium focus:outline-none transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 ${errors.cvv ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white'}`} />
                                        {errors.cvv && <p className="text-[10px] text-red-400 font-medium mt-1">{errors.cvv}</p>}
                                    </div>
                                </div>
                            </div>

                            <button onClick={handlePlaceOrder} disabled={isProcessing}
                                className={`w-full py-6 font-black uppercase text-[10px] tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${isProcessing
                                    ? 'bg-zinc-500 text-white cursor-wait'
                                    : 'bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98]'
                                    }`}>
                                {isProcessing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        {locale === 'tr' ? 'Ä°ÅŸleniyor...' : 'Processing...'}
                                    </>
                                ) : (
                                    <>
                                        <Lock size={14} /> {locale === 'tr' ? `${total.toLocaleString('tr-TR')} TL Ã–de` : `Pay ${total.toLocaleString('tr-TR')} TL`}
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-6 text-[9px] font-bold uppercase tracking-widest text-zinc-400 pt-4">
                                <span className="flex items-center gap-1.5"><Lock size={10} /> SSL 256-bit</span>
                                <span>PCI DSS (Demo)</span>
                                <span>3D Secure (Demo)</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full lg:w-[380px] shrink-0">
                    <div className="lg:sticky top-24 bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                            {locale === 'tr' ? 'SipariÅŸ Ã–zeti' : 'Order Summary'}
                        </h3>
                        <div className="space-y-4 max-h-[40vh] overflow-y-auto no-scrollbar">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                                        <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="64px" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-bold truncate">{item.name}</h4>
                                        <p className="text-[10px] text-zinc-500 font-medium">{locale === 'tr' ? 'Adet' : 'Qty'}: {item.quantity}</p>
                                    </div>
                                    <span className="text-sm font-black shrink-0">{(item.price * item.quantity).toLocaleString('tr-TR')} â‚º</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                            <div className="flex justify-between text-xs font-medium text-zinc-500">
                                <span>{locale === 'tr' ? 'Ara Toplam' : 'Subtotal'}</span>
                                <span>{subtotal.toLocaleString('tr-TR')} â‚º</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-zinc-500">
                                <span>{locale === 'tr' ? 'Kargo' : 'Shipping'}</span>
                                <span className={shipping === 0 ? 'text-green-500 font-bold' : ''}>
                                    {shipping === 0 ? (locale === 'tr' ? 'Ãœcretsiz' : 'Free') : `${shipping.toLocaleString('tr-TR')} â‚º`}
                                </span>
                            </div>
                            <div className="flex justify-between text-base font-black pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                <span>{locale === 'tr' ? 'Toplam' : 'Total'}</span>
                                <span>{total.toLocaleString('tr-TR')} â‚º</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-zinc-400 pt-2">
                            <Lock size={10} />
                            {locale === 'tr' ? 'GÃ¼venli Ã¶deme altyapÄ±sÄ±' : 'Secure payment infrastructure'}
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}
