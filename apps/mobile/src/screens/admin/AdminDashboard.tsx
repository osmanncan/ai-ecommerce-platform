import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
    ShoppingBag,
    Users,
    DollarSign,
    TrendingUp,
    LogOut,
    Package,
    ClipboardList,
    ChevronRight,
    Sparkles,
} from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { useTranslation } from '../../context/LocalizationContext';
import { Globe } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_W = (width - 48 - 14) / 2;

const iconColors: Record<string, { colors: [string, string]; icon: string }> = {
    DollarSign: { colors: ['#6366f1', '#818cf8'], icon: '#fff' },
    ShoppingBag: { colors: ['#f59e0b', '#fbbf24'], icon: '#fff' },
    Users: { colors: ['#10b981', '#34d399'], icon: '#fff' },
    TrendingUp: { colors: ['#f43f5e', '#fb7185'], icon: '#fff' },
};

const StatCard = ({ label, value, trend, isPositive, icon: Icon, iconKey, index }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay: index * 100, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 40, delay: index * 100, useNativeDriver: true }),
        ]).start();
    }, []);

    const c = iconColors[iconKey] || { colors: ['#6366f1', '#818cf8'], icon: '#fff' };

    return (
        <Animated.View style={[styles.statCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.statHeader}>
                <LinearGradient colors={c.colors} style={styles.iconGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Icon size={18} color={c.icon} />
                </LinearGradient>
                <View style={[styles.trendBadge, { backgroundColor: isPositive ? 'rgba(16,185,129,0.12)' : 'rgba(244,63,94,0.12)' }]}>
                    <Text style={[styles.trendText, { color: isPositive ? '#10b981' : '#f43f5e' }]}>{trend}</Text>
                </View>
            </View>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </Animated.View>
    );
};

const orderStatusColors: Record<string, { bg: string; text: string }> = {
    'ready': { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b' },
    'paid': { bg: 'rgba(16,185,129,0.12)', text: '#10b981' },
    'shipping': { bg: 'rgba(99,102,241,0.12)', text: '#6366f1' },
};

export default function AdminDashboard({ navigation }: any) {
    const { t, locale, toggleLocale } = useTranslation();

    const headerFade = useRef(new Animated.Value(0)).current;
    const headerSlide = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerFade, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.spring(headerSlide, { toValue: 0, friction: 8, useNativeDriver: true }),
        ]).start();
    }, []);

    const handleLogout = async () => {
        Alert.alert(
            t.dashboard.logoutTitle,
            t.dashboard.logoutConfirm,
            [
                { text: t.dashboard.cancel, style: 'cancel' },
                {
                    text: t.dashboard.logoutTitle,
                    style: 'destructive',
                    onPress: async () => {
                        await supabase.auth.signOut();
                        navigation.replace('Login');
                    },
                },
            ]
        );
    };

    const stats = [
        { label: t.dashboard.stats.totalSales, value: "₺142.950", trend: "+12.5%", isPositive: true, icon: DollarSign, iconKey: 'DollarSign' },
        { label: t.dashboard.stats.orderCount, value: "324", trend: "+8.2%", isPositive: true, icon: ShoppingBag, iconKey: 'ShoppingBag' },
        { label: t.dashboard.stats.newCustomers, value: "48", trend: "+14.6%", isPositive: true, icon: Users, iconKey: 'Users' },
        { label: t.dashboard.stats.returnRate, value: "%1.2", trend: "-2.4%", isPositive: false, icon: TrendingUp, iconKey: 'TrendingUp' },
    ];

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0f0c29', '#1a1145', '#302b63']} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 1 }} />

            {/* Background orbs */}
            <View style={[styles.bgOrb, { width: 250, height: 250, top: -60, right: -80, backgroundColor: 'rgba(99,102,241,0.08)' }]} />
            <View style={[styles.bgOrb, { width: 180, height: 180, bottom: 120, left: -50, backgroundColor: 'rgba(139,92,246,0.06)' }]} />

            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                        {/* Header */}
                        <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
                            <View>
                                <View style={styles.titleRow}>
                                    <Sparkles size={20} color="#a78bfa" />
                                    <Text style={styles.title}>{t.dashboard.title}</Text>
                                </View>
                                <Text style={styles.subtitle}>{t.dashboard.subtitle}</Text>
                            </View>
                            <View style={styles.headerActions}>
                                <TouchableOpacity style={styles.langToggle} onPress={toggleLocale} activeOpacity={0.7}>
                                    <Globe size={14} color="#a78bfa" />
                                    <Text style={styles.langText}>{locale === 'tr' ? 'TR' : 'EN'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                    <LogOut size={18} color="#f43f5e" />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>

                        {/* Stats Grid */}
                        <View style={styles.statsGrid}>
                            {stats.map((stat, index) => (
                                <StatCard key={index} index={index} {...stat} />
                            ))}
                        </View>

                        {/* Recent Orders */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{t.dashboard.recentOrders}</Text>
                            <TouchableOpacity style={styles.seeAllBtn}>
                                <Text style={styles.seeAll}>{t.dashboard.seeAll}</Text>
                                <ChevronRight size={14} color="#a78bfa" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.orderCard}>
                            {[
                                { id: '#AURA-8F2D', customer: 'Ahmet Yılmaz', amount: '₺4.250', statusKey: 'ready' },
                                { id: '#AURA-9A1C', customer: 'Ayşe Kaya', amount: '₺1.890', statusKey: 'paid' },
                                { id: '#AURA-7B4E', customer: 'Mehmet Demir', amount: '₺12.400', statusKey: 'shipping' }
                            ].map((order, i) => {
                                const sc = orderStatusColors[order.statusKey] || { bg: 'rgba(255,255,255,0.08)', text: '#999' };
                                const statusLabel = t.dashboard.orderStatus[order.statusKey as keyof typeof t.dashboard.orderStatus];
                                return (
                                    <View key={i} style={[styles.orderItem, i === 0 && { borderTopWidth: 0 }]}>
                                        <View>
                                            <Text style={styles.orderId}>{order.id}</Text>
                                            <Text style={styles.orderCustomer}>{order.customer}</Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.orderAmount}>{order.amount}</Text>
                                            <View style={[styles.orderBadge, { backgroundColor: sc.bg }]}>
                                                <Text style={[styles.orderBadgeText, { color: sc.text }]}>{statusLabel}</Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>

                        {/* Quick Actions */}
                        <View style={styles.quickActions}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => navigation.navigate('AdminProducts')}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#6366f1', '#7c3aed']}
                                    style={styles.actionGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Package size={20} color="#fff" />
                                    <Text style={styles.actionButtonText}>{t.dashboard.productManagement}</Text>
                                    <ChevronRight size={18} color="rgba(255,255,255,0.5)" />
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => navigation.navigate('AdminOrders')}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#7c3aed', '#a855f7']}
                                    style={styles.actionGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <ClipboardList size={20} color="#fff" />
                                    <Text style={styles.actionButtonText}>{t.dashboard.orderManagement}</Text>
                                    <ChevronRight size={18} color="rgba(255,255,255,0.5)" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f0c29' },
    safeArea: { flex: 1 },
    scrollView: { flex: 1 },
    content: { padding: 24, paddingBottom: 100 },
    bgOrb: { position: 'absolute', borderRadius: 999 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    title: { fontSize: 28, fontWeight: '900', letterSpacing: 2, color: '#fff' },
    subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 6, fontWeight: '600' },
    headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    langToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(139,92,246,0.12)',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(139,92,246,0.25)',
    },
    langText: { color: '#a78bfa', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
    logoutButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: 'rgba(244,63,94,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(244,63,94,0.2)',
    },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginBottom: 32 },
    statCard: {
        width: CARD_W,
        backgroundColor: 'rgba(255,255,255,0.06)',
        padding: 18,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
    iconGradient: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    trendBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
    trendText: { fontSize: 10, fontWeight: '800' },
    statLabel: { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.35)', marginBottom: 6, letterSpacing: 1.2 },
    statValue: { fontSize: 22, fontWeight: '900', color: '#fff' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 13, fontWeight: '900', letterSpacing: 2, color: 'rgba(255,255,255,0.7)' },
    seeAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    seeAll: { fontSize: 12, fontWeight: '800', color: '#a78bfa' },
    orderCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        padding: 6,
        marginBottom: 8,
    },
    orderItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
    orderId: { fontSize: 13, fontWeight: '900', color: '#fff', marginBottom: 4 },
    orderCustomer: { fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: '500' },
    orderAmount: { fontSize: 15, fontWeight: '900', color: '#fff', marginBottom: 6 },
    orderBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    orderBadgeText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
    quickActions: { marginTop: 20, gap: 14 },
    actionButton: { borderRadius: 18, overflow: 'hidden', shadowColor: '#7c3aed', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6 },
    actionGradient: { height: 60, borderRadius: 18, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22, gap: 14 },
    actionButtonText: { flex: 1, color: '#fff', fontWeight: '900', fontSize: 13, letterSpacing: 1.5 },
});
