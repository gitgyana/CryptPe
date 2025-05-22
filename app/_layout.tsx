import { Stack } from 'expo-router';
import { TransactionProvider } from '@/context/TransactionContext';
import './globals.css';

export default function RootLayout() {
    return (
        <TransactionProvider>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />
            </Stack>
        </TransactionProvider>
    );
}
