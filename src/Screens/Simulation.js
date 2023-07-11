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
import {createEmptyArrayManuel, findArrayElementById, getDateFromHours, minToTime, sendData} from "../utils";
import {Icon} from '@rneui/themed';
import {BleContext} from "../../store/ble-context";
import {useTranslation} from "react-i18next";
import {SheetManager} from "react-native-actions-sheet";
import {useIsMounted} from "../../Hooks/useIsMounted";
import images from "../images/images";
import {showMessage} from "react-native/Libraries/Utilities/LoadingView";

export const Simulation = (props) => {

    const ctx = useContext(MythContext);
    const [t] = useTranslation();
    const ctxBle = useContext(BleContext);
    const DUMMY_DATA = [
        // <--- This is the data that is being used to create the draggable dots
        {power: 0, time: 480, color: "lightsalmon"},
        {power: 90, time: 720, color: "darkorange"},
        {power: 90, time: 1080, color: "darkturquoise"},
        {power: 0, time: 1250, color: "chartreuse"}
    ];

    const [channelName, setChannelName] = useState([]);
    const [selectedChannel, setChannel] = useState(-1);
    const [points, setPoints] = useState(null);
    const [allPoints, setAllPoints] = useState([]);
    const [data, setData] = useState({Channel: -1, Point: null});
    const [actions, setActions] = useState([]);
    const [bytes, setBytes] = useState([]);
    const [issimulationSent, setIsSimulationSent] = useState(false);

    const [manuelBytes, setManuelBytes] = useState([]);

    const [isRealTime, setIsRealTime] = useState(false);

    useEffect(() => {

        let params = props?.route?.params
        if (params.template) {
            setAllPoints(params.template);
        }

        if (params.isRealTime) {
            setIsRealTime(params.isRealTime);
        }

        setManuelBytes(createEmptyArrayManuel(true, 10));

        let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");
        let tmpactions = [];

        tmpactions.push({
                            text: "Send",
                            icon: require("../../assets/blue-check.png"),
                            name: "bt_send",
                            position: 1,
                            id: 98
                        });
        tmpactions.push({
                            text: "Save",
                            icon: require("../../assets/saveIcon.png"),
                            name: "bt_save",
                            position: 2,
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
            if (params.template) {
                tmpallpoints = params.template;
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

            subModel.Channels.map(x => {
                tmpactions.push({text: x.label, icon: images.transparentIcon, name: x.label, position: 3, id: x.value});
            });
        }

        setChannelName("Royal");
        setChannel(1);
        setActions(tmpactions);
        createEmptyArray();

        searchAndConnect();

        return () => {

        }
    }, [])

    useEffect(() => {
        let selectedChannelPoint = allPoints.filter(x => x.Channel == selectedChannel);
        if (selectedChannelPoint.length > 0) {
            setData(selectedChannelPoint[0]);
        }
    }, [selectedChannel])

    useEffect(() => {
        if (points != null) {
            let obj = {Channel: selectedChannel, Point: points};
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

            let selectedPoint = findArrayElementById(obj.Point, true, "selected");
            let powerWillBeSent = Math.round(selectedPoint.power);
            if (isRealTime) {
                powerWillBeSent = calculateSimulation(obj);
            }

            // console.log("fist:", manuelBytes)
            // let newByteArray = [...manuelBytes];
            //
            // console.log(obj.Channel);
            // newByteArray[obj.Channel + 2] = powerWillBeSent;
            // console.log("then:", newByteArray)
            // setManuelBytes(newByteArray);
            // sendData(newByteArray);

            // ali 255 i yaptıktan sonra bunu kullanacağız.
            let dataWillSent = createEmptyArrayManuel(true, obj.Channel, powerWillBeSent, 10);
            sendData(dataWillSent);
        }
    }, [points])
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

    function calculateSimulation(point) {
        let startTime = parseInt(point.Point[0].time);
        let max1Time = parseInt(point.Point[1].time);
        let max2Time = parseInt(point.Point[2].time);
        let endTime = parseInt(point.Point[3].time);
        let now = new Date().getHours() * 60 + new Date().getMinutes();
        let selectedPoint = findArrayElementById(point.Point, true, "selected");
        let power = 0;

        if (now <= max1Time) {
            let dkArtis = 1 * points[1].power / (max1Time - startTime);
            power = dkArtis * (now - startTime);
            console.log("1.aralık", power);
        } else {
            if (now > max2Time && now < endTime) {
                let dkArtis = 1 * points[2].power / (endTime - max2Time);
                power = dkArtis * (endTime - now);
                console.log("3.aralık:", power);
            } else {
                if (max1Time < now && now < max2Time) {
                    let dkArtis = (points[2].power - points[1].power) / (max2Time - max1Time);
                    power = points[1].power + (now - max1Time) * dkArtis;
                    console.log("2.aralık:", power);
                }
            }
        }
        if (now >= endTime) {
            power = 1;
        }

        if (now <= startTime) {
            power = 1;
        }

        return Math.round(power);
    }

    const sendSimulation = () => {
        let tmpallpoints = [...allPoints];
        let data = [...bytes];
        let byteSira = 1;

        tmpallpoints.forEach(ch => {
            data[++byteSira] = (ch.Channel);
            ch.Point.forEach(point => {
                let power = point.power;
                let time2 = minToTime(point.time);
                let date = getDateFromHours(time2);
                data[++byteSira] = Math.round(power); // güç
                data[++byteSira] = date.getHours(); // gün dogum hour
                data[++byteSira] = date.getMinutes(); // gün dogum min
            });
        });
        setBytes(data);
        console.log("all Simulation:", data);
        setIsSimulationSent(true);
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
                    showMessage(x.name + " device Connected", "load")
                })
            })
        }
    }
    const createEmptyArray = () => {
        let bytes = [];
        let now = new Date();
        for (let i = 0; i < 110; i++) {
            bytes.push(0);
        }
        bytes[0] = (0x65);
        bytes[1] = (0x01);

        // 1.Kanal byte[2]]
        // 2.Kanal byte[15]
        // 3.Kanal byte[28]
        // 4.Kanal byte[41]
        // 5.Kanal byte[54]
        // 6.Kanal byte[67]
        // 7.kanal byte[80]
        // 8.kanal byte[93]
        // 8.kanal end byte[106]

        bytes[106] = now.getHours();
        bytes[107] = now.getMinutes();
        bytes[108] = (0x00); // lunar Mod Off/On
        bytes[109] = (0x66);
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
            saveData("autotemplates", newlist);
        } else {
            let obj = {name: templateName, value: allPoints};
            savedTemplates.push(obj);
            removeItem("autotemplates").then(result => {
                saveData("autotemplates", savedTemplates);
            });
        }
        Alert.alert(t("Success"), t("Success"));
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
                            if (tmp.id == 98) {
                                //let obj = {Channel: selectedChannel, Point: points};
                                sendSimulation();
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

