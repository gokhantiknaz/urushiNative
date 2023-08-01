import {FlatList, Image, ImageBackground, LogBox, Pressable, ScrollView, StatusBar, Text, TextInput, TouchableHighlight, TouchableNativeFeedback, View} from "react-native";
import * as css from "../Styles/styles";
import {listData} from "../../data/data";
import React, {useContext, useEffect, useState} from "react";
import {Icon} from "react-native-elements";
import {MythContext} from "../../store/myth-context";
import {useTranslation} from "react-i18next";
import {BleContext} from "../../store/ble-context";
import {showMessage} from "react-native/Libraries/Utilities/LoadingView";
import images from "../images/images";
import {findArrayElementById} from "../utils";

export const DeviceListTemp = (props) => {

    const ctx = useContext(MythContext);
    const ctxBle = useContext(BleContext);
    const {navigation} = props;
    const {t, i18n} = useTranslation();
    const [deviceList, setDeviceList] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [isRefreshEnable, setRefreshEnable] = useState(true);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    useEffect(() => {

        if (ctx.aquarium && ctx.aquarium.deviceList && ctx.aquarium.deviceList.length > 0) {
            ctx.aquarium.deviceList.forEach(x => {
                //baglı değilse.
                ctxBle.getBleManagerConnectedDevices().then(result => {
                    if (result.find(d => d.id == x.id)) {
                        showMessage(x.name + t("alreadyconnect)", "load"));
                    } else {
                        ctxBle.connectDevice(null, x.id).then(result => {
                            showMessage(x.name + t("connected"), "load");
                            console.log("I:", x.name + " connected");
                        });
                    }
                })
            })
        }

        let list = ctx.aquarium.deviceList.map(x => {return {...x, temperature: "0", description: "Deneme"}});
        setDeviceList(list);
    }, [])

    useEffect(() => {
        if (selectedDevice && ctxBle.receviedData && ctxBle.receviedData.length > 0) {
            console.log(ctxBle.receviedData);
            let tmpList = deviceList;
            let selected = findArrayElementById(deviceList, selectedDevice.id, "id");
            selected.temperature = ctxBle.receviedData.split('#')[0].toString();
            let newList = tmpList.map((device, index) => {
                if (device.id == selectedDevice.id) {
                    return selected;
                }
                return device;
            });
            setDeviceList(newList);
            setRefreshEnable(true);
        }
    }, [ctxBle.receviedData])

    const connect = async (device) => {

        setRefreshEnable(false);
        setSelectedDevice(device);

        let temperatureData = [101, 5, 102];
        let list = ctx.aquarium.deviceList.filter(a => a.id == device.id);
        try {
            if (list.length > 0) {
                let serviceid = list[0].serviceUUIDs[0];
                ctxBle.sendDatatoDevice(device, temperatureData, null, serviceid);
            }
        } catch (e) {
            console.log("E:", e);
            setRefreshEnable(true);
        }


    }
    const renderRow = ({item}) => {
        const desc = item.description;
        const name = item.name;
        const temp = css.addDegreesToEnd(item.temperature);

        const icon = {
            iconName: 'refresh-circle-outline',
            iconFont: 'ionicon',
            iconColor: 'rgb(253,192,41)'
        };

        let actualRowComponent =
            <View style={css.home_screen_list.row}>
                <View style={css.home_screen_list.row_cell_timeplace}>
                    <Text style={css.home_screen_list.row_place}>{name}</Text>
                    {/*<Text style={css.home_screen_list.row_time}>{desc}</Text>*/}
                </View>

                <Text style={css.home_screen_list.row_cell_temp}>{temp}</Text>
                {!isRefreshEnable && item.id == selectedDevice.id ? <Image style={{height: 40, width: 40}} source={images.refreshing}></Image> :
                    <Pressable onPress={() => connect(item)}>
                        <Icon color={icon.iconColor} size={css.values.small_icon_size} style={{marginLeft: 20}} name={icon.iconName}
                              type={icon.iconFont}/>
                    </Pressable>
                }
            </View>;

        let touchableWrapperIos =
            <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={css.colors.transparent_white}>
                {actualRowComponent}
            </TouchableHighlight>;

        let touchableWrapperAndroid =
            <TouchableNativeFeedback
                useForeground={true}
                background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
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
            <Text style={{color: "white", marginTop: 20, marginLeft: 20}}>{t('refrestempinfo')}</Text>
            <ScrollView>
                <FlatList style={css.home_screen_list.container} data={deviceList} renderItem={renderRow}/>
            </ScrollView>
        </ImageBackground>);

}
