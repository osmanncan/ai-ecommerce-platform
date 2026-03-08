import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Search, Filter, ArrowLeft, MoreHorizontal, ShoppingBag } from 'lucide-react-native';
import { useTranslation } from '../../context/LocalizationContext';

export default function AdminOrders({ navigation }: any) {
    const { t } = useTranslation();
    const [orders] = useState([
        { id: "#AURA-8F2D", customer: "Berke Yılmaz", email: "berke@example.com", date: "10 Mart, 14:20", amount: "₺4.250", items: 2, status: "preparing" },
        { id: "#AURA-9A1C", customer: "Aslı Çelik", email: "asli@example.com", date: "10 Mart, 12:45", amount: "₺1.890", items: 1, status: "paid" },
        { id: "#AURA-7B4E", customer: "Kaan Aras", email: "kaan@example.com", date: "09 Mart, 18:30", amount: "₺12.400", items: 3, status: "shipped" },
        { id: "#AURA-6D1F", customer: "Zeynep Demir", email: "zeynep@example.com", date: "09 Mart, 11:15", amount: "₺8.900", items: 1, status: "completed" },
    ]);

    const getStatusStyle = (status: any) => {
        switch (status) {
            case "preparing": return { bg: '#fff4e5', text: '#b36d0a', dot: '#ff9800', label: t.orders.status.preparing };
            case "paid": return { bg: '#e8f5e9', text: '#2e7d32', dot: '#4caf50', label: t.orders.status.paid };
            case "shipped": return { bg: '#e3f2fd', text: '#1565c0', dot: '#2196f3', label: t.orders.status.shipped };
            case "completed": return { bg: '#f5f5f5', text: '#616161', dot: '#9e9e9e', label: t.orders.status.completed };
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
                    <Text style={styles.title}>{t.orders.title}</Text>
                    <View style={styles.placeHolderButton} />
                </View>

                <View style={styles.searchBar}>
                    <View style={styles.searchContainer}>
                        <Search color="#999" size={20} style={styles.searchIcon} />
                        <TextInput
                            placeholder={t.orders.searchPlaceholder}
                            style={styles.searchInput}
                        />
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Filter color="#000" size={20} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.orderList}>
                        {orders.map((order, index) => {
                            const styles_status = getStatusStyle(order.status);
                            return (
                                <TouchableOpacity key={index} style={styles.orderCard}>
                                    <View style={styles.orderHeader}>
                                        <Text style={styles.orderId}>{order.id}</Text>
                                        <View style={[styles.statusBadge, { backgroundColor: styles_status.bg }]}>
                                            <View style={[styles.statusDot, { backgroundColor: styles_status.dot }]} />
                                            <Text style={[styles.statusText, { color: styles_status.text }]}>{styles_status.label.toUpperCase()}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.customerInfo}>
                                        <Text style={styles.customerName}>{order.customer}</Text>
                                        <Text style={styles.orderDate}>{order.date}</Text>
                                    </View>

                                    <View style={styles.orderFooter}>
                                        <View style={styles.itemsBadge}>
                                            <ShoppingBag size={12} color="#999" />
                                            <Text style={styles.itemsText}>{order.items} {t.orders.itemsCount}</Text>
                                        </View>
                                        <Text style={styles.orderAmount}>{order.amount}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    backButton: { padding: 8, marginLeft: -8 },
    title: { fontSize: 13, fontWeight: '900', letterSpacing: 2.5, color: '#000' },
    placeHolderButton: { width: 44, height: 44 },
    searchBar: { flexDirection: 'row', padding: 24, gap: 12 },
    searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16, borderWidth: 1, borderColor: '#eee' },
    searchIcon: { marginRight: 12 },
    searchInput: { flex: 1, height: 52, fontWeight: '600', color: '#000', fontSize: 13 },
    filterButton: { width: 52, height: 52, borderRadius: 20, backgroundColor: '#fff', borderColor: '#eee', borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    scrollView: { flex: 1 },
    orderList: { paddingHorizontal: 24, gap: 16, paddingBottom: 40 },
    orderCard: { backgroundColor: '#fff', borderRadius: 28, padding: 24, borderWidth: 1, borderColor: '#eee', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 10, elevation: 1 },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    orderId: { fontSize: 14, fontWeight: '900', color: '#000' },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, gap: 6 },
    statusDot: { width: 6, height: 6, borderRadius: 3 },
    statusText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
    customerInfo: { marginBottom: 20 },
    customerName: { fontSize: 16, fontWeight: '800', color: '#000', marginBottom: 4 },
    orderDate: { fontSize: 12, color: '#999', fontWeight: '500' },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f8f8f8' },
    itemsBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f5f5f5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
    itemsText: { fontSize: 10, fontWeight: '900', color: '#999', letterSpacing: 0.5 },
    orderAmount: { fontSize: 18, fontWeight: '900', color: '#000' }
});
