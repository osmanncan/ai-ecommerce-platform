import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tr } from '../i18n/tr';
import { en } from '../i18n/en';

type Translations = typeof tr;

interface LocalizationContextType {
    locale: 'tr' | 'en';
    setLocale: (locale: 'tr' | 'en') => void;
    t: Translations;
    toggleLocale: () => void;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocaleState] = useState<'tr' | 'en'>('tr');

    useEffect(() => {
        const loadLocale = async () => {
            const savedLocale = await AsyncStorage.getItem('aura_admin_locale');
            if (savedLocale === 'tr' || savedLocale === 'en') {
                setLocaleState(savedLocale);
            }
        };
        loadLocale();
    }, []);

    const setLocale = async (newLocale: 'tr' | 'en') => {
        setLocaleState(newLocale);
        await AsyncStorage.setItem('aura_admin_locale', newLocale);
    };

    const toggleLocale = () => {
        setLocale(locale === 'tr' ? 'en' : 'tr');
    };

    const t = locale === 'tr' ? tr : en;

    return (
        <LocalizationContext.Provider value={{ locale, setLocale, t, toggleLocale }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LocalizationProvider');
    }
    return context;
};
