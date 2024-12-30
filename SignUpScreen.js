import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    KeyboardAvoidingView,
    Platform,
    Image,
    Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker'; // Import DropDownPicker

const SignUpScreen = ({ navigation }) => {
    const topLogoAnimation = useRef(new Animated.Value(0)).current;
    const lspuLogoAnimation = useRef(new Animated.Value(0)).current;
    const fadeInAnimation = useRef(new Animated.Value(0)).current;
    const welcomeTextAnimation = useRef(new Animated.Value(0)).current;

    const [fullName, setFullName] = useState('');
    const [collegeDepartment, setCollegeDepartment] = useState(null); // Updated to hold value of the selected department
    const [username, setUsername] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [isGuestAlertVisible, setGuestAlertVisible] = useState(false);
    const [isSignUpSuccessVisible, setSignUpSuccessVisible] = useState(false);
    const [isSignUpErrorVisible, setSignUpErrorVisible] = useState(false);
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);

    const [openDepartment, setOpenDepartment] = useState(false); // For managing the dropdown open/close
    const [itemsDepartment, setItemsDepartment] = useState([
        { label: 'College of Arts and Sciences', value: 'cas' },
        { label: 'College of Business Administration and Accountancy', value: 'cbba' },
        { label: 'College of Computer Studies', value: 'ccs' },
        { label: 'College of Criminal Justice Education', value: 'ccje' },
        { label: 'College of Fisheries', value: 'cof' },
        { label: 'College of Food Nutrition and Dietetics', value: 'cfnd' },
        { label: 'College of Hospitality Management and Tourism', value: 'chmt' },
        { label: 'College of Teacher Education', value: 'cte' },


    ]);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(topLogoAnimation, {
                toValue: -50,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(lspuLogoAnimation, {
                toValue: -60,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(welcomeTextAnimation, {
                toValue: -70,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeInAnimation, {
                toValue: 1,
                duration: 500,
                delay: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleSignUp = () => {
        if (fullName.trim() && collegeDepartment && username.trim() && studentNumber.trim()) {
            setConfirmationVisible(true);
        } else {
            setSignUpErrorVisible(true);
        }
    };

    const handleProceed = () => {
        setConfirmationVisible(false);
        setSignUpSuccessVisible(true);
    };

    const handleEditInformation = () => {
        setConfirmationVisible(false);
    };

    const handleLogIn = () => {
        navigation.navigate('Login');
    };

    const handleContinueAsGuest = () => {
        navigation.navigate('Home');
    };

    const handleContinueAfterSignUpSuccess = () => {
        setSignUpSuccessVisible(false);
        navigation.navigate('Login');
    };

    const handleGuestAlert = () => {
        setGuestAlertVisible(true);
    };

    const handleCloseErrorModal = () => {
        setSignUpErrorVisible(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Animated.View
                style={[styles.imageContainer, { transform: [{ translateY: topLogoAnimation }] }]}
            >
                <Image source={require('../assets/Toplogin.jpg')} style={styles.topLogo} />
                <LinearGradient
                    colors={['rgba(247,241,227,0)', 'rgba(247,241,227,0.95)']}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />
            </Animated.View>

            <Animated.View
                style={[styles.logoContainer, { transform: [{ translateY: lspuLogoAnimation }] }]}
            >
                <Image source={require('../assets/LSPULogo.png')} style={[styles.logo, styles.shadow]} />
            </Animated.View>

            <Animated.View
                style={[styles.textContainer, { transform: [{ translateY: welcomeTextAnimation }] }]}
            >
                <Text style={styles.welcomeText}>Create Your Account</Text>
            </Animated.View>

            <Animated.View style={[styles.formContainer, { opacity: fadeInAnimation }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#666"
                    value={fullName}
                    onChangeText={setFullName}
                />

                {/* College Department Dropdown */}
                <DropDownPicker
                    open={openDepartment}
                    value={collegeDepartment}
                    items={itemsDepartment}
                    setOpen={setOpenDepartment}
                    setValue={setCollegeDepartment}
                    setItems={setItemsDepartment}
                    placeholder="Select College Department"
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownList} // Style for the expanded dropdown
                    listItemContainerStyle={styles.listItemContainer} // Style for each list item container
                    listItemLabelStyle={styles.listItemLabel} // Style for each list item label
                    placeholderStyle={styles.placeholder}
                    textStyle={{
                        fontSize: 16,
                        fontFamily: 'MontserratM', // Style for the placeholder text
                    }}

                />

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
                    value={studentNumber}
                    onChangeText={setStudentNumber}
                />
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>

                <View style={styles.accountTextContainer}>
                    <Text style={styles.accountText}>Already Have an Account?</Text>
                </View>

                <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
                    <Text style={styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>

                <View style={styles.orTextContainer}>
                    <Text style={styles.orText}>Or</Text>
                </View>

                <TouchableOpacity style={styles.guestButton} onPress={handleGuestAlert}>
                    <Text style={styles.buttonText}>CONTINUE AS GUEST</Text>
                </TouchableOpacity>
            </Animated.View>

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

            {/* Sign Up Success Modal */}
            <Modal
                visible={isSignUpSuccessVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSignUpSuccessVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require('../assets/check.png')} style={styles.modalIcon} />
                        <Text style={styles.modalHeader}>WELCOME KA-PIYU!</Text>
                        <Text style={styles.modalTextB}>Sign Up Successful</Text>
                        <TouchableOpacity style={styles.continueButton} onPress={handleContinueAfterSignUpSuccess}>
                            <Text style={styles.buttonText}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Confirmation Modal */}
            <Modal
                visible={isConfirmationVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setConfirmationVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentC}>
                        <Image source={require('../assets/zoom.png')} style={styles.modalIcon} />
                        <Text style={styles.modalHeaderC}>Is your Information Correct?</Text>
                        <Text style={styles.modalText}>
                            Please check your information before proceeding.
                        </Text>
                        <View style={styles.modalButtonsA}>
                            <TouchableOpacity style={styles.cancelButtonC} onPress={handleEditInformation}>
                                <Text style={styles.buttonText}>Edit Information</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.continueButton} onPress={handleProceed}>
                                <Text style={styles.buttonText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Sign Up Error Modal */}
            <Modal
                visible={isSignUpErrorVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseErrorModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentA}>
                        <Image source={require('../assets/error.png')} style={styles.modalIcon} />
                        <Text style={styles.modalHeader}>ERROR!!!</Text>
                        <Text style={styles.modalText}>
                            Please fill in all fields.
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
        left: '30%',
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
        marginTop: -50,
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
        backgroundColor: '#28a745',
        padding: 23,
        borderRadius: 30,
        marginTop: 20,
        alignItems: 'center',
    },
    logInButton: {
        backgroundColor: '#007bff',
        padding: 23,
        borderRadius: 30,
        marginTop: 10,
        alignItems: 'center',
    },
    guestButton: {
        backgroundColor: '#FDCA40',
        padding: 23,
        borderRadius: 30,
        marginTop: 0,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'MontserratEB',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    accountTextContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    accountText: {
        fontFamily: 'MontserratM',
        fontSize: 14,
        color: '#333',
    },
    orTextContainer: {
        marginTop: 0,
        alignItems: 'center',
    },
    orText: {
        fontFamily: 'MontserratM',
        fontSize: 14,
        color: '#333',
    },

    // Modal styles
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
    modalTextB: {
        fontFamily: 'MontserratM',
        fontSize: 16,
        color: '#666',
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
    modalContentA: {
        height: '40%',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalContentC: {
        height: '36%',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalHeaderC: {
        fontFamily: 'MontserratEB',
        fontSize: 25,
        color: '#333',
        marginBottom: 10,
    },
    modalButtonsA: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
    },
    cancelButtonC: {
        backgroundColor: '#FFB339',
        padding: 20,
        borderRadius: 20,
        marginRight: 10,

    },
    dropdownContainer: {
        height: 50,
        marginBottom: 10,
        borderRadius: 10,

    },
    dropdown: {
        backgroundColor: '#F7F1E3', // Default dropdown background color
        marginVertical: 7,
        borderRadius: 15,
        borderColor: '#000',
        borderWidth: 2.3,
        padding: 10,


    },
    dropdownList: {
        backgroundColor: '#E8F5E9', // Background color for the expanded dropdown
        borderColor: '#000',
        borderWidth: 2.3,
        borderRadius: 15,
    },
    listItemContainer: {
        backgroundColor: '#F7F1E3', // Background color for each list item
        borderBottomWidth: 1,
        borderBottomColor: '#F7F1E3',

    },
    listItemLabel: {
        color: '#000', // Text color of each list item
        fontSize: 15,
        fontFamily: 'MontserratM',

    },
    placeholder: {
        color: '#666', // Placeholder text color
        fontSize: 16,  
        fontFamily: 'MontserratM',
   // Font size for the placeholder
    },

    
});

export default SignUpScreen;
