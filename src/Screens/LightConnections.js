import {Text, View, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, ScrollView, Dimensions, Alert} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {BleContext} from "../../store/ble-context";

import {useTranslation} from "react-i18next";
import images from "../images/images";
import {MythContext} from "../../store/myth-context";
import {findArrayElementById, removeItemFromArray} from "../utils";
import Loading from "../../loading";
import {getData, removeItem, saveData} from "../../data/useAsyncStorage";

const LightConnections = (props) => {

    const [t] = useTranslation();
    const bleCtx = useContext(BleContext);
    const ctx = useContext(MythContext);
    const [loading, setLoading] = useState(false);

    const [isScanning, setIsScanning] = useState(false);
    const [bluetoothDevices, setBluetoothDevices] = useState([]);

    useEffect(() => {
        //disconnect from connected devices

        setLoading(true);
        bleCtx.getBleManagerConnectedDevices().then(async results => {
            for (let i = 0; i < results.length; i++) {
                let peripheral = results[i];
                bleCtx.disconnectDeviceByDevice(peripheral);
            }
            setLoading(false);
        });
        search();
    }, []);

    const search = async () => {
        if (isScanning) {
            setIsScanning(false);
            bleCtx.stopScan();
            return;
        }
        const stopTimer = setTimeout(() => {
            bleCtx.stopScan();
            setIsScanning(false);
            clearTimeout(stopTimer);
        }, 60000);

        setIsScanning(true);
        setBluetoothDevices([]);
        bleCtx.startScan();
    }

    useEffect(() => {
        // update current list of bluetooth devices when new device is discovered in useBLE hook

            setBluetoothDevices(bleCtx.devices);

            if (ctx.aquarium && ctx.aquarium.deviceList && ctx.aquarium.deviceList.length > 0) {
                ctx.aquarium.deviceList.forEach(x => {
                    let device = bleCtx.devices.filter(a => a.id == x.id);
                    x.connected = false;
                    if (device.length > 0) {
                        device[0].connected = true;
                        x.connected = true;
                    }
                })
            }

    }, [bleCtx.devices]);

    const removeFromDeviceList = (peripheral) => {
        let newArray = removeItemFromArray(ctx.aquarium.deviceList, peripheral, "id");
        peripheral.connected = false;
        let newAq = {...ctx.aquarium};
        newAq.deviceList = newArray;
        save(newAq);
    }

    const additemtoDeviceList = (peripheral) => {
        peripheral.connected = true;
        let newArray = ctx.aquarium.deviceList.slice();
        newArray.push(peripheral);
        let newAq = {...ctx.aquarium};
        newAq.deviceList = newArray;
        save(newAq);
    }

    const save =(newAq)=>{
        getData("aquariumList").then(result => {
            let selected = findArrayElementById(result, ctx.aquarium.name, "name");
            let index = result.findIndex(x => x.id == selected.id);
            let tempList = [...result];
            tempList[index] = newAq;

            removeItem("aquariumList").then(res => {
                saveData("aquariumList", tempList).then(resX => {
                    Alert.alert(t('Success'), t('Success'));
                    ctx.setAquarium(newAq);
                });
            });
        });
    }
    const RenderItem = ({peripheral}) => {
        // if (peripheral.name.toUpperCase() !== "myth".toUpperCase()) {
        //     return;
        // }
        const color = peripheral.connected ? 'green' : 'grey';
        return (
            <>
                <Text
                    style={{
                        fontSize: 5,
                        marginLeft: 10,
                        marginBottom: 5,
                        color: "black",
                    }}>
                </Text>
                <TouchableOpacity onPress={() => peripheral.connected ? removeFromDeviceList(peripheral) : additemtoDeviceList(peripheral)}>
                    <View
                        style={{
                            backgroundColor: color,
                            borderRadius: 5,
                            paddingVertical: 5,
                            marginHorizontal: 10,
                            paddingHorizontal: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 15,
                                textTransform: 'capitalize',
                                color: "black",
                            }}>
                            {peripheral.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 13,
                                color: "black",
                            }}>
                            Status: {peripheral.connected ? t("connected") : t("notconnected")}
                        </Text>
                        <View
                            style={{
                                backgroundColor: color,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "black",
                                }}>
                                RSSI: {peripheral.rssi}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "black",
                                }}>
                                ID: {peripheral.id}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    };

    if (loading) {
        return <Loading>{<Text>Connecting to saved devices</Text>}</Loading>
    }
    return (
        <ImageBackground source={images.background} style={{flex: 1}}>
            <StatusBar hidden={true}></StatusBar>
            <View style={styles.container}>
                <View style={styles.search}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={search}>
                        <Text style={styles.buttonTextStyle}>
                            {isScanning ? t("scanning") : t('scanBluetooth')}
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={styles.mainBody}
                    contentInsetAdjustmentBehavior="automatic">
                    {/* list of scanned bluetooth devices */}
                    {bluetoothDevices.map(device => (
                        <View key={device.id}>
                            <RenderItem peripheral={device}/>
                        </View>
                    ))}
                </ScrollView>

            </View>
        </ImageBackground>
    );
}
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
                                     container: {
                                         flex: 1
                                     },
                                     search: {},
                                     devicelist: {flex: 1},
                                     mainBody: {
                                         flex: 1,
                                         justifyContent: 'center',
                                         height: windowHeight,
                                     },
                                     buttonStyle: {
                                         backgroundColor: '#484848',
                                         borderWidth: 0,
                                         color: 'rgb(253,192,41)',
                                         borderColor: '#307ecc',
                                         height: 40,
                                         alignItems: 'center',
                                         borderRadius: 30,
                                         marginLeft: 35,
                                         marginRight: 35,
                                         marginTop: 15,
                                     },
                                     buttonTextStyle: {
                                         color: '#FFFFFF',
                                         paddingVertical: 10,
                                         fontSize: 16,
                                     },

                                 });

export default LightConnections;
