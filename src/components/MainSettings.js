import {ImageBackground, Text, View, StyleSheet, TouchableHighlight, TouchableNativeFeedback, FlatList, Alert, Image, Pressable} from "react-native";
import images from "../images/images";
import UnderCons from "./UnderCons";
import {useTranslation} from "react-i18next";
import * as css from "../Styles/styles";
import {Icon} from "react-native-elements";
import React, {useContext, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {listData} from "../../data/data";
import {showConfirmDialog} from "./Confirm";
import {clearStorage, getData, removeItem, saveData} from "../../data/useAsyncStorage";
import {MythContext} from "../../store/myth-context";
import {Picker} from "react-native-web";


const MainSettings = (props) => {

    const [t, i18n] = useTranslation();
    const ctx = useContext(MythContext);

    const data = [
        {
            key: 1,
            text: t('chosoLanguage'),
            icon: {
                iconName: 'language',
                iconFont: 'ionicon',
                iconColor: '#FF7345',
            },
            description: t('chosoLanguage'),
            onClcik: (item) => {
                console.log(item);
            }
        },
        {
            key: 2,
            text: t('deleteaquariumsummary'),
            icon: {
                iconName: 'trash',
                iconFont: 'ionicon',
                iconColor: '#FF7345',
            },
            description: t('deleteaquarium'),
            onClcik: (item) => {
                showConfirmDialog(null, () => {
                    getData("aquariumList").then((result) => {
                        let newArray = (result.filter(function (t) {
                            return t.name !== ctx.aquarium.name
                        }));
                        removeItem("aquariumList").then(x => {
                            saveData("aquariumList", newArray).then(res => {
                                Alert.alert(t("success"), "Deleted Successfully");
                                props.navigation.navigate("home");
                            });
                        });
                    });
                });
            }
        },
        {
            key: 3,
            text: t('clearStorage'),
            icon: {
                iconName: 'dangerous',
                iconFont: 'material',
                iconColor: '#FF7345'
            },
            description: t("deletestoragesummary"),
            onClcik: (item) => {
                showConfirmDialog(t("deletestorage"), () => {
                    clearStorage();
                });
            }
        }

    ];
    const renderRow = ({item}) => {
        const desc = item.description;
        const text = t(item.text);
        const {iconName, iconFont, iconColor} = item.icon;

        let actualRowComponent =
            <View style={css.home_screen_list.row}>
                <View style={css.home_screen_list.row_cell_timeplace}>
                    <Text style={css.home_screen_list.row_place}>{text}</Text>
                    <Text style={css.home_screen_list.row_time}>{t(desc)}</Text>
                </View>
                <Icon color={iconColor} size={css.values.small_icon_size} name={iconName}
                      type={iconFont} onClick={() => {item.onClcik()}}/>
                {/*<Text style={css.home_screen_list.row_cell_temp}>{temp}</Text>*/}
            </View>;

        if (item.key == 1) {
            actualRowComponent = <View style={css.home_screen_list.row}>
                <View style={css.home_screen_list.row_cell_timeplace}>
                    <Pressable onPress={() => {i18n.changeLanguage("tr")}}>

                        <Text style={[css.home_screen_list.row_place, {alignSelf: "center"}]}>Türkçe</Text>
                        <Image style={styles.image} source={images.tr}></Image>

                    </Pressable>
                </View>
                <View style={css.home_screen_list.row_cell_timeplace}>
                    <Pressable onPress={() => { i18n.changeLanguage("en")}} style={{alignSelf: "center"}}>

                        <Text style={[css.home_screen_list.row_place, {alignSelf: "center"}]}>English</Text>
                        {/*<Text style={css.home_screen_list.row_time}>{t(desc)}</Text>*/}
                        <Image style={styles.image} source={images.en}></Image>
                    </Pressable>
                </View>
            </View>;
        }

        let touchableWrapperIos =
            <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={css.colors.transparent_white}
                onPress={
                    () => {
                        item.onClcik(item)
                    }
                }
            >
                {actualRowComponent}
            </TouchableHighlight>;

        let touchableWrapperAndroid =
            <TouchableNativeFeedback
                useForeground={true}
                background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                onPress={
                    () => {
                        item.onClcik(item);
                    }
                }
            >
                {actualRowComponent}
            </TouchableNativeFeedback>;

        if (require('react-native').Platform.OS === 'ios') {
            return touchableWrapperIos;
        } else {
            return touchableWrapperAndroid;
        }

    };

    return (<ImageBackground source={images.background} style={{flex: 1}}>

        <View style={css.home_screen.v_container}>
            <StatusBar
                hidden={true}
                translucent={false}
                animated={true}
                barStyle={'light-content'}
                backgroundColor={css.colors.secondary}
            />
            <FlatList
                style={css.home_screen_list.container}
                data={data}
                renderItem={renderRow}
            />
        </View>
    </ImageBackground>);
}
export default MainSettings;

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1
                                     },
                                     image: {
                                         height: 40,
                                         width: 40,
                                         alignSelf: "center"
                                     }
                                 });
