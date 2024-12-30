import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SettingsScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Map')}
                    style={styles.backButton}
                >
                    <Image source={require('../assets/back.png')} style={styles.backButtonImage} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>
            {/* Content */}
            <View style={styles.content}>
                {/* Language Setting */}
                <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => navigation.navigate('Language')} // Navigate to LanguageScreen
                >
                    <View style={styles.settingItemLeft}>
                        <Image source={require('../assets/english.png')} style={styles.settingIcon} />
                        <Text style={styles.settingTitle}>Language</Text>
                    </View>
                    <View style={styles.settingItemRight}>
                        <Text style={styles.settingValue}>English</Text>
                        <Image source={require('../assets/down.png')} style={styles.settingArrow} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Accessibility clicked')}>
                    <View style={styles.settingItemLeft}>
                        <Image source={require('../assets/access.png')} style={styles.settingIcon} />
                        <Text style={styles.settingTitle}>Accessibility</Text>
                    </View>
              
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => console.log('User Guide clicked')}>
                    <View style={styles.settingItemLeft}>
                        <Image source={require('../assets/user.png')} style={styles.settingIcon} />
                        <Text style={styles.settingTitle}>User Guide</Text>
                    </View>
                 
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Help & Support clicked')}>
                    <View style={styles.settingItemLeft}>
                        <Image source={require('../assets/help.png')} style={styles.settingIcon} />
                        <Text style={styles.settingTitle}>Help & Support</Text>
                    </View>
                  
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Notifications clicked')}>
                    <View style={styles.settingItemLeft}>
                        <Image source={require('../assets/notif.png')} style={styles.settingIcon} />
                        <Text style={styles.settingTitle}>Notifications</Text>
                    </View>
           
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Feed Back clicked')}>
                    <View style={styles.settingItemLeft}>
                        <Image source={require('../assets/feedback.png')} style={styles.settingIcon} />
                        <Text style={styles.settingTitle}>Feed Back</Text>
                    </View>
                  
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Privacy Policy & Terms clicked')}>
                    <View style={styles.settingItemLeft}>
                        <Image source={require('../assets/privacy.png')} style={styles.settingIcon} />
                        <Text style={styles.settingTitle}>Privacy Policy & Terms</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => console.log('App Permissions clicked')}>
                    <View style={styles.settingItemLeft}>
                        <Image source={require('../assets/key.png')} style={styles.settingIcon} />
                        <Text style={styles.settingTitle}>App Permissions</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Data Sharing Preferences clicked')}>
                    <View style={styles.settingItemLeft}>
                        <Image source={require('../assets/lock.png')} style={styles.settingIcon} />
                        <Text style={styles.settingTitle}>Data Sharing Preferences</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={styles.DeleteItem} onPress={() => console.log('Delete clicked')}>
                    <View style={styles.settingItemLeft}>
                        <Image source={require('../assets/trash.png')} style={styles.DeleteIcon} />
                        <Text style={styles.settingTitle1}>Delete Account</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F1E3',
    },
    header: {
        backgroundColor: '#e6dabd',
        padding: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'Montserrat',
        fontSize: 24,
        flex: 1,
        textAlign: 'left',
        top: 25,
        right: 20,
    },
    backButton: {
        marginRight: 16,
    },
    backButtonImage: {
        width: 30, // Adjust the width as needed
        height: 30, // Adjust the height as needed
        right: 15, // Add some left margin if desired
        top: 23,
    },
    content: {
        flex: 1,
        padding: 20,
        top: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    settingIcon: {
        width: 30,
        height: 30,
    },
    DeleteIcon: {
        width: 30,
        height: 30,
        tintColor: '#fff',
        left: 90,
    
    },
    DeleteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#E74434',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },

    settingTitle: {
        fontFamily: 'MontserratEB',
        fontSize: 19,
    },
    settingTitle1: {
        fontFamily: 'MontserratEB',
        fontSize: 19,
        color: '#fff',
        left: 80,
    },
    settingItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    settingValue: {
        fontFamily: 'MontserratSB',
        fontSize: 16,
    },
    settingArrow: {
        width: 20,
        height: 20,
    },
});

export default SettingsScreen;
