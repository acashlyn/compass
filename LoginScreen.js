import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

const LoginScreen = ({ navigation }) => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginSuccessVisible, setLoginSuccessVisible] = useState(false);
    const [isGuestAlertVisible, setGuestAlertVisible] = useState(false); // State for guest modal
    const [isLoginErrorVisible, setLoginErrorVisible] = useState(false); // State for login error modal

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                Montserrat: require('../assets/fonts/Montserrat.ttf'),
                MontserratM: require('../assets/fonts/MontserratM.ttf'),
                MontserratEB: require('../assets/fonts/MontserratEB.ttf'),
                MontserratR: require('../assets/fonts/MontserratR.ttf'),
                MontserratSB: require('../assets/fonts/MontserratSB.ttf'),

            });
            setFontLoaded(true);
        };
        loadFonts();
    }, []);

    const handleLogin = () => {
        if (username.trim() && password.trim()) {
            setLoginSuccessVisible(true); // Show the login success modal
        } else {
            setLoginErrorVisible(true); // Show login error modal
        }
    };

    const handleContinueToHome = () => {
        setLoginSuccessVisible(false); // Close the modal
        navigation.navigate('OnboardingScreen1'); // Navigate to OnboardingScreen1
    };


    const handleGuestLogin = () => {
        setGuestAlertVisible(true); // Show the guest alert modal
    };

    const handleContinueAsGuest = () => {
        setGuestAlertVisible(false); // Close the modal
        navigation.navigate('Home'); // Navigate to Guest HomeScreen or any appropriate screen
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp'); // Navigate to SignUp screen
    };

    const handleCloseErrorModal = () => {
        setLoginErrorVisible(false); // Close the login error modal
    };

    if (!fontLoaded) {
        return null; // Or a loading spinner
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust for iOS keyboard
            
        >
            <View style={styles.imageContainer}>
                <Image source={require('../assets/Toplogin.jpg')} style={styles.topLogo} />
                <LinearGradient
                    colors={['rgba(247,241,227,0)', 'rgba(247,241,227,0.95)']}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />
            </View>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/LSPULogo.png')} style={[styles.logo, styles.shadow]} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome Ka-PIYU!</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#666"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Student Number"
                    placeholderTextColor="#666"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>
                <View style={styles.textSeparator}>
                    <Text style={styles.normalText}>Or</Text>
                </View>
                <TouchableOpacity style={[styles.button, styles.guestButton]} onPress={handleGuestLogin}>
                    <Text style={styles.buttonText}>CONTINUE AS GUEST</Text>
                </TouchableOpacity>
                <View style={styles.textSeparatorA}>
                    <Text style={styles.normalText}>Don't Have an Account Yet?</Text>
                </View>
                <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>

            {/* Log In Success Modal */}
            <Modal
                visible={isLoginSuccessVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setLoginSuccessVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require('../assets/check.png')} style={styles.modalIcon} />
                        <Text style={styles.modalHeader}>WELCOME KA-PIYU</Text>
                        <Text style={styles.modalText}>
                            Log In Successfully. 
                        </Text>
                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={handleContinueToHome}
                        >
                            <Text style={styles.buttonText}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Guest Alert Modal */}
            <Modal
                visible={isGuestAlertVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setGuestAlertVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require('../assets/pin.gif')} style={styles.modalIcon} />
                        <Text style={styles.modalHeader}>HEADS UP!</Text>
                        <Text style={styles.modalText}>
                            You're continuing without an account. Some features may not be available for you.
                        </Text>
                        <Text style={styles.modalTextA}>
                            Would you still like to continue as a Guest?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setGuestAlertVisible(false)}>
                                <Text style={styles.buttonText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.continueButton} onPress={handleContinueAsGuest}>
                                <Text style={styles.buttonText}>CONTINUE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Login Error Modal */}
            <Modal
                visible={isLoginErrorVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseErrorModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentA}>
                        <Image source={require('../assets/error.png')} style={styles.modalIcon} />
                        <Text style={styles.modalHeader}>ERROR!!!</Text>
                        <Text style={styles.modalText}>
                            Please fill in both fields.
                        </Text>
                        <TouchableOpacity style={styles.cancelButtonA} onPress={handleCloseErrorModal}>
                            <Text style={styles.buttonTextA}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F1E3',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 280,
        overflow: 'hidden',
    },
    logoContainer: {
        position: 'absolute',
        top: 200,
        left: '47%',
        transform: [{ translateX: -75 }],
        zIndex: 2,
        alignItems: 'center',
    },
    logo: {
        width: 180,
        height: 180,
        borderRadius: 100,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
    },
    topLogo: {
        position: 'absolute',
        width: '100%',
        height: 280,
        resizeMode: 'cover',
        top: 0,
        zIndex: 1,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        zIndex: 1,
    },
    textContainer: {
        marginTop: 400,
        alignItems: 'center',
    },
    welcomeText: {
        fontFamily: 'Montserrat',
        fontSize: 36,
        color: '#333',
    },
    formContainer: {
        width: '70%',
        marginTop: 20,
    },
    input: {
        backgroundColor: '#F7F1E3',
        padding: 10,
        marginVertical: 7,
        borderRadius: 15,
        borderColor: '#000',
        borderWidth: 2.3,
        fontFamily: 'MontserratM',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 23,
        borderRadius: 30,
        marginTop: 20,
    },
    guestButton: {
        backgroundColor: '#FDCA40',
        marginTop: 0,
    },
    signUpButton: {
        backgroundColor: '#28a745',
        marginTop: 0,
    },
    buttonText: {
        fontFamily: 'MontserratEB',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    normalText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'MontserratM',
    },
    textSeparator: {
        marginTop: 0,

    },
    textSeparatorA: {
        marginTop: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: '45%',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalIcon: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    modalHeader: {
        fontFamily: 'MontserratEB',
        fontSize: 45,
        color: '#333',
        marginBottom: 10,
    },
    modalText: {
        fontFamily: 'MontserratM',
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },

    modalTextA: {
        fontFamily: 'MontserratEB',
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
    },
    cancelButton: {
        backgroundColor: '#FF3B30',
        padding: 20,
        borderRadius: 20,
        marginRight: 10,
    },
    continueButton: {
        backgroundColor: '#28a745',
        padding: 20,
        borderRadius: 20,
    },
    modalContentA: {
        height: '40%',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    cancelButtonA: {
        backgroundColor: '#FFB339',
        padding: 20,
        borderRadius: 20,
        marginRight: 10,
        width: '50%',
    },

    buttonTextA: {
        fontFamily: 'MontserratEB',
        fontSize: 25,
        color: '#fff',
        textAlign: 'center',
    },
});

export default LoginScreen;