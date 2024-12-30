import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const OnboardingScreen4 = () => {
    const navigation = useNavigation();  // Initialize the navigation hook

    const handleSkip = () => {
        // Navigate to the Home screen after skipping
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.headerText}>Get Started Today!</Text>
                <Text style={styles.descriptionText}>
                    You're all set! Start exploring and enjoy everything we have in store for you.
                </Text>
            </View>

            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>CONTINUE</Text>
            </TouchableOpacity>

            {/* Page Indicator */}
            <View style={styles.pageIndicatorContainer}>
                <View style={styles.pageLine} />
                <View style={styles.pageLine} />
                <View style={styles.pageLine} />
                <View style={[styles.pageLine, styles.activeLine]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2176FF', // Red background
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    headerText: {
        fontFamily: 'MontserratEB',
        fontSize: 28,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    descriptionText: {
        fontFamily: 'MontserratM',
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        lineHeight: 22,
    },
    skipButton: {
        marginBottom: 20,
        backgroundColor: '#FFB339',
        padding: 20,
        borderRadius: 20,
        marginRight: 10,
        width: '50%',
    },
    skipText: {
        fontFamily: 'MontserratM',
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',

    },
    pageIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height * 0.01,
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
        width: 30,
        height: 3,
        backgroundColor: '#FFF',
        opacity: 1,
    },
});

export default OnboardingScreen4;
