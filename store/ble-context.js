import React, {useState, useEffect} from "react";
import useBlex from "../Hooks/useBlex";

export const BleContext = React.createContext({ //create context for ble manager
                                                  startScan: () => { },
                                                  connectDevice: async (device, id) => { },
                                                  disconnectDevice: () => { },
                                                  devices: [],
                                                  connectedDevice: null,
                                                  sendDatatoDevice: (device, data, id = null, serviceUUID = null) => { },
                                                  getBleManagerConnectedDevices: async () => [],
                                                  stopScan: () => { },
                                                  disconnectDeviceByDevice: (device) => { },
                                                  receviedData: {},
                                              });
const BleContextProvider = ({children}) => {
    const blxFns = useBlex()
    const bleDevices = blxFns.devices
    const [bleFns, setBleFns] = useState({
                                             devices: blxFns.devices,
                                             ...blxFns
                                         }
    )

    useEffect(() => {    //update bleFns when new device is discovered

        try {
            setBleFns({devices: bleDevices, ...blxFns})
        } catch (e) {

        }
    }, [bleDevices, blxFns.receviedData])


    return (
        <BleContext.Provider value={bleFns}>
            {children}
        </BleContext.Provider>
    )
}

export default BleContextProvider
