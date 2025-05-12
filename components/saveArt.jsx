import React from 'react';
import { Pressable, View, ToastAndroid } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig'; 
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

/**
 * SaveArtAdmin component allows the admin to approve or delete a news article.
 */
export default function SaveArtAdmin({ news }) {
  const router = useRouter(); // Add router for navigation

  // Function to approve the article
  const ApproveArticle = async () => {
    try {
      const newsRef = doc(db, 'News', news.id);
      await updateDoc(newsRef, {
        Approved: true,
      });
      ToastAndroid.show('Article approved successfully', ToastAndroid.SHORT);
      router.replace('/(tabs)/home'); // Redirect to Home
    } catch (error) {
      console.error('Error approving article:', error);
      ToastAndroid.show('Error approving article', ToastAndroid.SHORT);
    }
  };

  // Function to delete the article
  const DeleteArticle = async () => {
    console.log('Deleting article with ID:', news); // Debugging line
    try {
      const newsRef = doc(db, 'News', news.id);
      console.log('Deleting article with ID:', news); // Debugging line
      await deleteDoc(newsRef);
      ToastAndroid.show('Article deleted successfully', ToastAndroid.SHORT);
      router.replace('/(tabs)/home'); // Redirect to Home
    } catch (error) {
      console.error('Error deleting article:', error);
      ToastAndroid.show('Error deleting article', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {/* Approve Button */}
      <Pressable onPress={ApproveArticle}>
        <MaterialCommunityIcons name="bookmark-check-outline" size={40} color="green" />
      </Pressable>

      {/* Delete Button */}
      <Pressable onPress={DeleteArticle}>
        <MaterialCommunityIcons name="delete-outline" size={40} color="red" />
      </Pressable>
    </View>
  );
}
