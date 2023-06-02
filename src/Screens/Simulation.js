import React, {useContext, useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, StyleSheet, Text, View, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingsChartScreen from "../components/SettingsChartScreen";
import RadioForm from "react-native-simple-radio-button";
import {FloatingAction} from "react-native-floating-action";
import {getData} from "../../data/useAsyncStorage";
import {MythContext} from "../../store/myth-context";
import {Models} from "../../data/Model";
import {findArrayElementById} from "../utils";
import { Icon } from '@rneui/themed';

export const Simulation = () => {

    const ctx = useContext(MythContext);

    const DUMMY_DATA = [
        // <--- This is the data that is being used to create the draggable dots
        {power: 0, time: 480, color: "lightsalmon"},
        {power: 50, time: 720, color: "darkorange"},
        {power: 50, time: 1080, color: "darkturquoise"},
        {power: 0, time: 1250, color: "chartreuse"}
    ];

    const [channels, setChannels] = useState([]);
    const [channelName, setChannelName] = useState([]);
    const [selectedChannel, setChannel] = useState(1);
    const [points, setPoints] = useState(null);
    const [allPoints, setAllPoints] = useState([]);
    const [data, setData] = useState({Channel: 1, Point: DUMMY_DATA});
    const [actions, setActions] = useState([]);

    useEffect(() => {


        let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");
        let subModel = findArrayElementById(model.SubModels, ctx.aquarium.submodelId ?? ctx.aquarium.modelId, "id");
        setChannels(subModel.Channels);
        let tmpactions = [];
        tmpactions.push({
                            text: "Load",
                            icon: require("../../assets/loadIcon.png"),
                            name: "bt_load",
                            position: 2,
                            id: 98
                        });
        tmpactions.push({
                            text: "Save",
                            icon: require("../../assets/saveIcon.png"),
                            name: "bt_save",
                            position: 1,
                            id: 99
                        });

        subModel.Channels.map(x => {
            tmpactions.push({text: x.label, icon: require("../../assets/aibot_one.png"), name: x.label, position: 2, id: x.value});
        });

        setActions(tmpactions);

    }, [])

    useEffect(() => {
        let selectedChannelPoint = allPoints.filter(x => x.Channel == selectedChannel);
        if (selectedChannelPoint.length > 0) {
            setData(selectedChannelPoint[0]);
        }
    }, [selectedChannel])
    const getSimulation = async () => {
        let simulationlist = await getData("simulation");
    }

    useEffect(() => {
        if (points != null) {
            let obj = {Channel: selectedChannel, Point: points};
            saveSimulation(obj);
        }
    }, [points])
    const saveSimulation = (obj) => {
        let tmpallpoints = [...allPoints];
        const index = tmpallpoints.findIndex(
            x => obj.Channel === x.Channel
        );
        if (index === -1) {
            tmpallpoints.push(obj);
        } else {
            tmpallpoints[index] = obj;
        }
        setAllPoints(tmpallpoints)
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden={true}></StatusBar>
            <ImageBackground
                source={require("../../assets/bg.jpg")}
                resizeMode='cover'
                style={{width: "100%", height: "100%"}}>
                <SettingsChartScreen data={data.Point} setPoints={setPoints} channel={channelName}/>
            </ImageBackground>
            <View style={styles.buttonContainer}>
                <Icon
                    reverse
                    name='arrow-back-outline'
                    type='ionicon'
                    color='#163dab'
                    raised={true}
                />
                <Icon
                    reverse
                    name='arrow-forward-outline'
                    type='ionicon'
                    color='#163dab'
                    raised={true}
                />
            </View>
            <FloatingAction
                actions={actions}
                position='right'
                onPressItem={name => {
                    let tmp = findArrayElementById(actions, name, "name");
                    setChannelName(name);
                    setChannel(tmp.id);
                }}
            />
        </View>

    );
}

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         backgroundColor: '#fff',
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                         paddingHorizontal: 10
                                     },
                                     buttonContainer: {
                                        position:"absolute",
                                        display:"flex",
                                        justifyContent:'flex-end',
                                        bottom:25,
                                        left:20,
                                        width:'70%',
                                        flexDirection:'row',
                                     },
                                    button: {
                                        position:'relative',
                                        marginRight:'20px',
                                    }
                                 });

