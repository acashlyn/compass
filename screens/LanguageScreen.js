import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LanguageScreen = () => {
    const navigation = useNavigation();
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const languages = [
        { label: 'English (Australia)', value: 'en-AU' },
        { label: 'English (New Zealand)', value: 'en-NZ' },
        { label: 'English (United Kingdom)', value: 'en-UK' },
        { label: 'English (United States)', value: 'en-US' },
        { label: 'Filipino', value: 'fil' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: '#FDF6E4' }]}>
            <View style={[styles.header, { marginTop: 50 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Language</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
            </View>
            {languages.map((language) => (
                <TouchableOpacity
                    key={language.value}
                    style={styles.languageItem}
                    onPress={() => setSelectedLanguage(language.value)}
                >
                    <View style={styles.languageTextContainer}>
                        <Text style={styles.languageLabel}>{language.label}</Text>
                        <Text style={styles.languageValue}>English</Text>
                    </View>
                    <Text style={styles.radioCircle}>
                        {selectedLanguage === language.value ? '●' : '○'}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cancelButton: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Montserrat',

    },
    doneButton: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Montserrat',

    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat',
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    languageTextContainer: {
        flexDirection: 'column',
    },
    languageLabel: {
        fontSize: 16,
        fontFamily: 'MontserratM',
    },
    languageValue: {
        fontSize: 14,
        color: '#7D7D7D',
        fontFamily: 'MontserratR',
    },
    radioCircle: {
        fontSize: 18,
        color: '#000',
    },
});

export default LanguageScreen;
