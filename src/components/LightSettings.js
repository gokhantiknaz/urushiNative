import {Dimensions, Image, ImageBackground, StatusBar, View, StyleSheet, Text, TextInput, Button, Pressable, TouchableOpacity, Alert, ScrollView, Linking} from "react-native";
import images from "../images/images";
import React, {useContext, useEffect, useState} from "react";
import {MythContext} from "../../store/myth-context";
import {useTranslation} from "react-i18next";
import {clearStorage, getAllKeys, getData, removeItem, saveData} from "../../data/useAsyncStorage";
import ImageSelect from "./ImagePicker";
import * as ImagePicker from "expo-image-picker";
import {findArrayElementById} from "../utils";
import {Models} from "../../data/Model";
import {BleContext} from "../../store/ble-context";
import {Button_1} from "./export";
import {showMessage} from "react-native/Libraries/Utilities/LoadingView";

const width = Dimensions.get('window').width;
const LightSettings = (props) => {

    const ctx = useContext(MythContext);
    const bleCtx = useContext(BleContext);
    const [name, setName] = useState("");
    const [selectedAquarium, setSelectedAquarium] = useState({});
    const [t] = useTranslation();
    const [image, setImage] = useState(null);
    const [imageUri, setImageUri] = useState('');
    const [modelName, setModelName] = useState("IKIGAI-STANDART")

    const styles = {
        app: {
            flex: 2, // the number of columns you want to devide the screen into
            marginHorizontal: "auto",
            marginVertical: "auto"
        },
        row: {
            flexDirection: "row",
            marginTop: 10
        },
        "1col": {
            flex: 2
        },
        "2col": {
            flex: 3
        },
        "3col": {
            flex: 4
        },
        "text": {
            color: "white",
            marginTop: 10,
            marginLeft: 10,
            marginEnd: 20
        },
        "imagepicker": {
            flex: 1,
            width: width
        },
    };

    useEffect(() => {
        getData("aquariumList").then(result => {
            let selected = result.filter(a => a.name === ctx.aquarium.name)[0];
            setSelectedAquarium(selected);

            if (selected.deviceList.length > 0) {
                let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");
                let subModel = findArrayElementById(model.SubModels, ctx.aquarium.submodelId ?? ctx.aquarium.modelId, "id");
                setModelName(model?.name + '-' + subModel?.Name);
            }
        });

        bleCtx.getBleManagerConnectedDevices().then(devices => {
            devices.forEach(x => {
                if (ctx.aquarium.deviceList.filter(a => a.id == x.id).length > 0) {
                    let serviceid = ctx.aquarium.deviceList.filter(a => a.id == x.id)[0].serviceUUIDs[0];
                    let temperatureData = [101, 5, 102];
                    bleCtx.sendDatatoDevice(x, temperatureData, null, serviceid);
                }
            });
        });

    }, [])

    useEffect(() => {
        if (bleCtx.receviedData && bleCtx.receviedData.length > 0) {
            showMessage("temprature:" + bleCtx.receviedData.split('#')[0].toString() + "°C", "load")
        }
    }, [bleCtx.receviedData])
    const Col = ({numRows, children}) => {
        return (
            <View style={styles[`${numRows}col`]}>{children}</View>
        )
    }

    const Row = ({children}) => (
        <View style={styles.row}>{children}</View>
    )
    const save = async () => {

        getData("aquariumList").then(result => {
            let selected = findArrayElementById(result, ctx.aquarium.name, "name");
            let index = result.findIndex(x => x.id == selected.id);
            let tempList = [...result];
            tempList[index] = selectedAquarium;

            removeItem("aquariumList").then(res => {
                saveData("aquariumList", tempList).then(resX => {
                    Alert.alert(t('Success'), t('Success'));
                    ctx.setAquarium(selectedAquarium);
                    props.navigation.goBack();
                });
            });
        });
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
                                                                   mediaTypes: ImagePicker.MediaTypeOptions.All,
                                                                   allowsEditing: true,
                                                                   aspect: [4, 3],
                                                                   quality: 1,
                                                                   base64: true
                                                               });
        // console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageUri(result.assets[0].uri);
            setSelectedAquarium({...selectedAquarium, image: result.assets[0].base64});
        }
    };

    return (
        <ImageBackground style={{flex: 1}} source={images.background}>
            <StatusBar barStyle={'auto'}></StatusBar>
            <View style={styles.app}>
                <Row>
                    <Col numRows={1}>
                        <TouchableOpacity onPress={pickImage}>
                            {selectedAquarium.image ?
                                <Image source={{uri: `data:image/png;base64,${selectedAquarium.image}`}} style={{height: 300, width: Dimensions.get('window').width}}></Image> :
                                <Image source={images.newLogo} style={{height: 300, width: Dimensions.get('window').width}}></Image>
                            }
                        </TouchableOpacity>
                    </Col>
                </Row>

                <View style={{flexDirection: "row", marginTop: 10}}>
                    <View style={styles["2col"]}>
                        <Text style={styles.text}>{t("aquariumname")} :</Text>
                    </View>
                    <View style={styles["3col"]}>
                        <TextInput style={{color: 'white', backgroundColor: 'grey', marginLeft: 10}}
                                   value={selectedAquarium.name}
                                   onChangeText={(e) => {
                                       let tmp = {...selectedAquarium};
                                       tmp.name = e;
                                       setSelectedAquarium(tmp);
                                   }} placeholder={t('aquariumname')}></TextInput>
                    </View>
                </View>
                <Row>
                    <Col numRows={2}>
                        <Text style={styles.text}>{t("createddate")} :</Text>
                    </Col>
                    <Col numRows={3}>
                        <Text style={styles.text}>{new Date(selectedAquarium.createdDate).toLocaleDateString() ?? ''}</Text>
                    </Col>
                </Row>
                {/*<Row>*/}
                {/*    <Col numRows={2}>*/}
                {/*        <Text style={styles.text}>{t("devicenumber")}</Text>*/}
                {/*    </Col>*/}
                {/*    <Col numRows={3}>*/}
                {/*        <Text style={styles.text}>{selectedAquarium.deviceList?.length}</Text>*/}
                {/*    </Col>*/}
                {/*</Row>*/}

                <Row>
                    <Col numRows={2}>
                        <Text style={styles.text}>{t('modelName')}</Text>
                    </Col>
                    <Col numRows={3}>
                        <Text style={styles.text}>{modelName}</Text>
                    </Col>
                </Row>
                {/*<Row>*/}
                {/*    <Col numRows={1}>*/}
                {/*        <Text style={styles.text}>{t('shareinsta')}</Text>*/}
                {/*    </Col>*/}
                {/*    <Col numRows={2}>*/}
                {/*        <Image source={images.insta} style={{height: 50, width: 50}}/>*/}
                {/*    </Col>*/}

                {/*</Row>*/}

                <Row>
                    <Col numRows={1}>
                        <Text style={[styles.text, {alignSelf: "center"}]}></Text>
                    </Col>
                </Row>

                {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                {/*    <View style={{flex: 1, height: 1, backgroundColor: 'white'}}/>*/}
                {/*    <View>*/}
                {/*        <Text style={{width: 170, textAlign: 'center', color: 'white'}}>{t("devicenumber")}</Text>*/}
                {/*    </View>*/}
                {/*    <View style={{flex: 1, height: 1, backgroundColor: 'white'}}/>*/}
                {/*</View>*/}


                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'white'}}/>
                    <View>
                        <Text style={{width: 170, textAlign: 'center', color: 'rgb(253,192,41)'}}
                              onPress={() => {props.navigation.navigate("temperatureSettings")}}>
                            {t("devicedetail")}
                        </Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'white'}}/>
                </View>

                {/*<ScrollView>*/}
                {/*    <Row>*/}
                {/*        <Col numRows={3}>*/}
                {/*            <Image source={images.newLogo} style={{height: 25, width: 80, alignSelf: "center"}}></Image>*/}
                {/*            <Text style={[styles.text, {fontSize: 9, marginLeft: 15}]}>{"Device Name"}</Text>*/}
                {/*            <Text style={styles.text}>{"Sıcaklık:--"}</Text>*/}
                {/*        </Col>*/}

                {/*        <Col numRows={3}>*/}
                {/*            <Image source={images.newLogo} style={{height: 25, width: 80, alignSelf: "center"}}></Image>*/}
                {/*            <Text style={[styles.text, {fontSize: 9, marginLeft: 15}]}>{"Device Name"}</Text>*/}
                {/*            <Text style={styles.text}>{"Sıcaklık:--"}</Text>*/}
                {/*        </Col>*/}

                {/*        <Col numRows={3}>*/}
                {/*            <Image source={images.newLogo} style={{height: 25, width: 80, alignSelf: "center"}}></Image>*/}
                {/*            <Text style={[styles.text, {fontSize: 9, marginLeft: 15}]}>{"Device Name"}</Text>*/}
                {/*            <Text style={styles.text}>{"Sıcaklık:--"}</Text>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</ScrollView>*/}
                <Row>
                    <Col numRows={1}>
                        <View style={{
                            width: width,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "5%",
                            marginTop: 20
                        }}>
                            <Button_1 title={t("save")} onPress={save}></Button_1>
                        </View>
                    </Col>
                </Row>
            </View>
        </ImageBackground>
    );
}
export default LightSettings;
