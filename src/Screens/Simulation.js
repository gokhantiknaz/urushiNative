import React, {useContext, useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler} from 'react-native';
import SettingsChartScreen from "../components/SettingsChartScreen";
import {FloatingAction} from "react-native-floating-action";
import {getAllKeys, getData, removeItem, saveData} from "../../data/useAsyncStorage";
import {MythContext} from "../../store/myth-context";
import {Models} from "../../data/Model";
import {createEmptyArrayManuel, findArrayElementById, getDateFromHours, minToTime, sendData} from "../utils";
import {Icon} from '@rneui/themed';
import bleContext, {BleContext} from "../../store/ble-context";
import {useTranslation} from "react-i18next";
import {SheetManager} from "react-native-actions-sheet";
import images from "../images/images";
import Loading from "../../loading";

export const Simulation = (props) => {

    const ctx = useContext(MythContext);
    const [t] = useTranslation();
    const ctxBle = useContext(BleContext);
    let DUMMY_DATA = [
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
    const [loading, setLoading] = useState(false);
    const [activeSim, setActiveSim] = useState(null);
    const [isSimSent, setisSimSent] = useState(false);
    const [subModel, setSubModel] = useState({});
    const [background, setBackground] = useState(require("../../assets/bg.jpg"));
    const [scanForDevices, setScanForDevices] = useState(false);

    useEffect(() => {
        const isAllConnected = async () => {
            let allConnected = true;
            let connected = await ctxBle.getBleManagerConnectedDevices();

            ctx.aquarium.deviceList.forEach(x => {
                if (connected.find(a => a.id == x.id)) {

                } else {
                    allConnected = false;
                }
            });

            return allConnected;
        }

        isAllConnected().then(result => {
            setScanForDevices(!result);
            if (!result) {
                const stopTimer = setTimeout(() => {
                    ctxBle.stopScan();
                    setLoading(false);
                    clearTimeout(stopTimer);
                }, ctx.aquarium.deviceList.length * 4000);
                ctxBle.startScan();
            }
        });

        let activeTmp = [];
        const getActiveSim = async () => {
            try {
                const active = await getData("activeSim");
                activeTmp = active;
                setActiveSim(active);
            } catch (err) {
                console.log(err);
            }
        };

        getActiveSim();

        let params = props?.route?.params
        let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");
        let tmpPoints = [];
        let tmpactions = [];

        if (params.template) {
            tmpPoints = params.template;
            setAllPoints(params.template);
        }

        if (params.activePoints) {
            tmpPoints = params.activePoints;
            setAllPoints(params.activePoints);
        }

        if (model && model.SubModels) {
            let subModel = findArrayElementById(model.SubModels, ctx.aquarium.subModel ?? "A", "Model");
            setSubModel(subModel);
            if (tmpPoints.length == 0) {
                subModel?.Channels.forEach(ch => {
                    tmpPoints.push({Channel: ch.Channel, Point: DUMMY_DATA});
                });

                setAllPoints(tmpPoints);
            }

            subModel.Channels.map(x => {
                tmpactions.push({
                    text: x.label,
                    icon: images.newLogo,
                    name: x.label,
                    position: 3,
                    id: x.value,
                    background: x.background
                });
            });


            setChannelName(subModel.Channels[0].label);
        }

        tmpactions.push({
            text: "Send",
            icon: require("../../assets/blue-check.png"),
            name: "bt_send",
            position: 1,
            id: 98,

        });
        tmpactions.push({
            text: "Save",
            icon: require("../../assets/saveIcon.png"),
            name: "bt_save",
            position: 2,
            id: 99,

        });
        tmpactions.push({
            text: "Back",
            icon: require("../../assets/back.png"),
            name: "bt_back",
            position: 20,
            id: 100,
        });


        setChannel(1);
        setActions(tmpactions);
        createEmptyArray();
        // searchAndConnect();
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'YES', onPress: () => {
                        goBack();
                    }
                },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();

    }, [])

    useEffect(() => {
        let selectedChannelPoint = allPoints.filter(x => x.Channel == selectedChannel);
        if (selectedChannelPoint.length > 0) {
            setData(selectedChannelPoint[0]);
        }
        if (subModel && subModel.Channels) {
            let subBackground = findArrayElementById(subModel?.Channels, selectedChannel, "Channel");

            setBackground(subBackground.background);
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


            let dataWillSent = createEmptyArrayManuel(true, obj.Channel, powerWillBeSent, 10);
            sendData(dataWillSent, ctxBle, ctx);
        }
    }, [points])

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

    const sendSimulation = async () => {
        let tmpallpoints = [...allPoints];
        let data = [...bytes];
        let byteSira = 1;

        let DUMMY_DATA = [
            // <--- This is the data that is being used to create the draggable dots
            {power: 0, time: 480, color: "lightsalmon"},
            {power: 90, time: 720, color: "darkorange"},
            {power: 90, time: 1080, color: "darkturquoise"},
            {power: 0, time: 1250, color: "chartreuse"}
        ];

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

        await removeItem("activeSim");
        await saveData("activeSim", data);

        await removeItem("activePoints");
        await saveData("activePoints", allPoints);

        setisSimSent(true);
        await sendData(data, ctxBle, ctx);
    }
    const searchAndConnect = async () => {
        setLoading(true);
        if (ctx.aquarium && ctx.aquarium.deviceList && ctx.aquarium.deviceList.length > 0) {
            let connectedDevices = await ctxBle.getBleManagerConnectedDevices();
            ctx.aquarium.deviceList.forEach(x => {
                //baglı değilse.
                if (connectedDevices.find(d => d.id == x.id)) {
                    console.log("I:", x.name + " already connected");
                } else {
                    ctxBle.connectDevice(null, x.id).then(result => {
                        console.log("I:", x.name + " connected");
                    }).catch(error => {
                        console.log("connect device error:", error);
                    });
                }
                // ctxBle.getBleManagerConnectedDevices().then(result => {
                //     if (result.find(d => d.id == x.id)) {
                //         console.log("I:", x.name + " already connected");
                //     } else {
                //         ctxBle.connectDevice(null, x.id).then(result => {
                //             console.log("I:", x.name + " connected");
                //         }).catch(error => {
                //             console.log("connect device error:", error);
                //         });
                //     }
                //     showMessage(x.name + " device Connected", "load")
                // }).catch(error => {
                //     console.log("getconnecteddevice error", error);
                // })
            })

            setTimeout(function () {
                setLoading(false);
            }, ctx.aquarium.deviceList.length * 1000)
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!scanForDevices) {
            return;
        }
        if (ctxBle.devices.length == 0) {
            return;
        }

        let deviceList = [...ctx.aquarium.deviceList];

        setLoading(true);

        console.log("found:", ctxBle.foundDevice.id);
        const searchThenConnect = async () => {

            // bağlı ise search te bulunmayacak.
            let selected = findArrayElementById(deviceList, ctxBle.foundDevice.id, "id");
            let index = ctx.aquarium.deviceList.findIndex(x => x.id == selected.id);
            let connectedList = await ctxBle.getBleManagerConnectedDevices();

            // bulunan cihaz kayıtlı armatürlerde varsa

            selected.connected = false;
            selected.online = false;

            if (ctxBle.foundDevice.id == selected.id) {
                selected.online = true;
            }
            if (selected) {
                if (connectedList.find(a => a.id == ctxBle.foundDevice)) {
                    selected.connected = true;
                    console.log("I:", ctxBle.foundDevice.id + " already connected");
                } else {
                    ctxBle.connectDevice(null, ctxBle.foundDevice.id).then(result => {
                        selected.connected = true;
                        console.log("I:", ctxBle.foundDevice.id + " connected");
                    }).catch(error => {
                        console.log("connect device error:", error);
                    });
                }

                deviceList[index] = selected
                let newAq = {...ctx.aquarium, deviceList: deviceList};
                ctx.setAquarium(newAq);
            }
        }

        searchThenConnect().then(result => {

        }).catch(error => {
            console.log(error);
        });
    }, [ctxBle.devices, scanForDevices])

    const createEmptyArray = () => {
        let bytes = [];
        let now = new Date();
        for (let i = 0; i < 110; i++) {
            bytes.push(0);
        }
        bytes[0] = (0x65);
        bytes[1] = (0x01);

        // 1.Kanal byte[2]
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
        bytes[108] = props?.route?.params.lunar; // lunar Mod Off/On
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

    function goBack() {
        if (!isSimSent && activeSim) {
            let activeTmp = [...activeSim];
            if (activeTmp) {
                activeTmp[106] = new Date().getHours();
                activeTmp[107] = new Date().getMinutes();
                sendData(activeTmp, ctxBle, ctx);
            }
        }
        props.navigation.goBack();
    }

    if (loading) {
        return <Loading>{<Text style={{color: "white"}}>Connecting to devices...</Text>}</Loading>
    }
    return (
        <View style={styles.container}>
            <StatusBar hidden={true}></StatusBar>
            <ImageBackground
                // source={require("../../assets/bg.jpg")}
                source={background}
                resizeMode='cover'
                style={{width: "100%", height: "100%"}}>
                <SettingsChartScreen data={data.Point} setPoints={setPoints} channel={channelName}
                                     bg={selectedChannel.background}/>
            </ImageBackground>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                    setActiveChannel("prev")
                }}>
                    <Icon reverse name='arrow-back-outline' type='ionicon' color='#163dab' raised={true}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setActiveChannel("next")
                }}>
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

                    if (tmp.id == 98) {
                        //let obj = {Channel: selectedChannel, Point: points};
                        sendSimulation();
                    }
                    if (tmp.id == 99) {
                        SheetManager.show("savetemplate", {
                            payload: {value: t("templatename")},
                        }).then(result => {
                            if (result && result.length > 0) {
                                saveTemplate(result);
                            }
                        });
                    }
                    if (tmp.id == 100) {

                        goBack();
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

