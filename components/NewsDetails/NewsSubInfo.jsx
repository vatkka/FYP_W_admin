import { View,Pressable, Text, Image , Dimensions, FlatList, ScrollViewBase,} from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
// import styles from '../../app/styles';
import {StyleSettingsContext } from '../../app/settings/StyleSettingsContext';
import { useContext } from 'react';

export default function NewsInfo({news}) {
  const { styleSettings } = useContext(StyleSettingsContext);

  return (
      <View
      style={{
        width: "100%",
        height: '100%',
        backgroundColor: '#fef7f6',
        padding: 5,
      }}
      >
        <View
          style={{
            borderWidth: 5,
            borderRadius: 24,
            borderColor:"#feeadd",
            width: "100%",
            height: "100%",
            padding: 15,
           }}>
            <Text
            style={{
              ...styleSettings.article_text,
              borderRadius: 24,
              color: 'black',
              backgroundColor: '#fef7f6',
            }}
            >
            {news?.Text}</Text>
        </View>
    
      </View>
     
   

  );
}
