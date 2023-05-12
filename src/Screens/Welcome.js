import React, {useEffect, useState} from "react";
import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity, Pressable, ImageBackground} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Button_1 from "../components/button1";
import {FlatListItemSeparator} from "../components/DeviceList";
import colors from "../components/colors";
import {useTranslation} from "react-i18next";
import images from "../images/images";

const Welcome_screen = () => {

    const LANGUAGES = [
        {code: "tr", label: "Türkçe"},
        {code: "en", label: "English"}
    ];
    const navigation = useNavigation();
    const [t, i18n] = useTranslation();

    useEffect(() => {}, []);
    const [aquarimList, setAquarimList] = useState([{id: 1, name: "My Aquarim", devices: [{name: "x", deviceId: "1"}]}]);

    const selectedLanguageCode = i18n.language;
    const setLanguage = (code) => {
        return i18n.changeLanguage(code);
    };

    const renderItem = (data) => {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate("menu")}}>
                <Text style={{color: "white"}}> {data.item.name} ({data.item.devices.length})</Text>
            </TouchableOpacity>
        );
    }
    return (
        <ImageBackground source={images.background} style={{alignContent: "center", flex: 1, alignItems: "center"}}>
            <View style={styles.container}>
                <View style={{flex:2,width: "100%", paddingTop: "20%"}}>
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
                                onPress={() => setLanguage(language.code)}>
                                <Text style={[selectedLanguage ? styles.selectedText : styles.text]}>
                                    {language.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
                <View style={styles.containerList}>
                    <Text style={{color: colors.test5, paddingBottom: "10%"}}>{t('selectaquarium')}</Text>
                    <FlatList data={aquarimList} renderItem={(data) => renderItem(data)}
                              keyExtractor={item => item.id.toString()}
                              ItemSeparatorComponent={FlatListItemSeparator}>
                    </FlatList>
                </View>
                <View style={styles.container1}>
                    <Button_1
                        onPress={() => navigation.navigate("NewAquarium")}
                        title={t('newAquarium')}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
                                     container: {
                                         flexDirection: "column",
                                         flex: 1,
                                         justifyContent: "space-around",
                                         alignItems: "center",
                                         paddingTop: 20,
                                         paddingHorizontal: 10,

                                     },
                                     containerLang: {
                                       flex:1
                                     },
                                     container1: {
                                         width: '100%',
                                         paddingTop: '5%',
                                         paddingHorizontal: '10%'
                                     },
                                     containerFlag: {
                                         flexDirection: "column",
                                         width: '100%',
                                         paddingTop: '15%',
                                         paddingHorizontal: '35%',
                                     },
                                     containerList: {
                                         paddingTop: '5%',
                                         paddingHorizontal: '10%',
                                         flex: 3,
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
                                     }

                                 });

export default Welcome_screen;
