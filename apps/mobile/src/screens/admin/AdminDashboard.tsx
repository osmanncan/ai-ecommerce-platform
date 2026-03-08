import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    DollarSign,
    TrendingUp,
    LogOut
} from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { useTranslation } from '../../context/LocalizationContext';

const { width } = Dimensions.get('window');

const StatCard = ({ label, value, trend, isPositive, icon: Icon }: any) => (
    <View style={styles.statCard}>
        <View style={styles.statHeader}>
            <View style={styles.iconContainer}>
                <Icon size={20} color="#000" />
            </View>
            <View style={[styles.trendBadge, { backgroundColor: isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)' }]}>
                <Text style={[styles.trendText, { color: isPositive ? '#22c55e' : '#ef4444' }]}>{trend}</Text>
            </View>
        </View>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
    </View>
);

export default function AdminDashboard({ navigation }: any) {
    const { t } = useTranslation();

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
        { label: t.dashboard.stats.totalSales, value: "₺142.950", trend: "+12.5%", isPositive: true, icon: DollarSign },
        { label: t.dashboard.stats.orderCount, value: "324", trend: "+8.2%", isPositive: true, icon: ShoppingBag },
        { label: t.dashboard.stats.newCustomers, value: "48", trend: "+14.6%", isPositive: true, icon: Users },
        { label: t.dashboard.stats.returnRate, value: "%1.2", trend: "-2.4%", isPositive: false, icon: TrendingUp },
    ];

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#f8f9fa', '#ffffff']} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.title}>{t.dashboard.title}</Text>
                                <Text style={styles.subtitle}>{t.dashboard.subtitle}</Text>
                            </View>
                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <LogOut size={20} color="#ef4444" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.statsGrid}>
                            {stats.map((stat, index) => (
                                <StatCard key={index} {...stat} />
                            ))}
                        </View>

                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{t.dashboard.recentOrders}</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>{t.dashboard.seeAll}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.orderCard}>
                            {[
                                { id: '#AURA-8F2D', customer: 'Ahmet Yılmaz', amount: '₺4.250', status: 'HAZIR' },
                                { id: '#AURA-9A1C', customer: 'Ayşe Kaya', amount: '₺1.890', status: 'ÖDENDİ' },
                                { id: '#AURA-7B4E', customer: 'Mehmet Demir', amount: '₺12.400', status: 'KARGO' }
                            ].map((order, i) => (
                                <View key={i} style={[styles.orderItem, i === 0 && { borderTopWidth: 0 }]}>
                                    <View>
                                        <Text style={styles.orderId}>{order.id}</Text>
                                        <Text style={styles.orderCustomer}>{order.customer}</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={styles.orderAmount}>{order.amount}</Text>
                                        <View style={styles.orderBadge}>
                                            <Text style={styles.orderBadgeText}>{order.status}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.quickActions}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => navigation.navigate('AdminProducts')}
                            >
                                <Text style={styles.actionButtonText}>{t.dashboard.productManagement}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => navigation.navigate('AdminOrders')}
                            >
                                <Text style={styles.actionButtonText}>{t.dashboard.orderManagement}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    safeArea: { flex: 1 },
    scrollView: { flex: 1 },
    content: { padding: 24, paddingBottom: 100 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32
    },
    title: { fontSize: 28, fontWeight: '900', letterSpacing: -1, color: '#000' },
    subtitle: { fontSize: 13, color: '#999', marginTop: 4, fontWeight: '600' },
    logoutButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(239,68,68,0.08)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(239,68,68,0.15)' },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 32 },
    statCard: {
        width: (width - 48 - 16) / 2,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2
    },
    statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    iconContainer: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
    trendBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    trendText: { fontSize: 10, fontWeight: 'bold' },
    statLabel: { fontSize: 10, fontWeight: '900', color: '#bbb', marginBottom: 4, letterSpacing: 1 },
    statValue: { fontSize: 20, fontWeight: '900', color: '#000' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 14, fontWeight: '900', letterSpacing: 1.5, color: '#000' },
    seeAll: { fontSize: 11, fontWeight: '900', color: '#999' },
    orderCard: { backgroundColor: '#fff', borderRadius: 24, borderWidth: 1, borderColor: '#eee', padding: 8 },
    orderItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderTopWidth: 1, borderTopColor: '#f1f1f1' },
    orderId: { fontSize: 13, fontWeight: '900', color: '#000', marginBottom: 2 },
    orderCustomer: { fontSize: 13, color: '#666', fontWeight: '500' },
    orderAmount: { fontSize: 14, fontWeight: '900', color: '#000', marginBottom: 4 },
    orderBadge: { backgroundColor: '#f0f0f0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    orderBadgeText: { fontSize: 9, fontWeight: '900', color: '#666' },
    quickActions: { marginTop: 24, gap: 12 },
    actionButton: { height: 56, backgroundColor: '#000', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    actionButtonText: { color: '#fff', fontWeight: '900', fontSize: 13, letterSpacing: 1 }
});
