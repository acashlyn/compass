import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const OnboardingLayout = ({ children, onSkip }) => {
    const navigation = useNavigation();

    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        } else {
            navigation.navigate('OnboardingScreen2'); // Default skip action
        }
    };

    return (
        <View style={styles.container}>
            {/* Content (Passed as children) */}
            <View style={styles.content}>
                {children}
            </View>

            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>

            {/* Page Indicator */}
            <View style={styles.pageIndicatorContainer}>
                <View style={[styles.pageLine, styles.activeLine]} />
                <View style={styles.pageLine} />
                <View style={styles.pageLine} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E74434', // Red background
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    skipButton: {
        marginBottom: 20,
    },
    skipText: {
        fontSize: 18,
        color: '#FFF',
        textDecorationLine: 'underline',
    },
    pageIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height * 0.05,
    },
    pageLine: {
        width: 30,
        height: 3,
        backgroundColor: '#FFF',
        marginHorizontal: 5,
        opacity: 0.5,
        borderRadius: 2,
    },
    activeLine: {
        width: 50,
        height: 3,
        backgroundColor: '#FFF',
        opacity: 1,
    },
});

export default OnboardingLayout;
