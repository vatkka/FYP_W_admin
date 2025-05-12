import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { StyleSettingsContext } from './StyleSettingsContext';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

/**
 * SettingsScreen component that allows users to adjust the font sizes for article titles and text.
 * - Provides sliders to adjust the font sizes of the title and text
 * - Saves updated style settings in context
 */
export default function SettingsScreen() {
  const { styleSettings, setStyleSettings } = useContext(StyleSettingsContext);

  const [h1FontSize, setH1FontSize] = useState(styleSettings.article_h1.fontSize);
  const [textFontSize, setTextFontSize] = useState(styleSettings.article_text.fontSize);

  const navigation = useNavigation();

  const handleSave = () => {
    const updatedStyles = {
      ...styleSettings,
      article_h1: {
        ...styleSettings.article_h1,
        fontSize: h1FontSize,
      },
      article_text: {
        ...styleSettings.article_text,
        fontSize: textFontSize,
      },
    };
    setStyleSettings(updatedStyles); 
  };

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true, 
      headerTitle: '', 
      headerTintColor: 'black', 
    });
  }, []);

  return (
    <View style={[styles.container, { padding: 20, backgroundColor: '#fef7f6', flex: 1, alignContent: 'center', justifyContent: 'center' }]}>
      {/* Title font size slider */}
      <Text style={styles.h1}>Article Title Font Size: {h1FontSize}</Text>
      <Slider
        style={{ width: '100%', marginBottom: 40 }}
        minimumValue={25}
        maximumValue={50}
        step={1}
        value={h1FontSize}
        onValueChange={setH1FontSize} 
        onSlidingComplete={handleSave} 
      />

     
      <Text style={styles.h1}>Article Text Font Size: {textFontSize}</Text>
      <Slider
        style={{ width: '100%' }}
        minimumValue={10}
        maximumValue={35}
        step={1}
        value={textFontSize}
        onValueChange={setTextFontSize} 
        onSlidingComplete={handleSave} 
      />
    </View>
  );
}
