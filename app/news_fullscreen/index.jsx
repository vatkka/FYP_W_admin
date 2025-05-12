import { View,Pressable, Text, BackHandler } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useNavigation} from 'expo-router';

import { useEffect } from 'react';
import { Image } from 'react-native';
import NewsInfo from '../../components/NewsDetails/NewsInfo';
import NewsSubInfo from '../../components/NewsDetails/NewsSubInfo.jsx';
import { FlatList, ScrollView, Dimensions } from 'react-native';
import { useUser } from '@clerk/clerk-expo';


export default function NewsFullscreen() {

    const news = useLocalSearchParams();
    const navigation = useNavigation();
    const user = useUser().user;
    useEffect(() => {
        navigation.setOptions({ 
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: 'black',
            
        });
    }, []);

  return (
    <ScrollView
        style={{
            width: Dimensions.get('window').width,
           
            backgroundColor: '#fef7f6',
        }}>
        <NewsInfo news={news}/>
        <NewsSubInfo news={news}/>
    </ScrollView>

  );
}