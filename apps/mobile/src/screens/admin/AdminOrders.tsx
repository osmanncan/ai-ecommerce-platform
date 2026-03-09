import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, ArrowLeft, ShoppingBag, ChevronRight, Globe } from 'lucide-react-native';
import { useTranslation } from '../../context/LocalizationContext';

const { width } = Dimensions.get('window');

export default function AdminOrders({ navigation }: any) {
    const { t, locale, toggleLocale } = useTranslation();
    const [searchFocused, setSearchFocused] = useState(false);
    const headerFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, []);

    const [orders] = useState([
        { id: "#AURA-8F2D", customer: "Berke Yılmaz", email: "berke@example.com", date: "10 Mart, 14:20", amount: "₺4.250", items: 2, status: "preparing" },
        { id: "#AURA-9A1C", customer: "Aslı Çelik", email: "asli@example.com", date: "10 Mart, 12:45", amount: "₺1.890", items: 1, status: "paid" },
        { id: "#AURA-7B4E", customer: "Kaan Aras", email: "kaan@example.com", date: "09 Mart, 18:30", amount: "₺12.400", items: 3, status: "shipped" },
        { id: "#AURA-6D1F", customer: "Zeynep Demir", email: "zeynep@example.com", date: "09 Mart, 11:15", amount: "₺8.900", items: 1, status: "completed" },
    ]);

    const getStatusStyle = (status: any) => {
        switch (status) {
            case "preparing": return { bg: 'rgba(245,158,11,0.12)', text: '#fbbf24', dot: '#f59e0b', label: t.orders.status.preparing };
            case "paid": return { bg: 'rgba(16,185,129,0.12)', text: '#34d399', dot: '#10b981', label: t.orders.status.paid };
            case "shipped": return { bg: 'rgba(99,102,241,0.12)', text: '#818cf8', dot: '#6366f1', label: t.orders.status.shipped };
            case "completed": return { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.45)', dot: 'rgba(255,255,255,0.3)', label: t.orders.status.completed };
            default: return { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.4)', dot: 'rgba(255,255,255,0.3)', label: status };
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0f0c29', '#1a1145', '#302b63']} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 1 }} />
            <View style={[styles.bgOrb, { width: 200, height: 200, top: -50, right: -60, backgroundColor: 'rgba(99,102,241,0.07)' }]} />
            <View style={[styles.bgOrb, { width: 140, height: 140, bottom: 100, left: -40, backgroundColor: 'rgba(139,92,246,0.05)' }]} />

            <SafeAreaView style={styles.safeArea}>
                <Animated.View style={[styles.header, { opacity: headerFade }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <View style={styles.backCircle}>
                            <ArrowLeft color="#fff" size={20} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>{t.orders.title}</Text>
                    <TouchableOpacity style={styles.langToggle} onPress={toggleLocale} activeOpacity={0.7}>
                        <Globe size={14} color="#a78bfa" />
                        <Text style={styles.langText}>{locale === 'tr' ? 'TR' : 'EN'}</Text>
                    </TouchableOpacity>
                </Animated.View>

                <View style={styles.searchBar}>
                    <View style={[styles.searchContainer, searchFocused && styles.searchFocused]}>
                        <Search color={searchFocused ? '#a78bfa' : 'rgba(255,255,255,0.3)'} size={18} />
                        <TextInput
                            placeholder={t.orders.searchPlaceholder}
                            placeholderTextColor="rgba(255,255,255,0.25)"
                            style={styles.searchInput}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Filter color="#a78bfa" size={18} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.orderList}>
                        {orders.map((order, index) => {
                            const st = getStatusStyle(order.status);
                            return (
                                <OrderCard key={index} order={order} st={st} index={index} t={t} />
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

function OrderCard({ order, st, index, t }: any) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: index * 80, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 40, delay: index * 80, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.orderCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity activeOpacity={0.8}>
                <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: st.bg }]}>
                        <View style={[styles.statusDot, { backgroundColor: st.dot }]} />
                        <Text style={[styles.statusText, { color: st.text }]}>{st.label.toUpperCase()}</Text>
                    </View>
                </View>

                <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{order.customer}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                </View>

                <View style={styles.orderFooter}>
                    <View style={styles.itemsBadge}>
                        <ShoppingBag size={12} color="#a78bfa" />
                        <Text style={styles.itemsText}>{order.items} {t.orders.itemsCount}</Text>
                    </View>
                    <Text style={styles.orderAmount}>{order.amount}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f0c29' },
    safeArea: { flex: 1 },
    bgOrb: { position: 'absolute', borderRadius: 999 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backButton: { padding: 4 },
    backCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontSize: 13, fontWeight: '900', letterSpacing: 2.5, color: '#fff' },
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
    searchBar: { flexDirection: 'row', paddingHorizontal: 24, paddingBottom: 16, gap: 12 },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.06)',
        gap: 10,
    },
    searchFocused: {
        borderColor: 'rgba(99,102,241,0.4)',
        backgroundColor: 'rgba(99,102,241,0.08)',
    },
    searchInput: { flex: 1, height: 50, fontWeight: '600', color: '#fff', fontSize: 13 },
    filterButton: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: 'rgba(139,92,246,0.1)',
        borderColor: 'rgba(139,92,246,0.2)',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: { flex: 1 },
    orderList: { paddingHorizontal: 24, gap: 14, paddingBottom: 40 },
    orderCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 22,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
    orderId: { fontSize: 14, fontWeight: '900', color: '#fff' },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, gap: 6 },
    statusDot: { width: 6, height: 6, borderRadius: 3 },
    statusText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
    customerInfo: { marginBottom: 18 },
    customerName: { fontSize: 16, fontWeight: '800', color: '#fff', marginBottom: 4 },
    orderDate: { fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: '500' },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
    itemsBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(139,92,246,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
    itemsText: { fontSize: 10, fontWeight: '800', color: '#a78bfa', letterSpacing: 0.5 },
    orderAmount: { fontSize: 18, fontWeight: '900', color: '#fff' },
});
