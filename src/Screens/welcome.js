import React, {useEffect, useState} from "react";
import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Button_1 from "../components/button1";
import {FlatListItemSeparator} from "../components/deviceList";

const Welcome_screen = () => {

    const navigation = useNavigation();

    useEffect(() => {}, []);
    const [aquarimList, setAquarimList] = useState([{id: 1, name: "My Aquarim", devices: [{name: "x", deviceId: "1"}]}]);


    const renderItem = (data) => {
        return (
            <TouchableOpacity onPress={() => {alert("Seçildi")}}>
                <Text style={{color: "white"}}> {data.item.name} ({data.item.devices.length})</Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            <View style={{width: "100%", paddingTop: "20%", alignItems: "center",alignContent:"center"}}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={require("../../assets/icon.png")}
                />
            </View>

            <View style={styles.containerList}>
                <Text style={{color:"red",paddingBottom:"10%"}}>Select Aquarium</Text>

                <FlatList data={aquarimList} renderItem={(data) => renderItem(data)}
                          keyExtractor={item => item.id.toString()}
                          ItemSeparatorComponent={FlatListItemSeparator}>
                </FlatList>
            </View>
            <View style={styles.container1}>
                <Button_1
                    onPress={() => navigation.navigate("NewAquarium")}
                    title={'New Aquarium'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
                                     container: {
                                         flex: 3,
                                         flexDirection: 'column',
                                         justifyContent: "space-around",
                                         alignItems: "center",
                                         backgroundColor: 'black'
                                     },
                                     containerList: {
                                         paddingTop: '5%',
                                         paddingHorizontal: '10%',
                                         flex: 4,
                                     },
                                     container1: {

                                         width: '100%',
                                         paddingTop: '5%',
                                         paddingHorizontal: '10%'
                                     },
                                     image: {
                                         width: "90%",
                                         height: "40%"
                                     },
                                 });

export default Welcome_screen;
