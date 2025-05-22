import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTransaction } from '@/context/TransactionContext';

export default function Profile() {
    const { transactions } = useTransaction();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Transaction History</Text>

            {transactions.length === 0 ? (
                <Text style={styles.empty}>No transactions yet.</Text>
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.txType}>{item.type} Payment</Text>
                            <Text>Amount: ₹{item.amount}</Text>
                            <Text>
                                {item.type === 'UPI'
                                    ? `UPI ID: ${item.method}`
                                    : `Wallet: ${item.method}`}
                            </Text>
                            <Text style={styles.date}>
                                {new Date(item.timestamp).toLocaleString()}
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#f4f4f4',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    },
    txType: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    date: {
        marginTop: 4,
        fontSize: 12,
        color: '#777',
    },
    empty: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
    },
});

