import React, {useContext, useDebugValue, useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, StyleSheet, Text, View, Button, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingsChartScreen from "../components/SettingsChartScreen";
import RadioForm from "react-native-simple-radio-button";
import {FloatingAction} from "react-native-floating-action";
import {getData, removeItem, saveData} from "../../data/useAsyncStorage";
import {MythContext} from "../../store/myth-context";
import {Models} from "../../data/Model";
import {findArrayElementById, getDateFromHours, minToTime} from "../utils";
import {Icon} from '@rneui/themed';
import {BleContext} from "../../store/ble-context";
import {useTranslation} from "react-i18next";
import {SheetManager} from "react-native-actions-sheet";
import {useIsMounted} from "../../Hooks/useIsMounted";
import images from "../images/images";

export const Simulation = (props) => {

    const ctx = useContext(MythContext);

    const DUMMY_DATA = [
        // <--- This is the data that is being used to create the draggable dots
        {power: 0, time: 480, color: "lightsalmon"},
        {power: 90, time: 720, color: "darkorange"},
        {power: 90, time: 1080, color: "darkturquoise"},
        {power: 0, time: 1250, color: "chartreuse"}
    ];

    const [channels, setChannels] = useState([]);
    const [channelName, setChannelName] = useState([]);
    const [selectedChannel, setChannel] = useState(-1);
    const [points, setPoints] = useState(null);
    const [allPoints, setAllPoints] = useState([]);
    const [data, setData] = useState({Channel: -1, Point: null});
    const [actions, setActions] = useState([]);
    const [allProgress, setAllProgress] = useState([{channel: 1, value: 0}, {channel: 2, value: 0}, {channel: 3, value: 0}, {channel: 4, value: 0}, {channel: 5, value: 0}, {channel: 6, value: 0}]);
    const [bytes, setBytes] = useState([]);

    const [t] = useTranslation();
    let ctxBle = useContext(BleContext);

    useEffect(() => {
        let template = props?.route?.params
        if (template) {
            setAllPoints(template.template);
        }
        let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");
        let tmpactions = [];
        tmpactions.push({
                            text: "Save",
                            icon: require("../../assets/saveIcon.png"),
                            name: "bt_save",
                            position: 1,
                            id: 99
                        });

        tmpactions.push({
                            text: "Back",
                            icon: require("../../assets/back.png"),
                            name: "bt_back",
                            position: 20,
                            id: 100
                        });
        if (model && model.SubModels) {

            let subModel = findArrayElementById(model.SubModels, ctx.aquarium.submodelId ?? ctx.aquarium.modelId, "id");
            let tmpallpoints = [...allPoints];
            if (template) {
                tmpallpoints = template.template;
            }
            subModel?.Channels.forEach(ch => {
                const index = tmpallpoints.findIndex(
                    x => ch.Channel === x.Channel
                );
                if (index === -1) {
                    tmpallpoints.push({Channel: ch.Channel, Point: DUMMY_DATA});
                }
            })
            setAllPoints(tmpallpoints);
            setChannels(subModel.Channels);
            subModel.Channels.map(x => {
                tmpactions.push({text: x.label, icon: images.transparentIcon, name: x.label, position: 2, id: x.value});
            });
        }

        setChannelName("Royal");
        setChannel(1);
        setActions(tmpactions);
        createEmptyArray();

        searchAndConnect();
    }, [])

    useEffect(() => {
        let selectedChannelPoint = allPoints.filter(x => x.Channel == selectedChannel);
        if (selectedChannelPoint.length > 0) {
            setData(selectedChannelPoint[0]);
        }
    }, [selectedChannel])

    useEffect(() => {
        if (points != null) {
            console.log("sendindg", points);
            let obj = {Channel: selectedChannel, Point: points};
            sendSimulation(obj);
        }
    }, [points])
    const sendSimulation = (obj) => {
        let tmpallpoints = [...allPoints];

        const index = tmpallpoints.findIndex(
            x => obj.Channel === x.Channel
        );
        if (index === -1) {
            tmpallpoints.push(obj);
        } else {
            tmpallpoints[index] = obj;
        }
        setAllPoints(tmpallpoints);
        let data = [...bytes];

        let byteSira = 1;

        tmpallpoints.forEach(ch => {

            data[++byteSira] = (ch.Channel);
            ch.Point.forEach(point => {
                let power = point.power;
                let time2 = minToTime(point.time);
                let date = getDateFromHours(time2);
                data[++byteSira] = power; // güç
                data[++byteSira] = date.getHours(); // gün dogum hour
                data[++byteSira] = date.getMinutes(); // gün dogum min
            });
        });

        setBytes(data);
        sendData(data);
    }

    const searchAndConnect = async () => {
        if (ctx.aquarium && ctx.aquarium.deviceList && ctx.aquarium.deviceList.length > 0) {
            ctx.aquarium.deviceList.forEach(x => {
                //baglı değilse.
                ctxBle.getBleManagerConnectedDevices().then(result => {
                    if (result.find(d => d.id == x.id)) {
                        console.log("I:", x.name + " already connected");
                    } else {
                        ctxBle.connectDevice(null, x.id).then(result => {
                            console.log("I:", x.name + " connected");
                        });
                    }
                })
            })
        }
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
    const createEmptyArray = () => {
        let bytes = [];

        for (let i = 0; i < 83; i++) {
            bytes.push(0);
        }
        bytes[0] = (0x65);
        bytes[1] = (0x01);

        // 1.Kanal 2
        // 2.Kanal 15
        // 3.Kanal 28
        // 4.Kanal 41
        // 5.Kanal 54
        // 6.Kanal 67


        bytes[82] = (0x66);
        setBytes(bytes);
        return bytes;
    }

    function setActiveChannel(operator) {
        let selected = selectedChannel;
        if (operator === "next") {
            if (selected >= 6) {
                selected = 6;
            } else {
                selected = selected + 1;
            }
        } else {
            if (selected <= 1) {
                selected = 1;
            } else {
                selected = selected - 1;
            }
        }
        let tmp = findArrayElementById(actions, selected, "id");
        if (tmp && tmp.id <= 90) {
            setChannelName(tmp.name);
            setChannel(selected);
        }
    }

    const saveTemplate = async (templateName) => {
        let savedTemplates = await getData("autotemplates");
        if (savedTemplates == null) {
            let newlist = [];
            let obj = {name: templateName, value: allPoints};
            newlist.push(obj);
            await saveData("autotemplates", newlist);
        } else {
            let obj = {name: templateName, value: allPoints};
            savedTemplates.push(obj);
            await removeItem("autotemplates");
            await saveData("autotemplates", savedTemplates);
        }
        Alert.alert(t("Success"), t("Success"));
        props.setRefresh(true);

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
                <TouchableOpacity onPress={() => {setActiveChannel("prev")}}>
                    <Icon reverse name='arrow-back-outline' type='ionicon' color='#163dab' raised={true}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setActiveChannel("next")}}>
                    <Icon reverse name='arrow-forward-outline' type='ionicon' color='#163dab' raised={true}/>
                </TouchableOpacity>
            </View>
            <FloatingAction
                actions={actions}
                position='right'
                onPressItem={name => {
                    let tmp = findArrayElementById(actions, name, "name");
                    if (tmp.id <= 90) {
                        setChannel(tmp.id);
                        setChannelName(name);
                    }

                    if (tmp.id > 90) {
                        if (tmp.id == 99) {
                            SheetManager.show("savetemplate", {
                                payload: {value: t("templatename")},
                            }).then(result => {
                                // console.log(result);
                                if (result && result.length > 0) {
                                    saveTemplate(result);
                                }
                            });
                        } else {
                            if (tmp.id == 100) {
                                props.navigation.goBack();
                            }
                        }
                    }
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
                                         position: "absolute",
                                         display: "flex",
                                         justifyContent: 'flex-end',
                                         bottom: 25,
                                         left: 20,
                                         width: '70%',
                                         flexDirection: 'row',
                                     },
                                     button: {
                                         position: 'relative',
                                         marginRight: '20px',
                                     }
                                 });

