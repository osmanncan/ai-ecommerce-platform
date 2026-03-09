import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminOrders from '../screens/admin/AdminOrders';
import AdminProducts from '../screens/admin/AdminProducts';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
    Login: undefined;
    AdminDashboard: undefined;
    AdminOrders: undefined;
    AdminProducts: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    const { isAdmin, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#a78bfa" />
            </View>
        );
    }

    return (
        <Stack.Navigator
            initialRouteName={isAdmin ? 'AdminDashboard' : 'Login'}
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom'
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            {isAdmin && <Stack.Screen name="AdminDashboard" component={AdminDashboard} />}
            {isAdmin && <Stack.Screen name="AdminOrders" component={AdminOrders} />}
            {isAdmin && <Stack.Screen name="AdminProducts" component={AdminProducts} />}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f0c29',
    },
});
