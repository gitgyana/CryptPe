import { useTransaction } from '@/context/TransactionContext';
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useEffect, useState } from 'react'
import {
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'

export default function UPIScanner() {
    const [permission, requestPermission] = useCameraPermissions()
    const [scannedData, setScannedData] = useState('')
    const [upiID, setUpiID] = useState('')
    const [amount, setAmount] = useState('') // Added state for amount
    const [mode, setMode] = useState<'scan' | 'manual' | 'success' | 'loading'>('manual')
    const [transactionMeta, setTransactionMeta] = useState<any>(null)
    const { addTransaction } = useTransaction();

    useEffect(() => {
        if (!permission?.granted && mode === 'scan') {
            requestPermission()
        }
    }, [mode])

    // Replace with real API
    const simulateDummyTransaction = (upi: string) => {
        setMode('loading')
        setTimeout(() => {
            const meta = {
                transactionId: `TXN${Date.now()}`,
                upiId: upi,
                amount: parseFloat(amount) || 1,
                status: 'Success',
                timestamp: new Date().toISOString(),
            }
            setTransactionMeta(meta)
            addTransaction({
                id: meta.transactionId,
                type: 'UPI',
                method: meta.upiId,
                amount: meta.amount,
                currency: 'INR',
                status: meta.status,
                timestamp: meta.timestamp,
            })
            setMode('success')
        }, 2000)
    }

    const handleScan = async (barcode: any) => {
        if (barcode?.data) {
            const data = barcode.data
            setScannedData(data)

            if (data.startsWith('upi://')) {
                const upiParams = new URLSearchParams(data.split('?')[1])
                const upi = upiParams.get('pa')
                if (upi) {
                    simulateDummyTransaction(upi)
                } else {
                    Alert.alert('Error', 'Invalid UPI QR code.')
                }
            } else {
                Alert.alert('Scanned', data)
            }
        }
    }

    const handleSubmitUpiID = () => {
        if (!upiID.includes('@')) {
            Alert.alert('Invalid UPI ID', 'Please enter a valid UPI address like name@bank')
            return
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid payment amount')
            return
        }

        simulateDummyTransaction(upiID)
    }

    if (mode === 'loading') {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00b386" />
                <Text style={{ marginTop: 16, fontSize: 16 }}>Processing Payment...</Text>
            </View>
        )
    }

    if (mode === 'success') {
        return (
            <View style={styles.container}>
                <Text style={styles.successText}>✅ Transaction Successful!</Text>
                <Text style={styles.metaText}>Transaction ID: {transactionMeta?.transactionId}</Text>
                <Text style={styles.metaText}>UPI ID: {transactionMeta?.upiId}</Text>
                <Text style={styles.metaText}>Amount: ₹{transactionMeta?.amount}</Text>
                <Text style={styles.metaText}>Time: {new Date(transactionMeta?.timestamp).toLocaleString()}</Text>

                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => {
                        setMode('manual')
                        setUpiID('')
                        setScannedData('')
                        setAmount('')
                    }}
                >
                    <Text style={styles.toggleText}>Make Another Payment</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (mode === 'scan') {
        if (!permission?.granted) {
            return <Text style={styles.permissionText}>Camera permission is required to scan UPI QR.</Text>
        }

        return (
            <View style={{ flex: 1 }}>
                <CameraView
                    style={{ flex: 1 }}
                    onBarcodeScanned={handleScan}
                    barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                />
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setMode('manual')}
                >
                    <Text style={styles.toggleText}>Enter UPI ID Manually</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter UPI ID</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. name@bank"
                value={upiID}
                onChangeText={setUpiID}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Enter Amount (INR)</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. 100"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitUpiID}>
                <Text style={styles.submitText}>Pay with UPI</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setMode('scan')}
            >
                <Text style={styles.toggleText}>Scan QR Code Instead</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#fdfdfd',
    },
    label: {
        fontSize: 20,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#bbb',
        padding: 12,
        fontSize: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#00b386',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    toggleButton: {
        marginTop: 20,
        padding: 12,
        alignItems: 'center',
    },
    toggleText: {
        color: '#007aff',
        fontSize: 16,
    },
    permissionText: {
        padding: 20,
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
    },
    successText: {
        fontSize: 22,
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    metaText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 4,
    },
})
