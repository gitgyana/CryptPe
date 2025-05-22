export interface Transaction {
    id: string;
    type: 'UPI' | 'Crypto';
    method: string; // upiId or wallet address
    amount: number;
    currency: 'INR' | 'Crypto';
    status: string;
    timestamp: string;
}
