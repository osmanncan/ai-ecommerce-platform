import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Mail, Lock, ArrowRight, Zap, Globe } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { useTranslation } from '../../context/LocalizationContext';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
    const { t, locale, toggleLocale } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert(t.auth.error, t.auth.errorFill);
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });

            if (error) {
                Alert.alert(t.auth.loginFailed, error.message);
            } else {
                navigation.replace('AdminDashboard');
            }
        } catch (err) {
            Alert.alert(t.auth.error, t.auth.genericError);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickAccess = () => {
        navigation.replace('AdminDashboard');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={['#0a0a0a', '#111827', '#1e1b4b']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />

            <TouchableOpacity
                style={styles.langToggle}
                onPress={toggleLocale}
                activeOpacity={0.7}
            >
                <Globe size={16} color="rgba(255,255,255,0.6)" />
                <Text style={styles.langToggleText}>{locale.toUpperCase()}</Text>
            </TouchableOpacity>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <View style={styles.brandSection}>
                        <View style={styles.logoContainer}>
                            <LinearGradient
                                colors={['#6366f1', '#8b5cf6']}
                                style={styles.logoGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Shield size={28} color="#fff" />
                            </LinearGradient>
                        </View>
                        <Text style={styles.brandName}>{t.auth.brandName}</Text>
                        <Text style={styles.brandTag}>{t.auth.brandTag}</Text>
                        <Text style={styles.brandDesc}>
                            {t.auth.brandDesc}
                        </Text>
                    </View>
                    <View style={styles.formSection}>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputIcon}>
                                <Mail size={18} color="#6366f1" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder={t.auth.emailPlaceholder}
                                placeholderTextColor="#555"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputIcon}>
                                <Lock size={18} color="#6366f1" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder={t.auth.passwordPlaceholder}
                                placeholderTextColor="#555"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#6366f1', '#7c3aed']}
                                style={styles.loginButtonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <>
                                        <Text style={styles.loginButtonText}>{t.auth.loginButton}</Text>
                                        <ArrowRight size={20} color="#fff" />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.quickSection}>
                        <View style={styles.dividerRow}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>{t.auth.or}</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.quickButton}
                            onPress={handleQuickAccess}
                            activeOpacity={0.7}
                        >
                            <Zap size={18} color="#f59e0b" />
                            <Text style={styles.quickButtonText}>{t.auth.quickAccess}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    keyboardView: {
        flex: 1,
    },
    decorCircle1: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(99, 102, 241, 0.08)',
        top: -80,
        right: -80,
    },
    decorCircle2: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(139, 92, 246, 0.06)',
        bottom: 100,
        left: -60,
    },
    langToggle: {
        position: 'absolute',
        top: 60,
        left: 28,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    langToggleText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 28,
        justifyContent: 'center',
    },

    brandSection: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoContainer: {
        marginBottom: 20,
    },
    logoGradient: {
        width: 64,
        height: 64,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
    },
    brandName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 6,
        marginBottom: 8,
    },
    brandTag: {
        fontSize: 11,
        fontWeight: '800',
        color: '#6366f1',
        letterSpacing: 4,
        marginBottom: 16,
    },
    brandDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.4)',
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: '500',
    },

    formSection: {
        gap: 14,
        marginBottom: 32,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        height: 58,
        paddingHorizontal: 4,
    },
    inputIcon: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        paddingRight: 16,
    },
    loginButton: {
        marginTop: 8,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 6,
    },
    loginButtonGradient: {
        height: 58,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 2,
    },

    quickSection: {
        alignItems: 'center',
        gap: 20,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        width: '100%',
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    dividerText: {
        color: 'rgba(255,255,255,0.25)',
        fontSize: 12,
        fontWeight: '600',
    },
    quickButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(245, 158, 11, 0.08)',
        borderWidth: 1,
        borderColor: 'rgba(245, 158, 11, 0.15)',
    },
    quickButtonText: {
        color: '#f59e0b',
        fontSize: 14,
        fontWeight: '700',
    },
});
