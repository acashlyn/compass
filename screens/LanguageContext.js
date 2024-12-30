import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language
    const translations = {
        en: {
            settings: 'Settings',
            language: 'Language',
            accessibility: 'Accessibility',
            userGuide: 'User Guide',
            helpSupport: 'Help & Support',
            notifications: 'Notifications',
            feedback: 'Feedback',
            privacyTerms: 'Privacy Policy & Terms',
            appPermissions: 'App Permissions',
            dataSharing: 'Data Sharing Preferences',
            deleteAccount: 'Delete Account',
        },
        fil: {
            settings: 'Mga Setting',
            language: 'Wika',
            accessibility: 'Pagiging Accessible',
            userGuide: 'Gabay ng Gumagamit',
            helpSupport: 'Tulong at Suporta',
            notifications: 'Mga Abiso',
            feedback: 'Puna',
            privacyTerms: 'Patakaran sa Privacy at Mga Tuntunin',
            appPermissions: 'Mga Pahintulot sa App',
            dataSharing: 'Mga Kagustuhan sa Pagbabahagi ng Data',
            deleteAccount: 'Burahin ang Account',
        },
    };

    const contextValue = {
        language,
        setLanguage,
        translations: translations[language] || translations['en'], // Fallback to 'en'
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};
