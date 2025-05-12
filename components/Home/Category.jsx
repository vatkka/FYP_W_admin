import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import styles from '../../app/styles';

/**
 * Category component displays a list of categories fetched from Firestore.
 * Users can select or deselect a category, and the selected category is passed to the parent component.
 * It also allows users to clear the selected category by clicking the trash icon.
 */
export default function Category({category}) {

  const [categoriesList, setCategoriesList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories when component mounts
  useEffect(() => {
    GetCategories();
  }, []);

  // Fetch categories from Firestore
  const GetCategories = async() => {
    setCategoriesList([]); // Clear the existing categories list
    const snapshot = await getDocs(collection(db, 'Categories'));
    snapshot.forEach(doc => {
      setCategoriesList(categoriesList => [...categoriesList, doc.data()]);
    });
  }

  return (
    <View
      style={{
        marginTop: 5,
      }}
    >
      {/* Category title and clear button */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'Manrope-Bold',
            fontSize: 15,
          }}>
          Categories:
        </Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(null); // Deselect the category
            category(null); // Pass null to parent component
          }}
        >
          {/* Trash icon to clear selected category */}
          <Image 
            style={{
              width: 25,
              height: 25,
            }}
            source={require('./../../assets/images/circle-trash.png')}
          />
        </TouchableOpacity>
      </View>

      {/* List of categories in a grid */}
      <FlatList
        numColumns={5} // Display categories in multiple columns
        data={categoriesList} // List of categories
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              // Toggle category selection
              if (selectedCategory == item.name) {
                setSelectedCategory(null); // Deselect category
                category(null); // Pass null to parent component
              } else {
                category(item.name); // Pass selected category to parent component
                setSelectedCategory(item.name); // Mark category as selected
              }
            }}
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            {/* Category button, style changes if selected */}
            <View style={[styles.contaner_button, 
              selectedCategory == item.name && styles.contaner_buttonChoosen]}>
              <Image
                source={{uri:item?.imageUrl}} // Category image
                style={styles.Image_button}
              />
            </View>
            {/* Category name text */}
            <Text
              style={styles.ImageText}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
