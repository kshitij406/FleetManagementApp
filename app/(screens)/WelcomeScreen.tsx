import React from "react";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/(screens)/LoginScreen")
    };
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={require("@/assets/images/inapp/fleetlogo.png")}>
                </Image>
                <Text style={styles.titleText}>
                    Fleet Mangement 
                </Text>
                <Text>
                    Welcome!
                </Text>
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3147ED", 
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 200,
        height: 200,
    },
    content: {
        alignItems: "center",
        gap: 12
    },
    titleText: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "900",
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4
    },
    button: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8
    },
    buttonText: {
        color: "#008CFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default WelcomeScreen;