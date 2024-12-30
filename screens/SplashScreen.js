import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Image } from "react-native";

export default function SplashScreen() {
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnimation]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.imageContainer, { opacity: fadeAnimation }]}
            >
                <Image
                    style={styles.image}
                    source={require("../assets/Logo.gif")} // Replace PNG with GIF
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F1E3",
    },
    imageContainer: {
        borderRadius: 20,
        overflow: "hidden",
    },
    image: {
        width: 300, // Adjust size as needed
        height: 300,
        resizeMode: "contain",
    },
});
