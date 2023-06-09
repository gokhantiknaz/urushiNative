import React, {useContext, useState} from 'react'
import {Text, TouchableOpacity, View, Dimensions, TouchableNativeFeedback, TouchableHighlight, ImageBackground} from "react-native";
import {StyleSheet, Image, FlatList, Alert, useWindowDimensions} from 'react-native';
import {useTranslation} from "react-i18next";
import colors from "../components/colors";
import images from "../images/images";
import {LinearGradient} from 'expo-linear-gradient';
import {getData, removeItem, saveData} from "../../data/useAsyncStorage";
import {MythContext} from "../../store/myth-context";
import {showConfirmDialog} from "../components/Confirm";
import {StatusBar} from "expo-status-bar";
import {Icon} from "react-native-elements";
import * as css from "../Styles/styles";
import {listData} from "../../data/data";

const LightDetail = (props) => {

    const ctx = useContext(MythContext);
    const {navigation} = props;
    const {t, i18n} = useTranslation();

    const deleteAquarium = async () => {

        let allAquariums = await getData("aquariumList");
        let newArray = (allAquariums.filter(function (t) {
            return t.name !== ctx.aquarium.name
        }));

        await removeItem("aquariumList");
        await saveData("aquariumList", newArray);

        navigation.navigate("home");
        Alert.alert(t("success"), "Deleted Successfully");
    }

    const clickEventListener = item => {
        if (item.navigate) {
            navigation.navigate(item.navigate);
        }

        // if (item.key === 6) {
        //     return showConfirmDialog(() => {deleteAquarium()});
        // }
    }

    const renderRow = ({item}) => {
        const desc = item.description;
        const place = t(item.place);
       // const temp = css.addDegreesToEnd(item.currentTemp);
        const {iconName, iconFont, iconColor} = item.icon;

        let actualRowComponent =
            <View style={css.home_screen_list.row}>
                <View style={css.home_screen_list.row_cell_timeplace}>
                    <Text style={css.home_screen_list.row_place}>{place}</Text>
                    <Text style={css.home_screen_list.row_time}>{t(desc)}</Text>

                </View>
                <Icon color={iconColor} size={css.values.small_icon_size} name={iconName}
                      type={iconFont}/>
                {/*<Text style={css.home_screen_list.row_cell_temp}>{temp}</Text>*/}
            </View>;

        let touchableWrapperIos =
            <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={css.colors.transparent_white}
                onPress={
                    () => {
                        clickEventListener(item);

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
                        clickEventListener(item);
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

    return (
        <ImageBackground source={images.background} style={{flex: 1}}>

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
                    data={listData}
                    renderItem={renderRow}
                />

            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({

                                     container: {
                                         flex: 1,
                                         flexDirection: 'row',
                                         flexWrap: 'wrap',
                                         alignItems: 'flex-start',
                                         backgroundColor: colors.black

                                     },
                                     image: {
                                         width: 50,
                                         height: 50,
                                         alignContent: 'center',
                                         alignItems: 'center',
                                         marginTop: 20
                                     },

                                     card: {
                                         justifyContent: 'center',
                                         alignItems: 'center',
                                         width: (Dimensions.get("window").width / 2) - 10,
                                         margin: 5,
                                         height: 130,
                                         borderRadius: 20,

                                     },

                                     name: {
                                         fontSize: 18,
                                         flex: 1,
                                         alignSelf: 'center',
                                         color: '#fff',
                                         fontWeight: 'bold',
                                     },
                                     count: {
                                         fontSize: 14,
                                         flex: 1,
                                         alignSelf: 'center',
                                         color: '#6666ff',
                                     },
                                     followButton: {
                                         marginTop: 10,
                                         height: 35,
                                         width: 100,
                                         padding: 10,
                                         flexDirection: 'row',
                                         justifyContent: 'center',
                                         alignItems: 'center',
                                         borderRadius: 30,
                                         backgroundColor: 'white',
                                         borderWidth: 1,
                                         borderColor: '#dcdcdc',
                                     },
                                     followButtonText: {
                                         color: '#dcdcdc',
                                         fontSize: 12,
                                     },
                                 })
export default LightDetail;
