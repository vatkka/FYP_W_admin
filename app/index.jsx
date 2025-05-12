import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Redirect } from 'expo-router';
import { useUser, useAuth } from '@clerk/clerk-expo';

/**
 * Index component that handles user redirection based on authentication status.
 * - Waits for user state to load
 * - Redirects user to either the home page or the login page based on authentication status
 */
export default function Index() {
  const { isLoaded, user } = useUser();
  const { isSignedIn } = useAuth();

  // Wait for the user state to load before rendering the UI
  if (!isLoaded) {
    return (
        <View 
          style={{
            display: 'flex',
            backgroundColor: '#faecdc',
            height: '100%',
          }}
        >
          <Image 
            source={require('./../assets/images/smart-cyprus.png')}
            style={{
              padding: 30,
              width: Dimensions.get('window').width - 50,
              height: 350,
              alignSelf: 'center',
              marginTop: 50,
            }} 
          />
        </View>
    );; 
  }

  console.log("isSignedIn:", isSignedIn);

  return (
    <View>
      <View 
        style={{
          display: 'flex',
          backgroundColor: '#faecdc',
          height: '100%',
        }}
      >
        <Image 
          source={require('./../assets/images/smart-cyprus.png')}
          style={{
            padding: 30,
            width: Dimensions.get('window').width - 50,
            height: 350,
            alignSelf: 'center',
            marginTop: 50,
          }} 
        />
      </View>
      
     <Redirect href='/(tabs)/home' />
    </View>
  );
}
