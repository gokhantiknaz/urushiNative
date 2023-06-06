import {ImageBackground, View, StyleSheet} from "react-native";
import ChannelProgress from "../components/ChannelProgress";
import images from "../images/images";
import React, {useContext, useEffect, useState} from "react";
import {MythContext} from "../../store/myth-context";
import bleContext, {BleContext} from "../../store/ble-context";
import {StatusBar} from "expo-status-bar";

const MainProgress = (props) => {
    const ctx = useContext(MythContext);
    const [bytes, setBytes] = useState([]);
    const [progressObject, setProgressObject] = useState(null);
    const [allProgress, setAllProgress] = useState([{channel: 1, value: 0}, {channel: 2, value: 0}, {channel: 3, value: 0}, {channel: 4, value: 0}, {channel: 5, value: 0}, {channel: 6, value: 0}]);
    let ctxBle = useContext(BleContext);


    useEffect(() => {
        let emptyBytes = createEmptyArray();
        setBytes(emptyBytes);
    }, [])

    useEffect(() => {
        if (progressObject && progressObject.channel) {
            if (!allProgress) {
                return;
            }

            const newState = allProgress.map(obj => {
                if (obj.channel === progressObject.channel) {
                    return {...obj, value: progressObject.value};
                }
                return obj;
            });
            setAllProgress(newState);
            props.setAllProgress(newState);
            let data = setByteArrayData(progressObject.channel, progressObject.value);
            setBytes(data);
            sendData(data);
        }
    }, [progressObject])

    useEffect(() => {
        let tmpArray = [...props.allProgress];
        console.log(props.allProgress);
        if (props.allProgress.length > 0) {
            let data = createEmptyArray();
            data[2] = props.delayTime ?? 1; // kac dk acık kalacagını dk cinsinden
            tmpArray.forEach(x => {
                data[x.channel + 2] = x.value; //0.1.2 kanallar dolu oldugundan...
            });
            sendData(data);
        }
    }, [props.allOnOff])

    const createEmptyArray = () => {
        let bytes = [];
        for (let i = 0; i < 10; i++) {
            bytes.push(0);
        }
        bytes[0] = (0x65);
        bytes[1] = (0x06);

        bytes[2] = props.delayTime ?? 1; // kac dk acık kalacagını dk cinsinden
        bytes[9] = (0x66);
        return bytes;
    }

    const setByteArrayData = (channel, value) => {
        let data = bytes.slice();
        data[channel + 2] = value; //0.1.2 kanallar dolu oldugundan...
        data[2] = props.delayTime ?? 1; // kac dk acık kalacagını dk cinsinden
        return data;
    }
    const sendData = async (data) => {
        ctxBle.getBleManagerConnectedDevices().then(devices => {
            devices.forEach(x => {

                ctxBle.sendDatatoDevice(x, data);
            });
        });
    }

    useEffect(() => {
        if (ctx.manuelTemplate) {
            setAllProgress(ctx.manuelTemplate);
            props.setAllProgress(ctx.manuelTemplate);

        }
    }, [ctx.manuelTemplate])

    const getValue = (channel) => {

        let filtered = ctx.manuelTemplate?.filter(x => {
            return x.channel === channel;
        })
        if (filtered?.length > 0) {
            return filtered[0].value;
        }
        return 0;
    }

    return (
        <View style={{flex: 1, padding: 5}}>
            <StatusBar hidden={true}></StatusBar>
            <View style={styles.progressContainer}>
                <View>
                    <ChannelProgress value={getValue(1)} ChannelName='Royal' Channel={1} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
                <View>
                    <ChannelProgress value={getValue(2)} ChannelName='Blue' Channel={2} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
                <View>
                    <ChannelProgress value={getValue(3)} ChannelName='Cyan+' Channel={3} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
                <View>
                    <ChannelProgress value={getValue(4)} ChannelName='Actinic+' Channel={4} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
                <View>
                    <ChannelProgress value={getValue(5)} ChannelName='He White' Channel={5} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
                <View>
                    <ChannelProgress value={getValue(6)} ChannelName='Magenta+' Channel={6} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
            </View>
        </View>
    );

}

export default MainProgress;
const styles = StyleSheet.create({
                                     progressContainer: {
                                         flex: 2,
                                         display: "flex",
                                         justifyContent: "flex-end",
                                     },
                                 });
