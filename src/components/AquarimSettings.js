import {Dimensions, Image, ImageBackground, StatusBar, View, StyleSheet, Text, TextInput, Button, Pressable, TouchableOpacity} from "react-native";
import images from "../images/images";
import React, {useContext, useEffect, useState} from "react";
import {MythContext} from "../../store/myth-context";
import {useTranslation} from "react-i18next";
import {clearStorage, getAllKeys, getData} from "../../data/useAsyncStorage";
import ImageSelect from "./ImagePicker";
import * as ImagePicker from "expo-image-picker";

const width = Dimensions.get('window').width;
const AquarimSettings = (props) => {

    const ctx = useContext(MythContext);
    const [name, setName] = useState("");
    const [selectedAquarium, setSelectedAquarium] = useState({});
    const [t] = useTranslation();
    const [image, setImage] = useState(null);
    const [imageUri, setImageUri] = useState('');

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
        });

    }, [])
    const Col = ({numRows, children}) => {
        return (
            <View style={styles[`${numRows}col`]}>{children}</View>
        )
    }

    const Row = ({children}) => (
        <View style={styles.row}>{children}</View>
    )
    const save = async () => {
        // let selectedAquarium = ctx.aquarium;
        // selectedAquarium.name = name;
        let datas = await getAllKeys()
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
            setSelectedAquarium({...selectedAquarium,image:result.assets[0].base64});
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
                                <Image source={images.deviceIcon} style={{height: 300, width: Dimensions.get('window').width}}></Image>
                            }
                        </TouchableOpacity>

                    </Col>
                </Row>
                <View style={{flexDirection: "row", marginTop: 10}}>
                    <View style={styles["1col"]}>
                        <Text style={styles.text}>{t("aquariumname")} :</Text>
                    </View>
                    <View style={styles["2col"]}>
                        <TextInput style={{color: 'white', backgroundColor: 'grey'}}
                                   value={selectedAquarium.name}
                                   onChangeText={setName} placeholder={t('aquariumname')}></TextInput>
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
                <Row>
                    <Col numRows={2}>
                        <Text style={styles.text}>{t("devicenumber")}</Text>
                    </Col>
                    <Col numRows={3}>
                        <Text style={styles.text}>{selectedAquarium.deviceList?.length}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col numRows={1}>
                        <Text style={styles.text}>{t('shareinsta')}</Text>
                    </Col>
                    <Col numRows={2}>
                        <Image source={images.insta} style={{height: 50, width: 50}}/>
                    </Col>

                </Row>
                <Row>
                    <Col numRows={1}></Col>
                </Row>
                <Row>
                    <Col numRows={1}>
                        <Button title={t("save")} onPress={save}></Button>
                    </Col>
                </Row>
            </View>
        </ImageBackground>
    );
}
export default AquarimSettings;