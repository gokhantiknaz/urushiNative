import React, {useContext, useState} from 'react'
import {Text, TouchableOpacity, View, Dimensions, TouchableNativeFeedback, TouchableHighlight, ImageBackground} from "react-native";
import {StyleSheet, Image, FlatList, Alert, useWindowDimensions} from 'react-native';
import {useTranslation} from "react-i18next";
import images from "../images/images";

import {StatusBar} from "expo-status-bar";
import {Icon} from "react-native-elements";
import * as css from "../Styles/styles";
import {listData} from "../../data/data";

const LightDetail = (props) => {

    const {navigation} = props;
    const {t, i18n} = useTranslation();
    const clickEventListener = item => {
        if (item.navigate) {
            navigation.navigate(item.navigate);
        }
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
            <StatusBar
                hidden={true}
                translucent={false}
                animated={true}
                barStyle={'light-content'}
                backgroundColor={css.colors.secondary}
            />
            <View style={css.home_screen.v_container}>

                <FlatList
                    style={css.home_screen_list.container}
                    data={listData}
                    renderItem={renderRow}
                />
            </View>
        </ImageBackground>
    );
}

export default LightDetail;
