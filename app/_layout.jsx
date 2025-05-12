import React from "react";
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { ClerkProvider, tokenCache } from '@clerk/clerk-expo';
import { StyleSettingsProvider } from './settings/StyleSettingsContext';

/**
 * RootLayout component that sets up the application's context providers and routing.
 * - Loads custom fonts
 * - Initializes ClerkProvider for authentication
 * - Sets up routing with Stack from expo-router
 */
export default function RootLayout() {
  
  // Load custom fonts for the app
  useFonts({
    'Manrope-Regular': require('./../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Medium': require('./../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Bold': require('./../assets/fonts/Manrope-Bold.ttf'),
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <StyleSettingsProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
        </Stack>
      </StyleSettingsProvider>
    </ClerkProvider>
  );
}
