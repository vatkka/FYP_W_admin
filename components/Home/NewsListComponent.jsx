import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

/**
 * NewsListComponent displays a news item in a card-like format with an image, title, and
 * a clickable area that navigates to the fullscreen news page when tapped.
 * 

 */
export default function NewsListComponent({news}) {
  const router = useRouter(); // Router for navigation

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(news.DateTime); // Log the date/time of the news when clicked
        router.push({
          pathname: '/news_fullscreen', // Navigate to the full-screen news page
          params: news // Pass the news data to the next screen
        });
      }}
      style={{
        height: 210,
        borderRadius: 16,
        marginBottom: 10,
        backgroundColor: "rgb(35, 39, 46)",
      }}
    >
      <Image
        source={{ uri: news.imageUrl }}
        style={{
          width: "100%",
          height: 150,
          borderRadius: 16,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      
      <Text
        style={{
          fontSize: 30,
          fontWeight: "Manrope-Bold",
          color: "#fff",
          marginTop: 5,
          padding: 10,
        }}
      >
        {news.Title}
      </Text>
    </TouchableOpacity>
  );
}
