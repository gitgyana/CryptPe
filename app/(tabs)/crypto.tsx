import React, { useEffect, useState } from 'react'
import { useTransaction } from '@/context/TransactionContext';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    ScrollView,
} from 'react-native'

// Replace with real API
const fetchDummyCryptoMeta = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Bitcoin', symbol: 'BTC' },
                { name: 'Ethereum', symbol: 'ETH' },
                { name: 'Solana', symbol: 'SOL' },
                { name: 'Polygon', symbol: 'MATIC' },
            ])
        }, 1000)
    })
}

const Crypto = () => {
    const [cryptoList, setCryptoList] = useState<{ name: string; symbol: string }[]>([])
    const [selectedCrypto, setSelectedCrypto] = useState<string>('')
    const [walletAddress, setWalletAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(true)
    const { addTransaction } = useTransaction();

    useEffect(() => {
        const fetchData = async () => {
            const data: any = await fetchDummyCryptoMeta()
            setCryptoList(data)
            setSelectedCrypto(data[0]?.symbol || '')
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleSend = () => {
        if (!walletAddress || walletAddress.length < 6) {
            Alert.alert('Invalid Address', 'Please enter a valid crypto wallet address.')
            return
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount to send.')
            return
        }

        Alert.alert(
            'Transaction Successful',
            `Sent ${amount} ${selectedCrypto} to ${walletAddress}.`
        )

        // Future: Save transaction to user profile here
        setWalletAddress('')
        setAmount('')
        addTransaction({
            id: `CRTXN${Date.now()}`,
            type: 'Crypto',
            method: walletAddress,
            amount: Number(amount),
            currency: 'Crypto',
            status: 'Success',
            timestamp: new Date().toISOString(),
        });

    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007aff" />
                <Text style={{ marginTop: 16 }}>Loading crypto options...</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Send Cryptocurrency</Text>

            <Text style={styles.label}>Select Crypto</Text>
            {cryptoList.map(crypto => (
                <TouchableOpacity
                    key={crypto.symbol}
                    style={[
                        styles.cryptoOption,
                        selectedCrypto === crypto.symbol && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedCrypto(crypto.symbol)}
                >
                    <Text
                        style={{
                            color:
                                selectedCrypto === crypto.symbol ? '#fff' : '#007aff',
                        }}
                    >
                        {crypto.name} ({crypto.symbol})
                    </Text>
                </TouchableOpacity>
            ))}

            <Text style={styles.label}>Enter Wallet Address</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. 0xAbc123..."
                value={walletAddress}
                onChangeText={setWalletAddress}
                autoCapitalize="none"
            />

            <Text style={styles.label}>Amount</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. 0.05"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleSend}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Crypto

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        marginTop: 16,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    cryptoOption: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#007aff',
        borderRadius: 8,
        marginVertical: 6,
    },
    selectedOption: {
        backgroundColor: '#007aff',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#00b386',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
