import {Text, View, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, ScrollView, Dimensions} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {BleContext} from "../../store/ble-context";
import {Button_1} from "../components/export";
import {useTranslation} from "react-i18next";
import images from "../images/images";
import {MythContext} from "../../store/myth-context";
import {removeItemFromArray} from "../utils";

const LightConnections = (props) => {

    const bleCtx = useContext(BleContext);
    const ctx = useContext(MythContext);

    const [t] = useTranslation();
    const [isScanning, setIsScanning] = useState(false);
    const [bluetoothDevices, setBluetoothDevices] = useState([]);
    const [connected, setConnected] = useState(false);

    const peripherals = new Map();
    useEffect(() => {

        handleGetConnectedDevices();


    }, []);

    const handleGetConnectedDevices = () => {
        bleCtx.getBleManagerConnectedDevices().then(results => {
            if (results.length == 0) {
                console.log('No connected bluetooth devices');
            } else {
                for (let i = 0; i < results.length; i++) {
                    let peripheral = results[i];
                    peripheral.connected = true;
                    peripherals.set(peripheral.id, peripheral);
                    setConnected(true);
                    setBluetoothDevices(Array.from(peripherals.values()));
                }
            }
        });
    };
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
                let device = bleCtx.devices.filter(a => a.id == x.id)[0];
                if (device) {
                    device.connected = true;
                }
            })
        }

    }, [bleCtx.devices]);

    const removeFromDeviceList = (peripheral) => {
        let newArray = removeItemFromArray(ctx.aquarium.deviceList, peripheral, "id");
        peripheral.connected = false;
        let newAq = {...ctx.aquarium};
        newAq.deviceList = newArray;
        ctx.setAquarium(newAq);
    }

    const additemtoDeviceList = (peripheral) => {

        peripheral.connected = true;
        let newArray = ctx.aquarium.deviceList.slice();
        newArray.push(peripheral);
        console.log(newArray);

        let newAq = {...ctx.aquarium};
        newAq.deviceList = newArray;
        ctx.setAquarium(newAq);

    }
    const RenderItem = ({peripheral}) => {
        if (peripheral.name !== "IKIGAI" && peripheral.name !== "ikigai") {
            return;
        }
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
                            {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
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
                                         backgroundColor: '#307ecc',
                                         borderWidth: 0,
                                         color: '#FFFFFF',
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
