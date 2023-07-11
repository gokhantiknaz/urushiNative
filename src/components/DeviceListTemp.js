import {FlatList, ImageBackground, Pressable, Text, TouchableHighlight, TouchableNativeFeedback, View} from "react-native";
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
        // let tmplist = [
        //     {name: "ikigai-1", id: 1, temperature: "40", description: "Açıklama"},
        //     {name: "ikigai-2", id: 2, temperature: "65", description: "Açıklama"},
        //     {name: "ikigai-3", id: 3, temperature: "33", description: "Açıklama"},
        //     {name: "ikigai-4", id: 4, temperature: "68", description: "Açıklama"},
        // ];
        //
        // setDeviceList(tmplist);
        let list = ctx.aquarium.deviceList.map(x => {return {...x, temperature: "0"}});
        setDeviceList(list);
    }, [])

    useEffect(() => {
        if (ctxBle.receviedData && ctxBle.receviedData.length > 0) {
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
        alert("x");

        ctxBle.getBleManagerConnectedDevices().then(result => {
            if (result.find(d => d.id == device.Id)) {
                console.log("I:", device.name + " already connected");
            } else {
                ctxBle.connectDevice(null, device.Id).then(result => {
                    console.log("I:", device.name + " connected");
                }).catch(error => {
                    console.log("E:", error);
                });
            }
        }).then(result => {
            let temperatureData = [101, 5, 102];
            let list = ctx.aquarium.deviceList.filter(a => a.id == device.id);
            if (list.length > 0) {
                let serviceid = list[0].serviceUUIDs[0];
                ctxBle.sendDatatoDevice(device, temperatureData, null, serviceid);
            }
        }).catch(error => {
            console.log("E:", error);
            setRefreshEnable(true);
        })
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
                    <Text style={css.home_screen_list.row_time}>{t(desc)}</Text>
                    <Text style={css.home_screen_list.row_place}>{name}</Text>
                </View>

                <Text style={css.home_screen_list.row_cell_temp}>{temp}</Text>

                <Pressable onPress={() => isRefreshEnable && connect(item)}>
                    <Icon color={icon.iconColor} size={css.values.small_icon_size} style={{marginLeft: 20}} name={icon.iconName}
                          type={icon.iconFont}/>
                </Pressable>
            </View>;

        let touchableWrapperIos =
            <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={css.colors.transparent_white}
                onPress={
                    () => {
                        //clickEventListener(item);
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
            <FlatList
                style={css.home_screen_list.container}
                data={deviceList}
                renderItem={renderRow}
            /></ImageBackground>);
}
