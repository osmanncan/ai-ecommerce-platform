export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    stock: number;
    embedding?: number[];
    created_at: string;
};

export type Order = {
    id: string;
    user_id: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    created_at: string;
};

export type OrderItem = {
    product_id: string;
    quantity: number;
    price: number;
};

export * from './constants';
