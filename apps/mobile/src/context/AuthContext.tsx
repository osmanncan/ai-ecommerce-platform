import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type UserRole = 'admin' | 'customer';

interface AuthProfile {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
}

interface SignInResult {
    error?: string;
}

interface AuthContextType {
    session: Session | null;
    profile: AuthProfile | null;
    isAdmin: boolean;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<SignInResult>;
    enableDemoAccess: () => void;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchProfile(userId: string, email: string): Promise<AuthProfile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', userId)
        .single();

    if (error || !data) {
        return null;
    }

    return {
        id: data.id,
        email,
        fullName: data.full_name || email.split('@')[0] || 'Aura Admin',
        role: data.role || 'customer',
    };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<AuthProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasDemoAccess, setHasDemoAccess] = useState(false);

    useEffect(() => {
        const syncSession = async (nextSession: Session | null) => {
            if (!nextSession?.user) {
                setSession(null);
                setProfile(null);
                setIsLoading(false);
                return;
            }

            const nextProfile = await fetchProfile(nextSession.user.id, nextSession.user.email || '');

            if (!nextProfile || nextProfile.role !== 'admin') {
                await supabase.auth.signOut();
                setSession(null);
                setProfile(null);
                setIsLoading(false);
                return;
            }

            setSession(nextSession);
            setProfile(nextProfile);
            setIsLoading(false);
        };

        const bootstrap = async () => {
            const { data } = await supabase.auth.getSession();
            await syncSession(data.session);
        };

        bootstrap();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            void syncSession(nextSession);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string): Promise<SignInResult> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });

        if (error) {
            return { error: error.message };
        }

        const signedInUser = data.session?.user;
        if (!signedInUser) {
            await supabase.auth.signOut();
            return { error: 'Session could not be established.' };
        }

        const nextProfile = await fetchProfile(signedInUser.id, signedInUser.email || email.trim());
        if (!nextProfile || nextProfile.role !== 'admin') {
            await supabase.auth.signOut();
            return { error: 'Admin access is required.' };
        }

        setSession(data.session);
        setProfile(nextProfile);
        return {};
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setProfile(null);
        setHasDemoAccess(false);
    };

    const enableDemoAccess = () => {
        if (__DEV__) {
            setHasDemoAccess(true);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                profile,
                isAdmin: profile?.role === 'admin' || (__DEV__ && hasDemoAccess),
                isLoading,
                signIn,
                enableDemoAccess,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}