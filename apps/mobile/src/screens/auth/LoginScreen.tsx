import React, { useState, useEffect, useRef } from 'react';
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
    Animated,
    ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, ArrowRight, Globe, Sparkles, Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LocalizationContext';

const { width, height } = Dimensions.get('window');

function FloatingOrb({ delay, size, left, top, color }: { delay: number; size: number; left: number; top: number; color: string }) {
    const anim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(anim, { toValue: 1, duration: 3000 + delay, useNativeDriver: true }),
                Animated.timing(anim, { toValue: 0, duration: 3000 + delay, useNativeDriver: true }),
            ])
        );
        setTimeout(() => loop.start(), delay);
        return () => loop.stop();
    }, []);

    const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] });
    const scale = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.2, 1] });
    const opacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.15, 0.35, 0.15] });

    return (
        <Animated.View
            style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: color,
                left,
                top,
                transform: [{ translateY }, { scale }],
                opacity,
            }}
        />
    );
}

export default function LoginScreen({ navigation }: any) {
    const { t, locale, toggleLocale } = useTranslation();
    const { signIn, enableDemoAccess, isAdmin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const logoScale = useRef(new Animated.Value(0.5)).current;
    const logoRotate = useRef(new Animated.Value(0)).current;
    const formSlide = useRef(new Animated.Value(60)).current;
    const formFade = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(logoScale, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
            Animated.timing(logoRotate, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 600, delay: 200, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 40, delay: 200, useNativeDriver: true }),
            Animated.timing(formFade, { toValue: 1, duration: 600, delay: 500, useNativeDriver: true }),
            Animated.spring(formSlide, { toValue: 0, friction: 8, tension: 40, delay: 500, useNativeDriver: true }),
        ]).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.08, duration: 2000, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    useEffect(() => {
        if (isAdmin) {
            navigation.replace('AdminDashboard');
        }
    }, [isAdmin, navigation]);

    const logoSpin = logoRotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert(t.auth.error, t.auth.errorFill);
            return;
        }

        setLoading(true);
        try {
            const { error } = await signIn(email, password);

            if (error) {
                Alert.alert(t.auth.loginFailed, error === 'Admin access is required.' ? t.auth.adminAccessRequired : error);
            }
        } catch (err) {
            Alert.alert(t.auth.error, t.auth.genericError);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickAccess = () => {
        enableDemoAccess();
        navigation.replace('AdminDashboard');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={['#0f0c29', '#1a1145', '#302b63', '#24243e']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <FloatingOrb delay={0} size={220} left={-60} top={-40} color="#6366f1" />
            <FloatingOrb delay={800} size={160} left={width - 80} top={height * 0.15} color="#8b5cf6" />
            <FloatingOrb delay={400} size={120} left={width * 0.3} top={height * 0.7} color="#a78bfa" />
            <FloatingOrb delay={1200} size={90} left={-20} top={height * 0.55} color="#c084fc" />
            <FloatingOrb delay={600} size={140} left={width * 0.6} top={height * 0.85} color="#7c3aed" />

            <TouchableOpacity
                style={styles.langToggle}
                onPress={toggleLocale}
                activeOpacity={0.7}
            >
                <Globe size={15} color="#a78bfa" />
                <Text style={styles.langToggleText}>{locale === 'tr' ? 'TR' : 'EN'}</Text>
            </TouchableOpacity>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        {/* Brand Section */}
                        <Animated.View style={[styles.brandSection, {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        }]}>
                            <Animated.View style={[styles.logoContainer, {
                                transform: [{ scale: logoScale }, { rotate: logoSpin }],
                            }]}>
                                <LinearGradient
                                    colors={['#7c3aed', '#6366f1', '#8b5cf6']}
                                    style={styles.logoGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Sparkles size={30} color="#fff" />
                                </LinearGradient>
                            </Animated.View>

                            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                                <View style={styles.glowRing} />
                            </Animated.View>

                            <Text style={styles.brandName}>{t.auth.brandName}</Text>
                            <View style={styles.tagContainer}>
                                <LinearGradient
                                    colors={['rgba(99,102,241,0.2)', 'rgba(139,92,246,0.2)']}
                                    style={styles.tagGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={styles.brandTag}>{t.auth.brandTag}</Text>
                                </LinearGradient>
                            </View>
                            <Text style={styles.brandDesc}>{t.auth.brandDesc}</Text>
                        </Animated.View>

                        {/* Form Section */}
                        <Animated.View style={[styles.formSection, {
                            opacity: formFade,
                            transform: [{ translateY: formSlide }],
                        }]}>
                            <View style={styles.formCard}>
                                <View style={[
                                    styles.inputContainer,
                                    emailFocused && styles.inputContainerFocused
                                ]}>
                                    <View style={[styles.inputIcon, emailFocused && styles.inputIconFocused]}>
                                        <Mail size={18} color={emailFocused ? '#a78bfa' : '#6366f1'} />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={t.auth.emailPlaceholder}
                                        placeholderTextColor="rgba(255,255,255,0.25)"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={() => setEmailFocused(false)}
                                    />
                                </View>

                                <View style={[
                                    styles.inputContainer,
                                    passwordFocused && styles.inputContainerFocused
                                ]}>
                                    <View style={[styles.inputIcon, passwordFocused && styles.inputIconFocused]}>
                                        <Lock size={18} color={passwordFocused ? '#a78bfa' : '#6366f1'} />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={t.auth.passwordPlaceholder}
                                        placeholderTextColor="rgba(255,255,255,0.25)"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        onFocus={() => setPasswordFocused(true)}
                                        onBlur={() => setPasswordFocused(false)}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeButton}
                                        onPress={() => setShowPassword(!showPassword)}
                                        activeOpacity={0.7}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} color="rgba(255,255,255,0.4)" />
                                        ) : (
                                            <Eye size={18} color="rgba(255,255,255,0.4)" />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                                    onPress={handleLogin}
                                    disabled={loading}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={loading ? ['#4b4b8a', '#4b4b8a'] : ['#6366f1', '#7c3aed', '#8b5cf6']}
                                        style={styles.loginButtonGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                    >
                                        {loading ? (
                                            <ActivityIndicator color="#fff" size="small" />
                                        ) : (
                                            <>
                                                <Text style={styles.loginButtonText}>{t.auth.loginButton}</Text>
                                                <View style={styles.arrowCircle}>
                                                    <ArrowRight size={16} color="#fff" />
                                                </View>
                                            </>
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>

                                {__DEV__ && (
                                    <TouchableOpacity
                                        style={styles.quickAccessLink}
                                        onPress={handleQuickAccess}
                                        activeOpacity={0.75}
                                    >
                                        <Text style={styles.quickAccessLinkText}>{t.auth.quickAccess}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </Animated.View>

                        {/* Footer */}
                        <Animated.View style={[styles.footer, { opacity: formFade }]}>
                            <Text style={styles.footerText}>{t.auth.footerText}</Text>
                        </Animated.View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0c29',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    langToggle: {
        position: 'absolute',
        top: 56,
        left: 24,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(139,92,246,0.12)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(139,92,246,0.25)',
    },
    langToggleText: {
        color: '#a78bfa',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        paddingVertical: 60,
    },
    brandSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        marginBottom: 8,
        zIndex: 2,
    },
    logoGradient: {
        width: 72,
        height: 72,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#7c3aed',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.5,
        shadowRadius: 24,
        elevation: 12,
    },
    glowRing: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'rgba(139,92,246,0.15)',
        top: -56,
        alignSelf: 'center',
    },
    brandName: {
        fontSize: 38,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 10,
        marginBottom: 12,
        marginTop: 16,
        textShadowColor: 'rgba(99,102,241,0.4)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 12,
    },
    tagContainer: {
        marginBottom: 16,
    },
    tagGradient: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(99,102,241,0.2)',
    },
    brandTag: {
        fontSize: 11,
        fontWeight: '800',
        color: '#a78bfa',
        letterSpacing: 4,
        textAlign: 'center',
    },
    brandDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.45)',
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: '500',
        paddingHorizontal: 12,
    },
    formSection: {
        marginBottom: 28,
    },
    formCard: {
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
        gap: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.06)',
        height: 58,
        paddingHorizontal: 4,
    },
    inputContainerFocused: {
        borderColor: 'rgba(99,102,241,0.5)',
        backgroundColor: 'rgba(99,102,241,0.08)',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
    },
    inputIcon: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    inputIconFocused: {
        backgroundColor: 'rgba(99,102,241,0.12)',
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        paddingRight: 12,
    },
    eyeButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButton: {
        marginTop: 6,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#7c3aed',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 8,
    },
    loginButtonDisabled: {
        shadowOpacity: 0.1,
    },
    loginButtonGradient: {
        height: 58,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 3,
    },
    arrowCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickAccessLink: {
        marginTop: 6,
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: 'rgba(139,92,246,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(139,92,246,0.18)',
    },
    quickAccessLinkText: {
        color: '#c4b5fd',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.6,
    },
    footer: {
        alignItems: 'center',
        marginTop: 32,
    },
    footerText: {
        color: 'rgba(255,255,255,0.15)',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 1,
    },
});
