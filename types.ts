export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    images: string[];
    detailImages?: string[];
    link: string;
    featured?: boolean;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    isError?: boolean;
}