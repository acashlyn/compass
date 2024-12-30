import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import OnboardingScreen1 from './screens/OnboardingScreen1';
import OnboardingScreen2 from './screens/OnboardingScreen2';
import OnboardingScreen3 from './screens/OnboardingScreen3';
import OnboardingScreen4 from './screens/OnboardingScreen4';
import SettingsScreen from './screens/SettingsScreen';
import LanguageScreen from './screens/LanguageScreen'; // Import LanguageScreen

const Stack = createStackNavigator();

export default function App() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  // Simulate splash screen timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  if (isShowSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Authentication Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />

        {/* Onboarding Screens */}
        <Stack.Screen
          name="OnboardingScreen1"
          component={OnboardingScreen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingScreen2"
          component={OnboardingScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingScreen3"
          component={OnboardingScreen3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingScreen4"
          component={OnboardingScreen4}
          options={{ headerShown: false }}
        />

        {/* Main App Screens */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Language"
          component={LanguageScreen} // Add LanguageScreen
          options={{ headerShown: false }}


        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
