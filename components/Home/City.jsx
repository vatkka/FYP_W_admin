import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import styles from '../../app/styles';

/**
 * City component displays a list of cities fetched from Firestore.
 * Users can select or deselect a city, and the selected city is passed to the parent component.
 * It also allows users to clear the selected city by clicking the trash icon.
 */
export default function City({ city }) {

  const [cityList, setCityList] = useState([]); // Stores list of cities
  const [selectedCity, setSelectedCity] = useState(null); // Stores selected city

  // Fetch cities when component mounts
  useEffect(() => {
    GetCities();
  }, []);

  // Fetch cities from Firestore
  const GetCities = async () => {
    setCityList([]); // Clear existing city list
    const snapshot = await getDocs(collection(db, 'Cities'));
    snapshot.forEach(doc => {
      setCityList(cityList => [...cityList, doc.data()]);
    });
  };

  return (
    <View>
      {/* City section title and clear button */}
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
            fontSize: 14,
          }}
        >
          Cities:
        </Text>

        <TouchableOpacity
          onPress={() => {
            setSelectedCity(null); // Deselect the city
            city(null); // Pass null to parent component to reset the selected city
          }}
        >
          {/* Trash icon to clear selected city */}
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require('./../../assets/images/circle-trash.png')}
          />
        </TouchableOpacity>
      </View>

      {/* List of cities in a grid */}
      <FlatList
        numColumns={4} // Display cities in multiple columns
        data={cityList} // List of cities
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              // Toggle city selection
              if (selectedCity == item.name) {
                setSelectedCity(null); // Deselect city
                city(null); // Pass null to parent component to reset the selected city
              } else {
                city(item.name); // Pass selected city to parent component
                setSelectedCity(item.name); // Mark city as selected
              }
            }}
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            {/* City button, style changes if selected */}
            <View style={[styles.contaner_button, 
              selectedCity == item.name && styles.contaner_buttonChoosen]}>
              <Image
                source={{ uri: item?.imageUrl }} // City image
                style={styles.Image_button}
              />
            </View>
            {/* City name text */}
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
