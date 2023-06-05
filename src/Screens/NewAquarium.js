import React, {useEffect, useId, useState} from "react";
import {View, TextInput, Button, StyleSheet, Text, Alert, Dimensions, ImageBackground, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";

import Button_1 from "../components/button1";
import firebaseConfig from "../firebase/firebaseConfig";
import {db, collection, addDoc} from "../firebase/firebase-utilities";
import DeviceList from "../components/DeviceList";
import ImageSelect from "../components/ImagePicker";
import {clearStorage, getData, removeItem, saveData} from "../../data/useAsyncStorage";
import {mergeData} from "../../data/useAsyncStorage/useAsyncStorage";
import images from "../images/images";
import colors from "../components/colors";
import {useTranslation} from "react-i18next";

import Dialog from "react-native-dialog";
import {StatusBar} from "expo-status-bar";

const width = Dimensions.get('window').width;
const NewAquarium = () => {
    const [name, setName] = useState("");

    const [deviceList, setDeviceList] = useState([]);
    const [image, setImage] = useState(null);
    const [imageUri, setImageUri] = useState('');
    const [t] = useTranslation();

    const [showModal, setShowModal] = useState(false);

    const navigation = useNavigation();

    const id = useId();

    const save = () => {
        try {

            let myAquarium = {
                id: id,
                name: name,
                image: image,
                imageUri: imageUri,
                modelId: 1,
                submodelId: 1,
                createdDate: new Date()
            };
            myAquarium.deviceList = deviceList;

            getData("aquariumList").then(list => {
                if (list == null) {
                    let newlist = [];
                    newlist.push(myAquarium);
                    saveData("aquariumList", newlist).then(res => {

                    });
                } else {
                    list.push(myAquarium);
                    removeItem("aquariumList").then(res => {
                        saveData("aquariumList", list);
                    });
                }
            });

            setShowModal(true);
        } catch (e) {
            console.log(e);
            alert('Failed to save the data to the storage')
        }
    }
    if (showModal) {
        return (<View style={styles.dialog}>

            <Dialog.Container visible={showModal}>
                <Dialog.Title></Dialog.Title>
                <Dialog.Description>
                    {t("Success")}
                </Dialog.Description>
                <Dialog.Button label="Ok" onPress={() => {
                    setShowModal(false);
                    navigation.goBack();
                }}/>
            </Dialog.Container>
        </View>);
    }
    return (

        // <ImageBackground source={{uri: `data:image/png;base64,${image}`}}  style={{flex: 1}}>
        <ImageBackground source={images.background} style={{flex: 1}}>
            <View style={styles.container}>
                <StatusBar hidden={true}></StatusBar>
                <View style={styles.newAquarium}>
                    <Text style={styles.SignUpLabel}>{t("newAquarium")}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Aquarium Name"
                        placeholderTextColor={"#ffffff"}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.imagepicker}>
                    <ImageSelect setImage={setImage} setImageUri={setImageUri}></ImageSelect>
                </View>

                <View style={styles.deviceList}>
                    <DeviceList setDeviceList={setDeviceList}></DeviceList>
                </View>
                <View style={styles.savebutton}>
                    <Button_1 title="Save" onPress={save}/>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         justifyContent: "space-between",
                                         alignItems: "center",
                                         paddingHorizontal: "10%"
                                     },
                                     newAquarium: {
                                         width: "100%",
                                         justifyContent: "center",
                                         alignItems: "center",
                                         alignSelf: "center",
                                         top: '10%',
                                         // backgroundColor: "red",
                                     },
                                     imagepicker: {
                                         flex: 1,
                                         width: width
                                     },
                                     deviceList: {
                                         flex: 2,
                                         width: width,
                                         alignItems:"center"
                                     },
                                     savebutton: {
                                         width: width,
                                         justifyContent: "center",
                                         alignItems: "center",
                                         bottom: "5%"
                                     },
                                     SignUpLabel: {
                                         fontSize: 30,
                                         marginBottom: 30,
                                         fontFamily: 'OpenSans_800ExtraBold',
                                         color: "#003cd6",
                                     },
                                     input: {
                                         width: "100%",
                                         borderWidth: 1,
                                         borderColor: "#ccc",
                                         borderRadius: 10,
                                         paddingHorizontal: 16,
                                         paddingVertical: 12,
                                         marginBottom: 10,
                                         // borderRadius: 12,
                                         backgroundColor: "black",
                                         fontSize: 15,
                                         fontFamily: 'OpenSans_400Regular',
                                         color: "#ffffff",
                                     },
                                     dialog: {
                                         flex: 1,
                                         backgroundColor: "#fff",
                                         alignItems: "center",
                                         justifyContent: "center",
                                     },
                                 });

export default NewAquarium;
