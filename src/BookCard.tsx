import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, Alert } from 'react-native';

const BookCard = ({ data, navigation }:any) => {
    const [cartItems, setCartItems] = useState([]);

    const bookData = data?.item;

    const addToCart = async (bookData:any) => {
        try {
            const existingItems = await AsyncStorage.getItem('cartItems');
            let updatedCartItems = [];

            if (existingItems) {
                updatedCartItems = JSON.parse(existingItems);
            }
            updatedCartItems.push(bookData);
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

            setCartItems(updatedCartItems);
            Alert.alert('Book added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart: ', error);
        }
    };

    return (
        <View style={{ backgroundColor: "#272727", margin: 10, padding: 5, borderRadius: 10 }}>
            <View style={{ flexDirection: "row", margin: 4 }}>
                <View style={{ flex: 1.5, justifyContent: "flex-start" }}>
                    <Image
                        style={{ height: 180, backgroundColor: "#393939" }}
                        source={{ uri: bookData?.image }}
                    />
                </View>
                <View style={{ flex: 3 }}>
                    <Text style={{ marginHorizontal: 15, marginTop: 20, marginBottom: 10, color: "#fafafa", fontSize: 18, fontWeight: "bold" }}>{bookData?.title}</Text>
                    <Text style={{ marginHorizontal: 15, color: "#fafafa", fontSize: 12, fontWeight: "300" }}>{bookData?.subtitle}</Text>
                    <Text style={{ marginHorizontal: 15, marginTop: 14, color: "#fafafa", fontSize: 14, fontWeight: "500" }}>
                        Price:
                        <Text style={{ marginHorizontal: 15, color: "#79db90", fontSize: 20, fontWeight: "bold" }}>{" "}{bookData?.price}</Text>
                    </Text>
                    <Text style={{ marginHorizontal: 15, marginTop: 14, color: "#fafafa", fontSize: 12, fontWeight: "500" }}>
                        ISBN:
                        <Text style={{ marginHorizontal: 15, color: "#fafafa", fontSize: 14, fontWeight: "300" }}>{"  "}{bookData?.isbn13}</Text>
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", height: 50, borderTopColor: "#353535", borderTopWidth: 1 }}>
                <TouchableOpacity style={{ flex: 1, borderRightWidth: 1, borderRightColor: "#353535", alignItems: "center", justifyContent: "center" }}
                    onPress={() => {
                        navigation.navigate("BookDetail", { isbn: bookData?.isbn13 })
                    }}
                >
                    <Text style={{ color: "#fafafa", fontSize: 16, fontWeight: "bold" }}>View More</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }} onPress={() => addToCart(bookData)}>
                    <Text style={{ color: "#fafafa", fontSize: 16, fontWeight: "bold" }}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BookCard;
