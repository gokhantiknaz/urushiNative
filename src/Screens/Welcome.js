import React, {useEffect, useState} from "react";
import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity, Pressable, ImageBackground, Dimensions} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Button_1 from "../components/button1";
import {FlatListItemSeparator} from "../components/DeviceList";
import colors from "../components/colors";
import {useTranslation} from "react-i18next";
import images from "../images/images";
import {clearStorage, getData, saveData} from "../../data/useAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome_screen = ({ navigation }) => {


    const LANGUAGES = [
        {code: "tr", label: "Türkçe"},
        {code: "en", label: "English"}
    ];
    // const navigation = useNavigation();

    React.useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
           getAquariums();
        });
        return focusHandler;
    }, [navigation]);

    const [t, i18n] = useTranslation();

    const [aquarimList, setAquarimList] = useState([]);


    getData("language").then((val) => {
        setLanguage(val);
    });
    const selectedLanguageCode = i18n.language;
    const setLanguage = (code) => {
        return i18n.changeLanguage(code);
    };

    const getAquariums = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const list = await getData("aquariumList");
            setAquarimList(list);
        } catch (error) {
            console.log(error);
        }
    };

    //useEffect(() => {getAquariums()}, [])
    // useEffect(() => {
    //     getAquariums()
    //     return () => {
    //     }
    //
    // }, [])

    const renderItem = (data) => {
        if (data.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]}/>;
        }
        return (
            <TouchableOpacity style={[styles.list, data.selectedClass]} onPress={() => {
                navigation.navigate("menu", {aquarium: aquarimList.find(obj => obj.id === data.item.id)})
            }}>
                <View style={styles.item}>
                    <Image source={{uri: `data:image/png;base64,${data.item.image}`}} style={{height: 60, width: 60}}></Image>
                    <Text style={{color: "white"}}>{data.item.name}</Text>
                    <Text style={{color: "white"}}></Text>
                </View>

            </TouchableOpacity>
        );
    }
    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({key: `blank-${numberOfElementsLastRow}`, empty: true, id: "", name: ""});
            numberOfElementsLastRow++;
        }
        return data;
    };

    return (
        <ImageBackground source={images.background} style={{alignContent: "center", flex: 1, alignItems: "center"}}>
            <View style={styles.container}>
                <View style={styles.Image}>
                    <Image
                        resizeMode="contain"
                        source={require("../../assets/iconTrans.png")}
                    />
                </View>
                <View style={styles.containerLang}>
                    {LANGUAGES.map((language) => {
                        const selectedLanguage = language.code === selectedLanguageCode;
                        return (
                            <Pressable
                                key={language.code}
                                disabled={selectedLanguage}
                                onPress={() => {
                                    setLanguage(language.code);
                                    saveData("language", language.code);
                                }}>
                                <Text style={[selectedLanguage ? styles.selectedText : styles.text]}>
                                    {language.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
                <View style={styles.containerList}>
                    <Text style={{color: colors.test5, paddingBottom: "10%"}}>{t('selectaquarium')}</Text>
                    {aquarimList &&

                        <FlatList
                            data={formatData(aquarimList, numColumns)}
                            ItemSeparatorComponent={FlatListItemSeparator}
                            renderItem={item => renderItem(item)}
                            keyExtractor={item => item.id.toString()}
                            numColumns={numColumns}>
                        </FlatList>
                    }
                </View>
                <View style={styles.button}>
                    <Button_1
                        onPress={() => navigation.navigate("NewAquarium")}
                        title={t('newAquarium')}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

const width = Dimensions.get('window').width;
const numColumns = 3;
const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         justifyContent: "space-around",
                                         alignItems: "center",
                                     },
                                     Image: {
                                         flex: 2, width: width, paddingTop: "20%", alignItems: "center"
                                     },
                                     containerLang: {},
                                     button: {
                                         width: width,
                                         paddingTop: '5%',
                                         paddingHorizontal: '5%',
                                         alignItems: "center"
                                     },
                                     containerFlag: {
                                         paddingTop: '15%'
                                     },
                                     containerList: {
                                         flex: 9,
                                         width: width,
                                         paddingTop: '5%',
                                         paddingHorizontal: '5%',
                                         alignItems: "center"
                                     },
                                     text: {
                                         fontSize: 15,
                                         color: colors.white,
                                         paddingVertical: 4,
                                     },
                                     selectedText: {
                                         fontSize: 15,
                                         fontWeight: "600",
                                         color: "tomato",
                                         paddingVertical: 4,
                                     },
                                     item: {
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                         width: Dimensions.get('window').width / numColumns, // approximate a square
                                     },
                                     itemInvisible: {
                                         backgroundColor: 'transparent',
                                     },
                                     itemText: {
                                         color: '#fff',
                                     },
                                     list: {
                                         paddingVertical: 3,
                                         margin: 2,
                                         alignItems: "center",
                                         zIndex: -1,
                                         borderRadius: 10,
                                     },
                                     line: {
                                         height: 0.5,
                                         width: "100%",
                                         backgroundColor: "rgba(255,255,255,0.5)"
                                     },
                                 });

export default Welcome_screen;
