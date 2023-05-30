import {Text, View, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, ScrollView, Dimensions} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {BleContext} from "../../store/ble-context";
import {Button_1} from "../components/export";
import {useTranslation} from "react-i18next";
import images from "../images/images";

const LightConnections = (props) => {

    var bleCtx = useContext(BleContext);
    const [t] = useTranslation();
    const [isScanning, setIsScanning] = useState(false);
    const [bluetoothDevices, setBluetoothDevices] = useState([]);

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
    }, [bleCtx.devices]);

    const RenderItem = ({peripheral}) => {
        const color = peripheral.connected ? 'green' : '#fff';
        return (
            <>
                <Text
                    style={{
                        fontSize: 20,
                        marginLeft: 10,
                        marginBottom: 5,
                        color: "white",
                    }}>
                    Nearby Devices:
                </Text>
                <TouchableOpacity onPress={() => console.log(peripheral)}>
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
                                fontSize: 18,
                                textTransform: 'capitalize',
                                color: "white",
                            }}>
                            {peripheral.name}
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
                                    fontSize: 14,
                                    color: "white",
                                }}>
                                RSSI: {peripheral.rssi}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "white",
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
