import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Plus, Filter, MoreHorizontal, ArrowLeft, Globe } from 'lucide-react-native';
import { useTranslation } from '../../context/LocalizationContext';

const { width } = Dimensions.get('window');

export default function AdminProducts({ navigation }: any) {
    const { t, locale, toggleLocale } = useTranslation();
    const [searchFocused, setSearchFocused] = useState(false);
    const headerFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, []);

    const [products] = useState([
        { id: "#PROD-001", name: "Premium İpek Gömlek", price: "₺4.250", stock: 12, category: "Giyim", status: "active", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400" },
        { id: "#PROD-002", name: "Daha Kaşmir Palto", price: "₺12.400", stock: 3, category: "Dış Giyim", status: "lowStock", image: "https://images.unsplash.com/photo-1544022613-e87f75a720dc?auto=format&fit=crop&q=80&w=400" },
        { id: "#PROD-003", name: "Minimalist Deri Çanta", price: "₺8.900", stock: 0, category: "Aksesuar", status: "outOfStock", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400" },
    ]);

    const getStatusStyle = (status: any) => {
        switch (status) {
            case "active": return { bg: 'rgba(16,185,129,0.12)', text: '#34d399', dot: '#10b981', label: t.products.status.active };
            case "lowStock": return { bg: 'rgba(245,158,11,0.12)', text: '#fbbf24', dot: '#f59e0b', label: t.products.status.lowStock };
            case "outOfStock": return { bg: 'rgba(244,63,94,0.12)', text: '#fb7185', dot: '#f43f5e', label: t.products.status.outOfStock };
            default: return { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.4)', dot: 'rgba(255,255,255,0.3)', label: status };
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0f0c29', '#1a1145', '#302b63']} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 1 }} />
            <View style={[styles.bgOrb, { width: 200, height: 200, top: -50, left: -60, backgroundColor: 'rgba(139,92,246,0.07)' }]} />
            <View style={[styles.bgOrb, { width: 160, height: 160, bottom: 80, right: -40, backgroundColor: 'rgba(99,102,241,0.06)' }]} />

            <SafeAreaView style={styles.safeArea}>
                <Animated.View style={[styles.header, { opacity: headerFade }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <View style={styles.backCircle}>
                            <ArrowLeft color="#fff" size={20} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>{t.products.title}</Text>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.langToggle} onPress={toggleLocale} activeOpacity={0.7}>
                            <Globe size={14} color="#a78bfa" />
                            <Text style={styles.langText}>{locale === 'tr' ? 'TR' : 'EN'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
                            <LinearGradient colors={['#6366f1', '#7c3aed']} style={styles.addGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                <Plus color="#fff" size={20} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <View style={styles.searchBar}>
                    <View style={[styles.searchContainer, searchFocused && styles.searchContainerFocused]}>
                        <Search color={searchFocused ? '#a78bfa' : 'rgba(255,255,255,0.3)'} size={18} />
                        <TextInput
                            placeholder={t.products.searchPlaceholder}
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
                    <View style={styles.productList}>
                        {products.map((item, index) => {
                            const st = getStatusStyle(item.status);
                            return (
                                <ProductCard key={index} item={item} st={st} index={index} t={t} />
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

function ProductCard({ item, st, index, t }: any) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: index * 100, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 40, delay: index * 100, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.productCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.imageOverlay} />
            <View style={styles.productInfo}>
                <View style={styles.infoTop}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                        <MoreHorizontal color="rgba(255,255,255,0.4)" size={18} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>

                <View style={styles.infoBottom}>
                    <View style={[styles.statusBadge, { backgroundColor: st.bg }]}>
                        <View style={[styles.statusDot, { backgroundColor: st.dot }]} />
                        <Text style={[styles.statusText, { color: st.text }]}>{st.label}</Text>
                    </View>
                    <View style={styles.stockBadge}>
                        <Text style={styles.stockText}>{t.products.stock}: {item.stock}</Text>
                    </View>
                </View>
            </View>
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
    title: { fontSize: 13, fontWeight: '900', letterSpacing: 2, color: '#fff' },
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
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
    addButton: { borderRadius: 21, overflow: 'hidden', shadowColor: '#7c3aed', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 6 },
    addGradient: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
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
    searchContainerFocused: {
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
    productList: { paddingHorizontal: 24, gap: 16, paddingBottom: 40 },
    productCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
    },
    productImage: { width: 115, height: 130, backgroundColor: 'rgba(255,255,255,0.03)' },
    imageOverlay: { position: 'absolute', left: 0, top: 0, width: 115, height: 130, backgroundColor: 'rgba(15,12,41,0.15)' },
    productInfo: { flex: 1, padding: 16, justifyContent: 'space-between' },
    infoTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    categoryBadge: { backgroundColor: 'rgba(139,92,246,0.12)', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
    category: { fontSize: 9, fontWeight: '900', color: '#a78bfa', letterSpacing: 1 },
    moreButton: { padding: 4 },
    productName: { fontSize: 15, fontWeight: '900', color: '#fff', marginVertical: 4 },
    price: { fontSize: 14, fontWeight: '800', color: '#a78bfa' },
    infoBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, gap: 5 },
    statusDot: { width: 6, height: 6, borderRadius: 3 },
    statusText: { fontSize: 9, fontWeight: '900' },
    stockBadge: { backgroundColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    stockText: { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.4)' },
});
