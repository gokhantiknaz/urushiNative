//Context for Ble Manager
import { createContext } from "react";
import useBlex from "../Hooks/useBlex";
import React from 'react'
import { useState } from "react";
import { useEffect } from "react";



export const BleContext = React.createContext({ //create context for ble manager 
    startScan: () => { },
    connectDevice:async  (device) => { },
    disconnectDevice: () => { },
    devices: [],
    connectedDevice: null,
    sendDatatoDevice: (device,data,id=null) => { },
    getBleManagerConnectedDevices: async() => [],
    stopScan: () => { }
});

const BleContextProvider = ({ children }) => {
    const blxFns = useBlex()
    const bleDevices=blxFns.devices
        const [bleFns, setBleFns] = useState({
        devices:blxFns.devices,
        ...blxFns}
        )

    useEffect(() => {    //update bleFns when new device is discovered
        setBleFns({devices:bleDevices,...blxFns})
    }, [bleDevices])

 

    return (
        <BleContext.Provider value={bleFns}>
            {children}
        </BleContext.Provider>
    )
}


export default BleContextProvider
