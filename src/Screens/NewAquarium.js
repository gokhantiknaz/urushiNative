import React, {useEffect, useId, useState} from "react";
import {View, TextInput, Button, StyleSheet, Text, Alert, Dimensions, ImageBackground, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";

import Button_1 from "../components/button1";
import firebaseConfig from "../firebase/firebaseConfig";
import {db, collection, addDoc} from "../firebase/firebase-utilities";
import DeviceList from "../components/DeviceList";
import ImageSelect from "../components/ImagePicker";
import {clearStorage, getAllKeys, getData, removeItem, saveData} from "../../data/useAsyncStorage";
import {mergeData} from "../../data/useAsyncStorage/useAsyncStorage";
import images from "../images/images";
import colors from "../components/colors";
import {useTranslation} from "react-i18next";

import Dialog from "react-native-dialog";
import {StatusBar} from "expo-status-bar";
import {showMessage} from "react-native/Libraries/Utilities/LoadingView";
import {findArrayElementById} from "../utils";
import {Models} from "../../data/Model";

const width = Dimensions.get('window').width;
const NewAquarium = () => {
    const [name, setName] = useState("");
    const [deviceList, setDeviceList] = useState([]);
    const [image, setImage] = useState(null);
    const [imageUri, setImageUri] = useState('');
    const [t] = useTranslation();
    const navigation = useNavigation();

    const id = useId();

    const save = () => {

        try {
            let myAquarium = {
                id: id,
                name: name,
                image: image,
                imageUri: imageUri,
                modelId: -1,
                submodelId: -1,
                createdDate: new Date()
            };


            let unique_values = deviceList
                .map((item) => item.serviceUUId).filter(
                    (value, index, current_value) => current_value.indexOf(value) === index
                );

            if (unique_values && unique_values.length > 1) {
                showMessage("Bir akvaryum için aynı model cihazları seçmeniz gerekmektedir");
                return;
            }

            let subModels = deviceList
                .map((item) => item.subModel).filter(
                    (value, index, current_value) => current_value.indexOf(value) === index
                );
            console.log("submodels:", subModels);
            if (subModels && subModels.length > 1) {
                showMessage("Bir akvaryum için aynı model cihazları seçmeniz gerekmektedir");
                return;
            }

            if (unique_values.length > 0 && subModels.length > 0) {
                let model = findArrayElementById(Models, unique_values[0], "serviceUUId");
                if (!model) {
                    return;
                }
                myAquarium.modelId = model.id;
                myAquarium.submodelId = subModels[0].subModel;
            }

            myAquarium.deviceList = deviceList;

            getData("aquariumList").then(list => {
                if (list == null) {
                    let newlist = [];
                    newlist.push(myAquarium);
                    saveData("aquariumList", newlist).then(res => {
                        Alert.alert(t("Success"), t("Success"));
                        navigation.goBack();
                    });
                } else {
                    list.push(myAquarium);
                    removeItem("aquariumList").then(res => {
                        saveData("aquariumList", list);
                        navigation.goBack();
                    });
                }
            });

        } catch (e) {
            console.log(e);
            alert('Failed to save the data to the storage')
        }
    }

    return (
        // <ImageBackground source={{uri: `data:image/png;base64,${image}`}}  style={{flex: 1}}>
        <ImageBackground source={images.background} style={{flex: 1}}>
            <StatusBar hidden={false}></StatusBar>
            <View style={styles.container}>
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
                                         top: '5%',
                                         // backgroundColor: "red",
                                     },
                                     imagepicker: {
                                         flex: 1,
                                         width: width
                                     },
                                     deviceList: {
                                         flex: 2,
                                         width: width,
                                         marginLeft: 50
                                     },
                                     savebutton: {
                                         width: width,
                                         justifyContent: "center",
                                         alignItems: "center",
                                         bottom: "5%"
                                     },
                                     SignUpLabel: {
                                         fontSize: 20,
                                         marginBottom: 30,
                                         fontFamily: 'OpenSans_800ExtraBold',
                                         color: "#5DB4C4",
                                     },
                                     input: {
                                         width: "100%",
                                         borderWidth: 1,
                                         borderColor: "#ccc",
                                         borderRadius: 10,
                                         paddingHorizontal: 16,
                                         paddingVertical: 12,
                                         marginBottom: 30,
                                         // borderRadius: 12,
                                         backgroundColor: "black",
                                         fontSize: 15,
                                         fontFamily: 'OpenSans_400Regular',
                                         color: "#ffffff",
                                     },

                                 });

export default NewAquarium;
