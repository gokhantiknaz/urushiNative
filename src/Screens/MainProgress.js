import {View, StyleSheet} from "react-native";
import ChannelProgress from "../components/ChannelProgress";
import React, {useContext, useEffect, useState} from "react";
import {MythContext} from "../../store/myth-context";
import {BleContext} from "../../store/ble-context";
import {StatusBar} from "expo-status-bar";
import {createEmptyArrayManuel, findArrayElementById, sendData} from "../utils";
import {Models} from "../../data/Model";

const MainProgress = (props) => {
    const ctx = useContext(MythContext);
    const [progressObject, setProgressObject] = useState(null);
    const ctxBle = useContext(BleContext);
    const [subModel, setSubModel] = useState(null);

    useEffect(() => {
        let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");
        let selectedsubModel = findArrayElementById(model.SubModels, ctx.aquarium.submodelId ?? ctx.aquarium.modelId, "id");
        setSubModel(selectedsubModel);

    }, [])

    useEffect(() => {
        if (progressObject && progressObject.channel) {
            if (!props.allProgress || props.allProgress.length === 0) {
                return;
            }
            const newState = props.allProgress.map(obj => {
                if (obj.channel === progressObject.channel) {
                    return {...obj, value: progressObject.value};
                }
                return obj;
            });

            props.setAllProgress(newState);
            sendAllProgress(newState);
        }
    }, [progressObject])

    function sendAllProgress(newState) {
        let tmpArray = [...props.allProgress];
        if (newState) {
            tmpArray = newState
        }

        if (tmpArray.length > 0) {
            let data = createEmptyArrayManuel(false);
            data[2] = props.delayTime ?? 1; // kac dk acık kalacagını dk cinsinden
            tmpArray.forEach(x => {
                data[x.channel + 2] = x.value; //0.1.2 kanallar dolu oldugundan...
            });
            sendData(data, ctxBle, ctx);
        }
    }

    useEffect(() => {
        sendAllProgress();
    }, [props.allOnOff])

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
                                <ChannelProgress value={getValue(x.value)} ChannelName={x.label} Channel={x.Channel}
                                                 setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
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
