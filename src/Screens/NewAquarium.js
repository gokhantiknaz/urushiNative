import React, {useContext, useEffect, useState} from "react";
import {View, TextInput, Button, StyleSheet, Text, Alert, Dimensions, ImageBackground, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Button_1 from "../components/button1";
import DeviceList from "../components/DeviceList";
import ImageSelect from "../components/ImagePicker";
import { getData, removeItem, saveData} from "../../data/useAsyncStorage";
import images from "../images/images";
import {useTranslation} from "react-i18next";
import {StatusBar} from "expo-status-bar";
import {showMessage} from "react-native/Libraries/Utilities/LoadingView";
import {findArrayElementById} from "../utils";
import {Models} from "../../data/Model";
import {MythContext} from "../../store/myth-context";

const width = Dimensions.get('window').width;
const NewAquarium = () => {
    const [name, setName] = useState("");
    const [deviceList, setDeviceList] = useState([]);
    const [image, setImage] = useState(null);
    const [imageUri, setImageUri] = useState('');
    const [t] = useTranslation();
    const navigation = useNavigation();
    const ctx = useContext(MythContext);
    const [aquariumlist, setAquariumList] = useState([]);

    useEffect(() => {
        getData("aquariumList").then(list => {
            console.log(list);
            if (list == null) {
                setAquariumList([]);
            } else {
                setAquariumList(list);
            }
        });
    }, [])
    const save = () => {

        try {
            let myAquarium = {
                id: aquariumlist.length + 1,
                name: name,
                image: image,
                imageUri: imageUri,
                modelId: 1,
                submodelId: 1,
                createdDate: new Date()
            };

            if (deviceList.length > 0) {
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
            }
            myAquarium.deviceList = deviceList;

            let tmpList = [...aquariumlist];
            ;
            if (tmpList.length == 0) {
                tmpList.push(myAquarium);
                saveData("aquariumList", tmpList).then(res => {
                    Alert.alert(t("Success"), t("Success"));
                    navigation.goBack();
                });
            } else {
                tmpList.push(myAquarium);
                removeItem("aquariumList").then(res => {
                    saveData("aquariumList", tmpList).then(res => {
                        Alert.alert(t("Success"), t("Success"));
                        navigation.goBack();
                    });
                    ;
                });
            }
            // getData("aquariumList").then(list => {
            //     if (list == null) {
            //         let newlist = [];
            //         newlist.push(myAquarium);
            //         saveData("aquariumList", newlist).then(res => {
            //             Alert.alert(t("Success"), t("Success"));
            //             navigation.goBack();
            //         });
            //     } else {
            //         list.push(myAquarium);
            //         removeItem("aquariumList").then(res => {
            //             saveData("aquariumList", list);
            //             navigation.goBack();
            //         });
            //     }
            // });

        } catch (e) {
            console.log("new aquarium error:", e);
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
                                         color: 'rgb(223,135,29)',
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
