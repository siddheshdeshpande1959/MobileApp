import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import CartCard from './CartCard';

const Cart = ({ route, navigation }: any) => {
    const [cartItems, setCartItems] = useState([]);
    const [total,setTotal]=useState(0);
    console.log("cartItems:::", cartItems)

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const storedCartItems = await AsyncStorage.getItem('cartItems');
                if (storedCartItems) {
                    setCartItems(JSON.parse(storedCartItems));
                }
            } catch (error) {
                console.error('Error fetching cart items: ', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const storedCartItems = await AsyncStorage.getItem('cartItemsBook');
                if (storedCartItems) {
                    setCartItems(JSON.parse(storedCartItems));
                }
            } catch (error) {
                console.error('Error fetching cart items: ', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(()=>{
        setTotal(0);
        let convert:any=0;
        cartItems.map((item:any)=>{
            let price=parseFloat(item?.price?.substring(1,5));
            convert=convert+price;
    })
    setTotal(convert)
},[cartItems])

    return (<View style={{backgroundColor:"#000000",height:"100%"}}>
        <Text style={{color:"#fafafa",fontSize:30,marginHorizontal:20,marginVertical:15,textAlign:"center"}}>Proceed To Pay</Text>
        <FlatList
            data={cartItems}
            renderItem={({ item }: any) => { return <CartCard data={item} /> }}
        />
        
        <View style={{alignItems:"center",backgroundColor:"#272727",borderTopRightRadius:30,borderTopLeftRadius:30}}>
            <View style={{height:50,flexDirection:"row",justifyContent:"center",paddingHorizontal:40,alignItems:"center"}}>
                <Text style={{color:"#79db90",flex:1,textAlign:"left",fontSize:18}}>
                    {cartItems?.length} Items
                </Text>
                <Text style={{ color: "#fafafa", fontSize: 14, fontWeight: "500" }}>
                        Total Price:
                        <Text style={{ marginHorizontal: 15, color: "#79db90", fontSize: 20, fontWeight: "bold", flex: 2 }}>{" $"}{total.toFixed(2)}</Text></Text>
                
            </View>
            <TouchableOpacity style={{ width: "90%", borderRadius: 50, backgroundColor: "#575737", paddingVertical: 10, paddingHorizontal: 20, alignItems: "center", marginVertical: 15, justifyContent: "center"}} 
                onPress={async() => {
                    if(cartItems?.length>0){
                        await AsyncStorage.setItem('cartItems',"[]");
                    navigation.navigate("OrderPlaced") 
                    }
                    else{
                        navigation.navigate("Home")
                    }                    
                    }}>
                <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold" }}>{cartItems?.length>0?"Place Order":"Shop Now"}</Text>
            </TouchableOpacity>
        </View>

    </View>);

}

export default Cart;
