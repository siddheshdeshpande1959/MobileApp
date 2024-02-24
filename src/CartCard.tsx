import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { Image } from 'react-native';

const CartCard = ({data}:any) => {
    
    const bookData = data;
    return (
        <View style={{ backgroundColor: "#272727", margin: 10, padding: 5, borderRadius: 10, height: 120, justifyContent: "center" }}>
            <View style={{ flexDirection: "row", margin: 4 }}>
                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                    <Image
                        style={{ height: 100, backgroundColor: "#393939" }}
                        source={{
                            uri: bookData?.image,
                        }}
                    />
                </View>
                <View style={{ flex: 3, flexDirection: 'column' }}>
                    <Text style={{ marginHorizontal: 15, marginBottom: 10, color: "#fafafa", fontSize: 18, fontWeight: "bold", flex: 4 }}>{(bookData?.title).substring(0, 54)}...</Text>
                    <Text style={{ marginHorizontal: 15, marginTop: 14, color: "#fafafa", fontSize: 14, fontWeight: "500" }}>
                        Price:
                        <Text style={{ marginHorizontal: 15, color: "#79db90", fontSize: 20, fontWeight: "bold", flex: 2 }}>{" "}{bookData?.price}</Text></Text>
                </View>
            </View>
        </View>
    )
}

export default CartCard;