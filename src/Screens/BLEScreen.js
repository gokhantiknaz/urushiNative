import React, {useState, useEffect, useContext} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,

} from 'react-native';

import {StatusBar} from 'expo-status-bar';
import {BleContext} from "../../store/ble-context";


const BLEScreen = ({navigation}) => {
    const bleCtx = useContext(BleContext);

    const [isScanning, setIsScanning] = useState(false);
    const [bluetoothDevices, setBluetoothDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const startsScan = async () => { // start scanning for bluetooth devices

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
    };

    // select device to connect to in device list
    const selectDevice = (device) => {
        if (selectedDevice !== device) {
            setSelectedDevice(device);
        } else {
            setSelectedDevice(null);
        }
    }

    const connectToDevice = async device => { //call from connect button
        if (!device) {
            return;
        }
        await bleCtx.connectDevice(device);
        bleCtx.sendDatatoDevice(device, 'AAA')
        navigation.navigate('BLEDevices')
    };

    const sendData = async () => { // send data to connected device
        // sendDatatoDevice(connectedDevice, 'test')
        const cDev = await bleCtx.getBleManagerConnectedDevices()
        console.log("cDev", cDev)

    };

    useEffect(() => {
        // update current list of bluetooth devices when new device is discovered in useBLE hook
        setBluetoothDevices(bleCtx.devices);
    }, [bleCtx.devices]);

    // render list of bluetooth devices
    const RenderItem = ({device}) => {
        const color = selectedDevice === device ? '#307ecc' : 'lightblue';
        return (
            <>
                <TouchableOpacity onPress={() =>
                    selectDevice(device)
                    // connectToPeripheral(peripheral)
                }>
                    <View
                        style={{
                            backgroundColor: color,
                            borderRadius: 5,
                            paddingVertical: 5,
                            marginHorizontal: 10,
                            paddingHorizontal: 10,
                            marginBottom: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 18, textTransform: 'capitalize', color: "black"//connected ? Colors.white : Colors.black,
                            }}>
                            {device.name}
                        </Text>
                        <View
                            style={{backgroundColor: color, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontSize: 14, color: "black"}}>
                                RSSI: {device.rssi}
                            </Text>
                            <Text style={{fontSize: 14, color: "black"}}>
                                ID: {device.id}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    };

    return (
        <SafeAreaView style={[styles.mainBody]}>
            <ScrollView
                // contentContainerStyle={styles.mainBody}
                style={{flex: 1}}
                contentInsetAdjustmentBehavior="automatic">
                <View
                    style={{
                        marginBottom: 10,
                    }}>
                    <View>
                        <Text style={{fontSize: 30, textAlign: 'center',}}>
                            React Native BLE
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={startsScan}>
                        <Text style={styles.buttonTextStyle}>
                            {isScanning ? 'Scanning... Stop Scanning' : 'Scan Bluetooth Devices'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => navigation.navigate("Devices", {device: "null"})}>
                        <Text style={styles.buttonTextStyle}>
                            Goto BLEDevices
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* list of scanned bluetooth devices */}
                <Text
                    style={{
                        fontSize: 20,
                        marginLeft: 10,
                        marginBottom: 5,
                    }}>
                    Nearby Devices: {bluetoothDevices.length}
                </Text>
                {bluetoothDevices.map(device => (
                    <View style={{marginHorizontal: 10}} key={device.id}>
                        <RenderItem device={device}/>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                // disabled={connectedDevice ? true : false}
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={() => connectToDevice(selectedDevice)}>
                <Text style={styles.buttonTextStyle}>
                    {selectedDevice ? 'Connect to Device' : 'Select Device to Connect'}
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
                                     mainBody: {
                                         flex: 1,
                                         justifyContent: 'center',
                                         // height: windowHeight,
                                         width: '100%',

                                     },
                                     buttonStyle: {
                                         backgroundColor: '#307ecc',
                                         borderWidth: 0,
                                         color: '#FFFFFF',
                                         borderColor: '#307ecc',
                                         height: 45,
                                         alignItems: 'center',
                                         borderRadius: 10,
                                         marginHorizontal: 10,
                                         marginVertical: 5,

                                     },
                                     buttonTextStyle: {
                                         color: '#FFFFFF',
                                         paddingVertical: 10,
                                         fontSize: 16,
                                     },
                                 });

export default BLEScreen;
