import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * AlertComponent displays a visual alert with a title, description, and city info.
 */
export default function AlertComponent({alert}) {
  const router = useRouter();

  return (
    <View
      style={{
        height: 100,
        padding: 20,
        marginBottom: 10,
        backgroundColor: "rgb(255, 51, 0)",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center", 
      }}
    >
      <Ionicons name="alert-circle" size={50} color="white" />
      
      <View style={{ marginLeft: 20 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "Manrope-Bold",
            color: "#fff",
            marginTop: 5,
          }}
        >
          {alert.Title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#fff",
          }}
        >
          {alert?.Description}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#fff",
          }}
        >
          {alert?.City}
        </Text>
      </View>
    </View>
  );
}
