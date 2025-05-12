import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
  ToastAndroid,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles';
import { serverTimestamp } from 'firebase/firestore';

export default function AddNewAdmin() {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState();
  const router = useRouter();

  const uploadToCloudinary = async (imageUri) => {
    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    data.append('upload_preset', 'usersImg');
    data.append('cloud_name', 'dkcz69xdl');

    const res = await fetch('https://api.cloudinary.com/v1_1/dkcz69xdl/image/upload', {
      method: 'POST',
      body: data,
    });

    const json = await res.json();
    return json.secure_url;
  };

  const GetCities = async () => {
    const snapshot = await getDocs(collection(db, 'Cities'));
    const cities = snapshot.docs.map(doc => doc.data());
    setCityList(cities);
  };

  const GetCategories = async () => {
    const snapshot = await getDocs(collection(db, 'Categories'));
    const categories = snapshot.docs.map(doc => doc.data());
    setCategoriesList(categories);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      try {
        const uploadedUrl = await uploadToCloudinary(uri);
        setImage(uploadedUrl);
        handleInputChange('imageUrl', uploadedUrl);
      } catch (error) {
        console.error('Cloudinary upload failed:', error);
        ToastAndroid.show('Image upload failed', ToastAndroid.SHORT);
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Add New Article',
      headerBackTitle: 'Back',
      headerStyle: {
        backgroundColor: '#fef7f6',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontFamily: 'Manrope-Bold',
        fontSize: 20,
      },
    });
    GetCities();
    GetCategories();
    handleInputChange('Approved', false); 
  }, []);

  const handleInputChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const SaveData = async () => {
    const docId = 'admin_' + Date.now().toString();
    await setDoc(doc(db, 'News', docId), {
      ...data,
      id: docId,
      userEmail: 'admin',
      DateTime: serverTimestamp(),
    });
  };

  const onSubmit = () => {


    SaveData()
      .then(() => {
        ToastAndroid.show('Article added successfully', ToastAndroid.SHORT);
        router.replace('/(tabs)/home');
      })
      .catch((error) => {
        console.error('Error adding article:', error);
        ToastAndroid.show('Error adding article', ToastAndroid.SHORT);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>

        <Pressable onPress={pickImage}>
          {!image ? (
            <Image
              source={require('../../assets/images/add_image.png')}
              style={styles.image}
            />
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}
        </Pressable>

        <View style={styles.text_container}>
          <TextInput
            style={styles.text}
            placeholder="Add Article Title"
            onChangeText={(value) => handleInputChange('Title', value)}
          />
        </View>

        <View style={styles.picker_container}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => {
              setSelectedCity(itemValue);
              handleInputChange('City', itemValue);
            }}
          >
            <Picker.Item label="Select a City" value={null} />
            {cityList.map((city, index) => (
              <Picker.Item label={city.name} value={city.name} key={index} />
            ))}
          </Picker>
        </View>

        <View style={styles.picker_container}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => {
              setSelectedCategory(itemValue);
              handleInputChange('Category', itemValue);
            }}
          >
            <Picker.Item label="Select a Category" value={null} />
            {categoriesList.map((category, index) => (
              <Picker.Item label={category.name} value={category.name} key={index} />
            ))}
          </Picker>
        </View>

        <View style={styles.text_container_big}>
          <TextInput
            style={styles.text}
            placeholder="Add Text"
            multiline
            onChangeText={(value) => handleInputChange('Text', value)}
          />
        </View>

        <TouchableOpacity style={styles.button_s} onPress={onSubmit}>
          <Text style={styles.text_s}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
