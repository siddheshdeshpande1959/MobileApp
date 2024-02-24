import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookDetail from './src/BookDetail';
import Home from './src/Home';
import OrderPlaced from './src/OrderPlaced';
import Cart from './src/Cart';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BookDetail" component={BookDetail} />
        <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
 )
}

export default App;