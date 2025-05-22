import {View, Text, ImageBackground, Image} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const TabIcon = ({ focused, icon, title}: any) => {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                <Image source={icon} className="size-9" />

            </ImageBackground>
        )
    }

    return <View className="size-full justify-center items-center mt-4 rounded-full">
        <Image source={icon} className="size-8" />
    </View>
}

const _Layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabBarStyle: {
                backgroundColor: '#FFFFF1',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 0,
                borderColor: "#FFFFF1"
            }
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        focused={focused}
                        icon={icons.home}
                        title="Home"
                    />
                )
            }}
        />
        <Tabs.Screen
            name="upi"
            options={{
                title: "UPI",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        focused={focused}
                        icon={icons.upi_icon}
                        title="UPI"
                    />
                )
            }}
        />
        <Tabs.Screen
            name="crypto"
            options={{
                title: "Crypto",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        focused={focused}
                        icon={icons.crypto}
                        title="Crypto"
                    />
                )
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        focused={focused}
                        icon={icons.person}
                        title="Profile"
                    />
                )
            }}
        />
    </Tabs>
  )
}

export default _Layout
