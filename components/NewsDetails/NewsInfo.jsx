import { View, Pressable, Text, Image, Dimensions, FlatList, ScrollViewBase } from 'react-native';
import React, { useContext } from 'react';
import SaveArt from '../saveArt';
import styles from '../../app/styles';
import { StyleSettingsContext } from '../../app/settings/StyleSettingsContext';

/**
 * NewsInfo component displays detailed information about a specific news article.
 * 
 */
export default function NewsInfo({ news }) {
  const { styleSettings } = useContext(StyleSettingsContext);

  return (
    <View style={{ backgroundColor: '#fef7f6' }}>
      <Image
        source={{ uri: news.imageUrl }}
        style={{ width: "100%", height: Dimensions.get('window').height / 4 }}
      />

      <View style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between", padding: 20, alignItems: "center" }}>
        <Text style={{ ...styleSettings.article_h1 }}>
          {news?.Title}
        </Text>

        <SaveArt news={news} />
      </View>
    </View>
  );
}
