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
    const [channelData, setChannelData] = useState({});

    useEffect(() => {
        getData("simulationData")
    }, [selectedChannel])
    var channels = [
        {label: constants.Channel1, value: 1},
        {label: constants.Channel2, value: 2},
        {label: constants.Channel3, value: 3},
        {label: constants.Channel4, value: 4},
        {label: constants.Channel5, value: 5},
        {label: constants.Channel6, value: 6},
    ];
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

                    {/* To create radio buttons, loop through your array of options */}
                    {/*<RadioForm*/}
                    {/*    formHorizontal={true}*/}
                    {/*    animation={true}*/}
                    {/*>*/}
                    {/*    {*/}
                    {/*        channels.map((obj, i) => (*/}
                    {/*            <RadioButton labelHorizontal={true} key={i}>*/}
                    {/*                /!*  You can set RadioButtonLabel before RadioButtonInput *!/*/}
                    {/*                <RadioButtonInput*/}
                    {/*                    obj={obj}*/}
                    {/*                    index={i}*/}

                    {/*                    onPress={(e) => {console.log(e)}}*/}
                    {/*                    borderWidth={1}*/}
                    {/*                    buttonInnerColor={'#e74c3c'}*/}

                    {/*                    buttonSize={10}*/}
                    {/*                    buttonOuterSize={15}*/}
                    {/*                    buttonStyle={{}}*/}
                    {/*                    buttonWrapStyle={{marginLeft: 5}}*/}
                    {/*                />*/}
                    {/*                <RadioButtonLabel*/}
                    {/*                    obj={obj}*/}
                    {/*                    index={i}*/}
                    {/*                    labelHorizontal={false}*/}
                    {/*                    onPress={(e) => {console.log(e)}}*/}
                    {/*                    labelStyle={{fontSize: 10, color: '#2ecc71'}}*/}
                    {/*                    labelWrapStyle={{}}*/}
                    {/*                />*/}
                    {/*            </RadioButton>*/}
                    {/*        ))}*/}

                    {/*</RadioForm>*/}

                </View>
                <ImageBackground
                    source={require("../../assets/bg.jpg")}
                    resizeMode='cover'
                    style={{flex: 15, width: "100%"}}
                >
                    <SettingsChartScreen data={channelData}/>
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

