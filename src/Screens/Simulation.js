import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingsChartScreen from "../components/SettingsChartScreen";
import constants from "../../data/constants";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import {FloatingAction} from "react-native-floating-action";
import {getData} from "../../data/useAsyncStorage";

export const Simulation = () => {

    const DUMMY_DATA = [
        // <--- This is the data that is being used to create the draggable dots
        {power: 0, time: 480, color: "lightsalmon"},
        {power: 50, time: 720, color: "darkorange"},
        {power: 50, time: 1080, color: "darkturquoise"},
        {power: 0, time: 1250, color: "chartreuse"}
    ];


    const actions = [
        {
            text: "Load",

            icon: require("../../assets/loadIcon.png"),
            name: "bt_load",
            position: 2
        },
        {
            text: "Save",
            icon: require("../../assets/saveIcon.png"),
            name: "bt_save",
            position: 1
        }
    ];
    const [selectedChannel, setChannel] = useState(1);
    const [points, setPoints] = useState(null);
    const [allPoints, setAllPoints] = useState([]);
    const [data, setData] = useState({Channel: 1, Point: DUMMY_DATA});

    var channels = [
        {label: constants.Channel1, value: 1},
        {label: constants.Channel2, value: 2},
        {label: constants.Channel3, value: 3},
        {label: constants.Channel4, value: 4},
        {label: constants.Channel5, value: 5},
        {label: constants.Channel6, value: 6},
    ];

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
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={{flex: 1, marginTop: 10}}>
                    {/*https://www.npmjs.com/package/react-native-simple-radio-button*/}
                    <RadioForm
                        radio_props={channels}
                        initial={0}
                        formHorizontal={true}
                        labelHorizontal={false}
                        animation={true}
                        onPress={(value) => {setChannel(value)}}
                    />

                </View>
                <ImageBackground
                    source={require("../../assets/bg.jpg")}
                    resizeMode='cover'
                    style={{flex: 15, width: "100%"}}>
                    <SettingsChartScreen data={data.Point} setPoints={setPoints}/>
                </ImageBackground>
                <FloatingAction
                    actions={actions}
                    position='right'
                    onPressItem={name => {
                        console.log(`selected button: ${name}`);
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         backgroundColor: '#fff',
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                         paddingHorizontal: 10
                                     }
                                 });

