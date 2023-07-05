import {ImageBackground, View, StyleSheet} from "react-native";
import ChannelProgress from "../components/ChannelProgress";
import images from "../images/images";
import React, {useContext, useEffect, useState} from "react";
import {MythContext} from "../../store/myth-context";
import bleContext, {BleContext} from "../../store/ble-context";
import {StatusBar} from "expo-status-bar";
import {showMessage} from "react-native/Libraries/Utilities/LoadingView";
import {createEmptyArrayManuel, findArrayElementById} from "../utils";
import {Models} from "../../data/Model";

const MainProgress = (props) => {
    const ctx = useContext(MythContext);
    const [bytes, setBytes] = useState([]);
    const [progressObject, setProgressObject] = useState(null);
    const [allProgress, setAllProgress] = useState([{channel: 1, value: 0}, {channel: 2, value: 0}, {channel: 3, value: 0}, {channel: 4, value: 0}, {channel: 5, value: 0}, {channel: 6, value: 0}]);
    const ctxBle = useContext(BleContext);
    const [subModel, setSubModel] = useState(null);

    useEffect(() => {
        let emptyBytes = createEmptyArrayManuel(false);
        setBytes(emptyBytes);
        let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");
        let selectedsubModel = findArrayElementById(model.SubModels, ctx.aquarium.submodelId ?? ctx.aquarium.modelId, "id");
        setSubModel(selectedsubModel);
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

    function sendAllProgress() {
        let tmpArray = [...props.allProgress];

        if (tmpArray.length > 0) {
            let data = createEmptyArrayManuel(false);
            data[2] = props.delayTime ?? 1; // kac dk acık kalacagını dk cinsinden
            tmpArray.forEach(x => {
                data[x.channel + 2] = x.value; //0.1.2 kanallar dolu oldugundan...
            });
            sendData(data);
        }
    }

    useEffect(() => {

        sendAllProgress();
    }, [props.allOnOff])
    const setByteArrayData = (channel, value) => {
        let data = bytes.slice();
        data[channel + 2] = parseInt(value); //0.1.2 kanallar dolu oldugundan...
        data[2] = props.delayTime ?? 1; // kac dk acık kalacagını dk cinsinden
        return data;
    }
    const sendData = async (data) => {

        ctxBle.getBleManagerConnectedDevices().then(devices => {
            devices.forEach(x => {
                if (ctx.aquarium.deviceList.filter(a => a.id == x.id).length > 0) {
                    let serviceid = ctx.aquarium.deviceList.filter(a => a.id == x.id)[0].serviceUUIDs[0];
                    ctxBle.sendDatatoDevice(x, data, null, serviceid);
                }
            });
        });
    }
    const getValue = (channel) => {
        let selectedChannel = findArrayElementById(props.allProgress, channel, "channel");
        if (selectedChannel) {
            return parseInt(selectedChannel.value);
        }
        return 0;
    }

    return (
        <View style={{flex: 1, padding: 5}}>
            <StatusBar hidden={true}></StatusBar>
            <View style={styles.progressContainer}>
                {subModel &&
                    subModel.Channels.map(x => {
                        return (
                            <View style={{marginBottom: 1}} key={x.value}>
                                <ChannelProgress value={getValue(x.value)} ChannelName={x.label} Channel={x.Channel} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                            </View>
                        );
                    })
                }
            </View>
        </View>
    );

}

export default MainProgress;
const styles = StyleSheet.create({
                                     progressContainer: {
                                         flex: 1,
                                         paddingBottom: 10,
                                         display: "flex",
                                         justifyContent: "flex-end",
                                     },
                                 });
