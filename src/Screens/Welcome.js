import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity, Pressable, ImageBackground, Dimensions} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Button_1 from "../components/button1";
import {FlatListItemSeparator} from "../components/DeviceList";
import colors from "../components/colors";
import {useTranslation} from "react-i18next";
import images from "../images/images";
import {clearStorage, getData, saveData} from "../../data/useAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MythContext} from "../../store/myth-context";
import {Models} from "../../data/Model";
import {StatusBar} from "expo-status-bar";
import {setSelectedLog} from "react-native/Libraries/LogBox/Data/LogBoxData";

const Welcome_screen = ({navigation}) => {

    const ctx = useContext(MythContext);
    const LANGUAGES = [
        {code: "tr", label: "Türkçe"},
        {code: "en", label: "English"}
    ];

    useEffect(() => {
        // getData("language").then((val) => {
        //     setLanguage(val);
        // });
        const focusHandler = navigation.addListener('focus', () => {
            getAquariums();
        });
        return focusHandler;
    }, [navigation]);

    const [t, i18n] = useTranslation();

    const [aquarimList, setAquarimList] = useState([]);

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
    const navigate = (item) => {
        ctx.setAquarium(item);
        ctx.setTemplate()
        navigation.navigate("lights", {aquarium: item});
    }
    const RowInfo = (item) => (
        <TouchableOpacity style={[styles.list, item.item.selectedClass]}
                          onPress={(x) => { navigate(item.item); }}>
            <View style={styles.item}>
                {item.item.image ?
                    <Image source={{uri: `data:image/png;base64,${item.item.image}`}} style={{height: 60, width: 60}}></Image>
                    :
                    <Image source={images.transLogo} style={{height: 60, width: 60}}></Image>
                }

                <Text style={{marginTop: 5, fontSize: 12, color: 'white'}}>{item.item.name}</Text>
            </View>
        </TouchableOpacity>
    );
    const renderItem2 = ({item}) => (
        <>
            <RowInfo item={item}/>
        </>

    );

    return (
        <ImageBackground source={images.background} style={{alignContent: "center", flex: 1, alignItems: "center"}}>
            <StatusBar hidden={true}></StatusBar>
            <View style={styles.container}>
                <View style={styles.Image}>
                    <Image
                        source={images.transLogo}
                        style={{height:250,width:256}}
                        resizeMode="center"
                    />
                    <Text style={{color:"white",fontSize:30}}>PRIZE LED</Text>
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
                            data={aquarimList}
                            renderItem={renderItem2}
                            ItemSeparatorComponent={FlatListItemSeparator}
                            keyExtractor={item => item.name}
                        />
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

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         justifyContent: "space-around",
                                         alignItems: "center",
                                     },
                                     Image: {
                                        width: width, paddingTop: "15%", alignItems: "center"
                                     },
                                     containerLang: {marginTop:20},
                                     button: {
                                         width: width,
                                         paddingTop: '5%',
                                         paddingHorizontal: '5%',
                                         alignItems: "center",
                                         paddingBottom:20
                                     },
                                     containerFlag: {
                                         paddingTop: '10%'
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
                                         marginTop: 5
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
