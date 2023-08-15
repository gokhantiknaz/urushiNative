import {BleManager} from "react-native-ble-plx";
import {PermissionsAndroid, Platform} from 'react-native'
import { useEffect, useMemo, useState} from 'react'
import {LogBox} from 'react-native';
import base64 from "react-native-base64";
import * as ExpoDevice from "expo-device";

const SERVICE_UUID = "5b2487d6-52d2-4645-beff-88202e155af1";
const SERVICE_UUID2 = "4d47083a-311c-11ee-be56-0242ac120002"; // VOO

const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

const useBlex = () => {

    const _BleManager = useMemo(() => new BleManager(), []);
    const [devices, setDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);
    const [receviedData, setReceviedData] = useState();
    const [foundDevice, setFoundDevice] = useState(null);

    const ModelIdArray = [SERVICE_UUID, SERVICE_UUID2];

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
                                            setFoundDevice(device);
                                            setDevices((prevState) => {
                                                if (!isDuplicteDevice(prevState, device)) {
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
            autoConnect: true,
            //When set to false the OS connects to a device on highest available duty cycle but if the device is not available in 30 seconds the connection fails.
            //When set to true the OS periodically checks if the device is available and connects to it as soon as it is scanned. There is no timeout involved but the scan window is quite small to preserve battery. Usually this takes longer than if called with autoConnect=false if the device is advertising nearby. There is one difference from the Android vanilla API: in the vanilla API if the device has been connected with autoConnect=true and later will get disconnected, a reconnect attempt will happen automatically without the user interaction—this is not the case when using this library.
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
        });
    };
    const sendDatatoDevice = (device, data, id = null, serviceUUID = null) => { //send data to device
        const deviceID = id ? id : device.id
        // device secili akv.a ait değilse disconnect all devam et.
        const dataToSend = base64.encodeFromByteArray(data);
        _BleManager.writeCharacteristicWithoutResponseForDevice(deviceID, (serviceUUID ?? SERVICE_UUID), CHARACTERISTIC_UUID, dataToSend).then(device => {
                                                                                                                                                   // console.log("sendDatatoDevice", deviceID, data);
                                                                                                                                               }
        ).catch(err => {
                    console.log("sendDatatoDevice Error", err);
                    throw err;
                }
        );
    }

    //read notificaitons from device
    const readNotifications = async (device, id = null) => {
        if (!device) {
            return;
        }
        const deviceID = id ? id : device.id
        let connecteds = await getBleManagerConnectedDevices();
        if (connecteds.find(x => x.id == device.id)) {
            _BleManager.monitorCharacteristicForDevice(deviceID, SERVICE_UUID, CHARACTERISTIC_UUID, (error, characteristic) => {
                if (error) {
                    console.log("readNotifications Error", error);
                    return;
                }
                if (characteristic) {
                    console.log("readNotifications", characteristic.deviceID, base64.decode(characteristic.value))
                    setReceviedData(base64.decode(characteristic.value))
                    return characteristic
                }
            })
        }
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
            receviedData,
            foundDevice
        }
    )
}

export default useBlex
