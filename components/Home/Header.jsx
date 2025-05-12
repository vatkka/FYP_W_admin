import { View, Text, Image } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import styles from '../../app/styles';

export default function Header() {

    const {user} = useUser();

  return (
    <View
    style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }}
    >
        <View>
            <Text style= {styles.h2}>Welcome,</Text>
            <Text tyle= {styles.h2}>{user?.firstName}</Text>
            
        </View>
        <Image 
        source={{uri:user?.imageUrl}} 
        style={{
            borderWidth: 2,
            width: 50,
            height: 50,
            borderRadius: 50,
        }}
        />
  </View>
  )
}

