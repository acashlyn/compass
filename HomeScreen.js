import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const images = [
        require('../assets/lspu66.jpg'),
        require('../assets/lspu7.jpg'),
        require('../assets/lspu8.png'),
        require('../assets/lspu.jpg'),
        require('../assets/lspu2.jpg'),
        require('../assets/lspu3.jpg'),
        require('../assets/lspu4.jpg'),
        require('../assets/lspu5.jpeg'),
        require('../assets/lspu9.jpg'),
    ];

    useEffect(() => {
        const fadeEffect = () => {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1, // Fade in
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0, // Fade out
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            });
        };

        fadeEffect();
        const interval = setInterval(fadeEffect, 4000);

        return () => clearInterval(interval); // Clean up interval on unmount
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            {/* Fading Background Image */}
            <Animated.Image
                source={images[currentImageIndex]}
                style={[styles.image, { opacity: fadeAnim }]}
                resizeMode="cover"
            />

            {/* Overlay for content */}
            <View style={styles.overlay}>
                <Text style={styles.title}>Welcome to Campus Compass</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Map')}
                >
                    <Text style={styles.buttonText}>Explore the Campus Map</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        ...StyleSheet.absoluteFillObject, // Ensures full coverage
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(21, 76, 121, 0.4)', // Dark Blue (rgba format)
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
        fontFamily: 'MontserratEB',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'MontserratSB',
    },
});
