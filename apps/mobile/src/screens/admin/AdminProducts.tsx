import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, Plus, Filter, MoreHorizontal, ArrowLeft } from 'lucide-react-native';
import { useTranslation } from '../../context/LocalizationContext';

export default function AdminProducts({ navigation }: any) {
    const { t } = useTranslation();
    const [products] = useState([
        { id: "#PROD-001", name: "Premium İpek Gömlek", price: "₺4.250", stock: 12, category: "Giyim", status: "active", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200" },
        { id: "#PROD-002", name: "Daha Kaşmir Palto", price: "₺12.400", stock: 3, category: "Dış Giyim", status: "lowStock", image: "https://images.unsplash.com/photo-1544022613-e87f75a720dc?w=200" },
        { id: "#PROD-003", name: "Minimalist Deri Çanta", price: "₺8.900", stock: 0, category: "Aksesuar", status: "outOfStock", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200" },
    ]);

    const getStatusStyle = (status: any) => {
        switch (status) {
            case "active": return { bg: '#f1fde7', text: '#3c7e0b', dot: '#4caf50', label: t.products.status.active };
            case "lowStock": return { bg: '#fff4e5', text: '#b36d0a', dot: '#ff9800', label: t.products.status.lowStock };
            case "outOfStock": return { bg: '#ffebee', text: '#c62828', dot: '#f44336', label: t.products.status.outOfStock };
            default: return { bg: '#f5f5f5', text: '#666', dot: '#999', label: status };
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowLeft color="#000" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t.products.title}</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Plus color="#fff" size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBar}>
                    <Search color="#999" size={20} style={styles.searchIcon} />
                    <TextInput
                        placeholder={t.products.searchPlaceholder}
                        style={styles.searchInput}
                    />
                    <TouchableOpacity style={styles.filterButton}>
                        <Filter color="#000" size={20} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.productList}>
                        {products.map((item, index) => {
                            const styles_status = getStatusStyle(item.status);
                            return (
                                <View key={index} style={styles.productCard}>
                                    <Image source={{ uri: item.image }} style={styles.productImage} />
                                    <View style={styles.productInfo}>
                                        <View style={styles.infoTop}>
                                            <Text style={styles.category}>{item.category.toUpperCase()}</Text>
                                            <TouchableOpacity>
                                                <MoreHorizontal color="#bbb" size={20} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.productName}>{item.name}</Text>
                                        <Text style={styles.price}>{item.price}</Text>

                                        <View style={styles.infoBottom}>
                                            <View style={[styles.statusBadge, { backgroundColor: styles_status.bg }]}>
                                                <View style={[styles.statusDot, { backgroundColor: styles_status.dot }]} />
                                                <Text style={[styles.statusText, { color: styles_status.text }]}>{styles_status.label}</Text>
                                            </View>
                                            <Text style={styles.stockText}>{t.products.stock}: {item.stock}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    backButton: { padding: 8, marginLeft: -8 },
    title: { fontSize: 16, fontWeight: '900', letterSpacing: 2, color: '#000' },
    addButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    searchBar: { flexDirection: 'row', padding: 24, gap: 12 },
    searchIcon: { position: 'absolute', left: 40, top: 40, zIndex: 1 },
    searchInput: { flex: 1, height: 52, backgroundColor: '#f5f5f5', borderRadius: 16, paddingLeft: 52, paddingRight: 16, fontWeight: '600', color: '#000' },
    filterButton: { width: 52, height: 52, borderRadius: 16, borderColor: '#eee', borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    scrollView: { flex: 1 },
    productList: { paddingHorizontal: 24, gap: 16, paddingBottom: 40 },
    productCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 24, borderWidth: 1, borderColor: '#f0f0f0', overflow: 'hidden' },
    productImage: { width: 110, height: 110, backgroundColor: '#f8f8f8' },
    productInfo: { flex: 1, padding: 16, justifyContent: 'space-between' },
    infoTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    category: { fontSize: 9, fontWeight: '900', color: '#999', letterSpacing: 1 },
    productName: { fontSize: 14, fontWeight: '900', color: '#000', marginVertical: 2 },
    price: { fontSize: 13, fontWeight: '700', color: '#000' },
    infoBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
    statusDot: { width: 6, height: 6, borderRadius: 3 },
    statusText: { fontSize: 9, fontWeight: '900' },
    stockText: { fontSize: 10, fontWeight: '900', color: '#bbb' }
});
