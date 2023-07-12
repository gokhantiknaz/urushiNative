import { View, Text, Button,ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {BleContext} from "../../store/ble-context";
import {getAllKeys} from "../../data/useAsyncStorage";
import {Button_1} from "../components/export";

const BLEDevices = () => {
    const [devices, setDevices] = useState([]);
    const [connectedDevices, setConnectedDevices] = useState([]);
    const bleCtx = useContext(BleContext); //get ble context

    const checkDevice = async () => { //get connected devices and saved devices
        const _cDevices = await bleCtx.getBleManagerConnectedDevices()
        setConnectedDevices(_cDevices)
        const _devices=await getAllKeys()
        console.log("devices", _devices,connectedDevices)
    }

    useEffect(() => {
        checkDevice()
        return () => {
        }

    }, [])

    return (
        <>
            <View>
                <Text>BLEDevices</Text>
            </View>
            <ScrollView style={{flex:1,marginHorizontal:10}}>
                {connectedDevices.length===0?<Text>No Connected Devices</Text>:
                <View>
                <Text>Connected Devices</Text>
                {connectedDevices.map((device) => <Text key={device.id}>{device.name}</Text>)}
                </View>
                }
            </ScrollView>
            <ScrollView style={{flex:1,marginHorizontal:10}}>
                {devices.length===0?<Text>No Saved Devices</Text>:
                <View>
                <Text>Devices</Text>
                {devices.map((device) => <Text key={device.id}>{device.name}</Text>)}
                </View>
                }
            </ScrollView>
            <Button_1 title="Send Data" onPress={checkDevice} />
        </>
    )
}

export default BLEDevices
