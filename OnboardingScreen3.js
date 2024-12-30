import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen3 = () => {
    const navigation = useNavigation();  // Initialize the navigation hook

    const handleNext = () => {
        // Navigate to the next onboarding screen
        navigation.navigate('OnboardingScreen4');
    };

    const handleSkip = () => {
        // Navigate to the Home screen after skipping
        navigation.navigate('OnboardingScreen4');
    };

    return (
        <TouchableWithoutFeedback onPress={handleNext}>
        <View style={styles.container}>
            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.headerText}>Stay Connected Anytime!</Text>
                <Text style={styles.descriptionText}>
                    Get instant notifications and stay updated with everything happening in the app.
                </Text>
            </View>

            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>

            {/* Page Indicator */}
            <View style={styles.pageIndicatorContainer}>
                <View style={styles.pageLine} />
                <View style={styles.pageLine} />
                <View style={[styles.pageLine, styles.activeLine]} />
                <View style={styles.pageLine} />
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#14AE5C', // Red background
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
        marginBottom: 10,
    },
    skipText: {
        fontFamily: 'MontserratM',
        fontSize: 18,
        color: '#FFF',
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

export default OnboardingScreen3;
