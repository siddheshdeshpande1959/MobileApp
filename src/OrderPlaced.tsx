import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const OrderPlaced = ({ navigation }: any) => {
    return (<>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
            <View style={{ backgroundColor: "#373737", height: 400, width: 350, borderWidth: 1, borderRadius: 40, alignItems: "center", borderColor: "green" }}>

                <View style={{ marginTop: 30,marginBottom:50 }}><AntDesign name="checkcircle" color={'#05ff9f'} size={80} /></View>
                <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fafafa" }}>Order Placed !</Text>
                <Text style={{ fontSize: 15, textAlign: "center", color: "#fafafa", fontStyle: "italic", margin: 15 }}>Your Order Was Placed Successfully. It is Now Very Easy To Reach The Best Quality Among All The Products On The Internet !</Text>
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate("Home") }} style={{ backgroundColor: "#05ff9f",marginTop:30,borderRadius:30 }}>
                        <Text style={{ padding: 15, color: "#000000", borderRadius: 30, fontWeight: "700" }}>ORDER MORE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </>)
}

export default OrderPlaced;