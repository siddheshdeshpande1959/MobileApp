import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import { Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BookDetail = ({ navigation, route }: any) => {
    const [isbn, setIsbn] = useState(route?.params?.isbn)
    const stars = [1, 2, 3, 4, 5];
    const [bookData, setBookData] = useState<any>([])

    useEffect(() => {
        getBook();
    }, [])

    const getBook = async () => {
        const resp = await fetch(`https://api.itbook.store/1.0/books/${isbn}`);
        let response = await resp.json();
        console.log(response)
        setBookData(response)
    }


    const addToCart = async () => {
        try {
            const existingItems = await AsyncStorage.getItem('cartItems');
            let updatedCartItems = [];

            if (existingItems) {
                updatedCartItems = JSON.parse(existingItems);
            }
            updatedCartItems.push(bookData);
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

            Alert.alert('Book added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart: ', error);
        }
    };

    return (
        <>
            <ScrollView style={{ backgroundColor: "#272727", padding: 15, height: "100%" }}>
                {bookData?.image != null ?
                    <Image
                        style={{ height: 450, backgroundColor: "#393939" }}
                        source={{
                            uri: bookData?.image,
                        }}
                    />
                    :
                    <View style={{ height: 450, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={"large"} color={"#008b91"} />
                    </View>
                }
                <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 15 }}>
                    {
                        stars.map((item, index) => {
                            if (item <= Number(bookData?.rating))
                                return (<AntDesign name={"star"} color={"#f0a95d"} size={18}/>)
                        })
                    }
                </View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 10, color: "#fafafa", fontSize: 22, fontWeight: "bold", flex: 1 }}>Title:- {bookData?.title}</Text>
                        <Text style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 10, color: "#fafafa", fontSize: 20, fontWeight: "200", textAlign: "right" }}>{"["}{bookData?.year}{"]"}</Text>
                    </View>
                    <Text style={{ marginHorizontal: 15, marginBottom: 10, color: "#79db90", fontSize: 22, fontWeight: "bold" }}>Price:- {bookData?.price}</Text>
                    <Text style={{ marginHorizontal: 15, color: "#fafafa", fontSize: 14, fontWeight: "300" }}>Subtitle:- {bookData?.subtitle}</Text>
                    <Text style={{ marginHorizontal: 15, color: "#fafafa", fontSize: 14, fontWeight: "300", marginTop: 6 }}>Author:- {bookData?.authors}</Text>
                    <Text style={{ marginHorizontal: 15, color: "#fafafa", fontSize: 14, fontWeight: "300", marginTop: 6 }}>Publisher:- {bookData?.authors}</Text>
                    <Text style={{ marginHorizontal: 15, color: "#fafafa", fontSize: 14, fontWeight: "300", marginTop: 6 }}>Language:- {bookData?.language}</Text>
                    <Text style={{ marginHorizontal: 15, color: "#fafafa", fontSize: 14, fontWeight: "300", marginTop: 6 }}>ISBN:- {bookData?.isbn13}</Text>
                    <Text style={{ marginHorizontal: 15, color: "#fafafa", fontSize: 14, fontWeight: "300", marginTop: 6 }}>Pages:- {bookData?.pages}</Text>
                    <Text style={{ marginHorizontal: 15, color: "#fafafa", fontSize: 14, fontWeight: "300", marginTop: 6 }}>Description:- {bookData?.desc}</Text>
                </View>

                <View style={{ height: 100 }} />

            </ScrollView>
            <View style={{ flexDirection: "row", height: 50, borderTopColor: "#fafafa", borderTopWidth: 1, position: "absolute", bottom: 0, zIndex: 100, width: "100%", backgroundColor: "#474747" }}>
                <TouchableOpacity style={{ flex: 1, borderRightWidth: 1, borderRightColor: "#fafafa", alignItems: "center", justifyContent: "center" }} onPress={async() => {await addToCart(); navigation.navigate("Cart") }}>
                    <Text style={{ color: "#fafafa", fontSize: 16, fontWeight: "bold" }}>Buy Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }} onPress={addToCart}>
                    <Text style={{ color: "#fafafa", fontSize: 16, fontWeight: "bold" }}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default BookDetail;



