import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import { FlatList } from 'react-native';
import CartCard from './CartCard';
import BookCard from './BookCard';


const Home = ({ navigation }: any) => {

    const [data, setData] = useState<any>([])
    const [fixData, setFixData] = useState<any>([])
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = async () => {
        const resp = await fetch("https://api.itbook.store/1.0/new");
        let response = await resp.json();
        console.log(response)
        setData(response?.books)
        setFixData(response?.books)
    }

    const filterBooks = (val: any) => {
        let filteredBooks = fixData;
        setData(filteredBooks.filter((item: any) => {
            let comp1 = val.toLowerCase();
            let comp2 = item?.title?.toLowerCase();
            return comp2.includes(comp1)
        }));
    }

    return (
        <View style={{ height: "100%", backgroundColor: "#000000" }}>
            <Text style={{ color: "#ffffff", fontSize: 30, alignSelf: "center", marginTop: 20 }}>BOOK STORE</Text>
            <TextInput
                placeholder='Search Book'
                style={{ color: "#ffffff", paddingVertical: 10, marginHorizontal: 25, marginVertical: 10, borderColor: "#373737", borderWidth: 1, borderRadius: 40, paddingHorizontal: 20 }}
                placeholderTextColor={"#aaaaaa"}
                onChangeText={(value: any) => {
                    filterBooks(value)
                }}
            />
            <FlatList
                data={data}
                renderItem={(item) => { return (<BookCard data={item} navigation={navigation} />) }}
            />
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#000000" }}>
                <TouchableOpacity style={{ width: "90%", borderRadius: 50, backgroundColor: "#575737", paddingVertical: 10, paddingHorizontal: 20, alignItems: "center", marginVertical: 15 }} onPress={()=>{navigation.navigate("Cart")}}>
                    <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold" }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>



        // <>
        //   <BookDetails/>
        // </>

        // <CartCard/>
    )
}

export default Home;