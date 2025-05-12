import { Dimensions, FlatList, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import City from './City';
import Category from './Category';
import { query, collection, getDocs, where, orderBy } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import NewsListComponent from './NewsListComponent';

export default function NewsByCity() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // <-- Add refreshing state

  useEffect(() => {
    getNewsList();
  }, [selectedCity, selectedCategory]);

  const getNewsList = async () => {
    try {
      const filters = [
        where('Approved', '==', false),
        ...(selectedCity ? [where('City', '==', selectedCity)] : []),
        ...(selectedCategory ? [where('Category', '==', selectedCategory)] : []),
      ];

      const q = query(
        collection(db, 'News'),
        ...filters,
        orderBy('DateTime', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const newsData = querySnapshot.docs.map((doc, index) => ({
        ...doc.data(),
        localId: `news-${index}-${Math.random().toString(36).substr(2, 9)}`
      }));

      setNewsList(newsData);
    } catch (error) {
      console.error("Firestore query failed:", error);
    }
  };

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNewsList().finally(() => setRefreshing(false));
  }, [selectedCity, selectedCategory]);

  return (
    <View>
      {/* City and Category Selectors */}
      <View
        style={{
          marginTop: 5,
          borderWidth: 5,
          borderColor: "#fef7f6",
          padding: 5,
          borderRadius: 20,
        }}
      >
        <City city={(value) => setSelectedCity(value)} />
        <Category category={(value) => setSelectedCategory(value)} />
      </View>

      {/* News List with Refresh */}
      <FlatList
        style={{
          height: Dimensions.get('window').height * 0.7,
          borderWidth: 5,
          borderColor: "#fef7f6",
          borderRadius: 24,
          padding: 10,
          paddingBottom: 0,
          marginTop: 10,
        }}
        contentContainerStyle={{
          paddingBottom: Dimensions.get('window').height * 0.12,
        }}
        data={newsList}
        renderItem={({ item }) => <NewsListComponent news={item} />}
        keyExtractor={(item) => item.localId}
        refreshing={refreshing}             // <-- Pull-to-refresh binding
        onRefresh={onRefresh}               // <-- Trigger refresh function
      />
    </View>
  );
}
