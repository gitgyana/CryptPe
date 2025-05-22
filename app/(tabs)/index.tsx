import { Text, View, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white px-6 py-12">
            <Text className="text-4xl font-bold text-center mb-8 text-black">Welcome to CryptPe</Text>

            <View className="flex-row flex-wrap justify-between gap-4">
                {/* UPI Block */}
                <Pressable
                    onPress={() => router.push("/(tabs)/upi")}
                    className="w-[48%] h-40 bg-purple-200 rounded-2xl justify-center items-center shadow-md"
                >
                    <Image
                        source={require("../../assets/icons/upi_icon.png")}
                        className="w-12 h-12 mb-2"
                        resizeMode="contain"
                    />
                    <Text className="text-lg font-semibold text-purple-800">UPI Payments</Text>
                </Pressable>

                {/* Crypto Block */}
                <Pressable
                    onPress={() => router.push("/(tabs)/crypto")}
                    className="w-[48%] h-40 bg-blue-200 rounded-2xl justify-center items-center shadow-md"
                >
                    <Image
                        source={require("../../assets/icons/crypto.png")}
                        className="w-12 h-12 mb-2"
                        resizeMode="contain"
                    />
                    <Text className="text-lg font-semibold text-blue-800">Crypto Wallet</Text>
                </Pressable>

                {/* Hybrid Placeholder Block for advance implementation */}
                <View className="w-full h-40 bg-green-100 rounded-2xl justify-center items-center shadow-md">
                    <Text className="text-lg font-semibold text-green-700">Scan & Pay via Crypto</Text>
                    <Text className="text-center text-green-700 px-4 mt-1 text-sm">
                        Sell crypto via Binance API, convert to fiat, and pay via UPI.
                    </Text>
                </View>
            </View>
        </View>
    );
}
