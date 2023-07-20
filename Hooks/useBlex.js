import {BleManager} from "react-native-ble-plx";
import {View, Text, PermissionsAndroid, Platform} from 'react-native'
import React, {memo, useContext, useEffect, useMemo, useState} from 'react'
import {LogBox} from 'react-native';
import base64 from "react-native-base64";
import * as ExpoDevice from "expo-device";

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const SERVICE_UUID2 = "00002d8d-0000-1000-8000-00805f9b34fb"; // VOO
const SERVICE_UUID3 = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const SERVICE_UUID4 = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

const useBlex = () => {

    const _BleManager = useMemo(() => new BleManager(), []);
    const [devices, setDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);
    const [receviedData, setReceviedData] = useState();

    const ModelIdArray = [SERVICE_UUID, SERVICE_UUID2, SERVICE_UUID3, SERVICE_UUID4];

    useEffect(() => {
        LogBox.ignoreLogs(['new NativeEventEmitter']);
        return () => {
            _BleManager.destroy(); //clean up BleManager
        }
    }, [])
    const requestAndroidPermissions = async () => { //request permissions for android
        const bluetoothScanPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK"
        });
        const bluetoothConnectPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK"
        });
        const fineLocationPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK"
        });

        return bluetoothScanPermission === "granted" && bluetoothConnectPermission === "granted" && fineLocationPermission === "granted";
    };
    const requestPermissions = async () => { //request permissions for ios and android
        console.log(Platform.OS);
        if (Platform.OS === "android") {
            if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: "Location Permission",
                    message: "Bluetooth Low Energy requires Location",
                    buttonPositive: "OK"
                });
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                const isAndroidPermissionsGranted = await requestAndroidPermissions();
                return isAndroidPermissionsGranted;
            }
        } else {
            return true;
        }
    };
    const isDuplicteDevice = (devices, nextDevice) => devices.findIndex((device) => nextDevice.id === device.id) > -1; //check if device is already in the list
    const startScan = async () => {
        //check permission BLE and Location permissions
        const isGranted = await requestPermissions();
        if (!isGranted) {
            console.log("Permission not granted");
            alert("Permission not granted");
            return;
        }
        console.log("Scanning started");
        setDevices([]);

        _BleManager.startDeviceScan(ModelIdArray, {
                                        allowDuplicates: false,
                                    },
                                    async (error, device) => {
                                        if (error) {
                                            console.log("Scan", error);
                                        }
                                        if (device && device.name) {
                                            setDevices((prevState) => {
                                                if (!isDuplicteDevice(prevState, device)) {
                                                    // console.log("Device", device.id, device.name);
                                                    // console.log("uuid:", device.serviceUUIDs);
                                                    //MYTH IKG MIA111230001
                                                    return [...prevState, device];
                                                }
                                                return prevState;
                                            });
                                        }
                                    }
        );
    };
    const stopScan = () => { //stop scanning for devices
        console.log("Scanning stopped");
        _BleManager.stopDeviceScan();
    };
    const connectDevice = async (_device, id = null) => { //connect to device
        console.log("Connecting to device", id ? id : _device.name)
        const deviceID = id ? id : _device.id;
        _BleManager.stopDeviceScan();

        const options = {
            autoConnect: false,
            requestMTU: 128,
            timeout: 60000
        };

        _BleManager.connectToDevice(deviceID, options).then(async device => {
            return await device.discoverAllServicesAndCharacteristics();
        }).then(device => {
            console.log(`Device connected with ${device.name}`);
            setConnectedDevice(() => device);
            readNotifications(device, deviceID);
            const subscribe = _BleManager.onDeviceDisconnected(device.id, (error, disconnectedDevice) => {
                                                                   // console.log("Disconnected", error, disconnectedDevice)
                                                                   setConnectedDevice(null);
                                                                   subscribe.remove()
                                                               }
            );
        }).catch(err => {
            console.log("Connect", err);
            throw  err;
        });

    };
    const sendDatatoDevice = (device, data, id = null, serviceUUID = null) => { //send data to device
        const deviceID = id ? id : device.id
        // device secili akv.a ait değilse disconnect all devam et.
        const dataToSend = base64.encodeFromByteArray(data);
        _BleManager.writeCharacteristicWithoutResponseForDevice(deviceID, (serviceUUID ?? SERVICE_UUID), CHARACTERISTIC_UUID, dataToSend).then(device => {
                                                                                                                                                   console.log("sendDatatoDevice", deviceID, data);
                                                                                                                                               }
        ).catch(err => {
                    console.log("sendDatatoDevice Error", err);
                    throw  err;
                }
        );
    }

    //read notificaitons from device
    const readNotifications = async (device, id = null) => {
        if (!device) {
            return;
        }
        const deviceID = id ? id : device.id
        _BleManager.monitorCharacteristicForDevice(deviceID, SERVICE_UUID, CHARACTERISTIC_UUID, (error, characteristic) => {
            if (error) {
                console.log("readNotifications Error", error);
                return ;
            }
            if (characteristic) {
                console.log("readNotifications", characteristic.deviceID, base64.decode(characteristic.value))
                setReceviedData(base64.decode(characteristic.value))
                return characteristic
            }
        })
    }
    const getBleManagerConnectedDevices = async () => { //get connected devices
        try {
            const connectedDevices = await _BleManager.connectedDevices(ModelIdArray);
            return connectedDevices;
        } catch (err) {
            console.log("Error: getBleManagerConnectedDevices Error", err)
        }

    }
    const disconnectDevice = () => { //disconnect from device
        connectedDevice.cancelConnection();
    };
    const disconnectDeviceByDevice = async (device) => { //disconnect from device
        console.log("disconnected from:" + device.name);
        await device.cancelConnection();
    };

    return ( //return functions and variables
        {
            startScan,
            devices,
            connectDevice,
            disconnectDevice,
            connectedDevice,
            sendDatatoDevice,
            getBleManagerConnectedDevices,
            stopScan,
            disconnectDeviceByDevice,
            receviedData
        }
    )
}

export default useBlex
