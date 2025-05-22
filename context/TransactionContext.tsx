import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction } from '@/interfaces/Transaction';
import { sendMetadataToContract } from '@/utils/contract';

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (tx: Transaction) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const addTransaction = async (tx: Transaction) => {
        setTransactions(prev => [tx, ...prev]);

        try {
            sendMetadataToContract({
                id: tx.id,
                txType: tx,
                amount: Number(tx.amount),
                method: tx.method,
                timestamp: tx.timestamp || Math.floor(Date.now() / 1000),
            });
        } catch (error) {
            console.error('Error sending metadata to smart contract:', error);
        }
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransaction = (): TransactionContextType => {
    const context = useContext(TransactionContext);
    if (!context) throw new Error('useTransaction must be used within TransactionProvider');
    return context;
};
