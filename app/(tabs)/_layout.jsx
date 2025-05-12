import { Pressable, Text } from 'react-native';
import { Link, Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Home() {
  return (
       <Tabs
       screenOptions={{
        tabBarStyle:{ backgroundColor: '#feeadd' },
        tabBarInactiveTintColor: '#95a5a6',
        tabBarActiveTintColor: '#e13f2a',}}
       >
        <Tabs.Screen name='home'
        options={{
            title:'Home',
             headerShown: false,
            tabBarIcon: ({color}) => (
              <AntDesign name="home" size={24} color="black" />
            )
            }}
        />



       </Tabs>      

  );
}