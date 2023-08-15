import * as React from "react";
import MainProgress from "../Screens/MainProgress";
import {View, Text, ImageBackground, Image, Button, useWindowDimensions, TextInput, StyleSheet, Alert, ScrollView} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import images from "../images/images";
import colors from "./colors";
import {RadialSlider} from "react-native-radial-slider";
import {useContext, useEffect, useRef, useState} from "react";
import {getData, removeItem, saveData} from "../../data/useAsyncStorage";
import Dialog from "react-native-dialog";
import {useTranslation} from "react-i18next";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import {SheetManager} from "react-native-actions-sheet";
import {MythContext} from "../../store/myth-context";
import {Button_1} from "./export";

import {createEmptyArrayManuel, findArrayElementById, sendData} from "../utils";
import {Models} from "../../data/Model";
import {BleContext} from "../../store/ble-context";


export const ManuelMod = (props) => {

    // [0] = 0x65
    // [1] = 6
    // [2] = 'delay time'
    // [3] = '1.kanal'
    // [4] = '2.kanal'
    // [5] = '3.kanal'
    // [6] = '4.kanal'
    // [7] = '5.kanal'
    // [8] = '6.kanal'
    // [9] = '7.kanal'
    // [10]= '8.kanal'
    // [11] = (0x66);
    const ctx = useContext(MythContext);
    const ctxBle = useContext(BleContext);
    const [allProgress, setAllProgress] = useState([]);
    const [delay, setDelay] = useState(1);

    var delays = [
        {label: '1Min', value: 1}, {label: '10Min', value: 10}, {label: '30Min', value: 30},
    ]
    const [t] = useTranslation();
    const options = [
        {label: t("on"), value: "1"}, {label: t("off"), value: "0"}, {label: "Stop", value: "2"}
    ];

    const [speed, setSpeed] = useState(0);
    const [allOnOff, setAllOnOff] = useState(99);

    useEffect(() => {
        let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");
        let selectedsubModel = findArrayElementById(model.SubModels, ctx.aquarium.subModel ?? ctx.aquarium.modelId, "Model");
        let tmp = selectedsubModel.Channels.map(x => {return {channel: x.Channel, value: 0}});
        setAllProgress(tmp);
    }, [])

    useEffect(() => {
        if (props.selectedTemplate) {
            setAllProgress(props.selectedTemplate);
        }
    }, [props.selectedTemplate])

    const complete = (value) => {
        // all progress burda boşa atıyor. oncomplete metodundan kaynaklıdır diye düşünüyorum. o yüzden tekrar setliyorum.
        let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");
        let selectedsubModel = findArrayElementById(model.SubModels, ctx.aquarium.subModel ?? ctx.aquarium.modelId, "Model");
        let tmp = selectedsubModel.Channels.map(x => {return {channel: x.Channel, value: value == -1 ? 0 : value}});
        setAllProgress(tmp);
        setAllOnOff(value);
    }
    const save = async (templateName) => {
        let savedTemplates = await getData("manueltemplates");

        if (savedTemplates == null) {
            let newlist = [];
            let obj = {name: templateName, value: allProgress};
            newlist.push(obj);
            await saveData("manueltemplates", newlist);
        } else {
            let obj = {name: templateName, value: allProgress};
            savedTemplates.push(obj);
            await removeItem("manueltemplates");
            await saveData("manueltemplates", savedTemplates);
        }
        Alert.alert(t("Success"), t("Success"));
        props.setRefresh(true);
    }

    useEffect(() => {
        if (allProgress) {
            sendAllProgress(allProgress);
        }
    }, [allProgress])

    function sendAllProgress(newState, stopManuelChannel) {
        if (allOnOff == 99) {
            return;
        }
        let tmpArray = [];
        if (newState) {
            tmpArray = newState
        } else {
            tmpArray = allProgress;
        }

        if (tmpArray.length > 0) {
            let data = createEmptyArrayManuel(false, null, null, delay);
            if (props.allOnOff == -1 || stopManuelChannel) {
                data[2] = 0;// manual modu kapatma
            }

            tmpArray.forEach(x => {
                data[x.channel + 2] = props.allOnOff == 0 ? 0 : parseInt(x.value); //0.1.2 kanallar dolu oldugundan...
            });

            sendData(data, ctxBle, ctx);
        }

        props.setSelectedTemplate(null);
    }


    return (<ImageBackground source={images.background} style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 20}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                {/*<View style={{flex: 2, marginTop: 5}}>*/}
                {/*    <Text style={{color: 'white', marginLeft: 20}}>{t("alllights")}</Text>*/}
                {/*</View>*/}
                <View style={{flex: 3, marginRight: 20, marginLeft: 20}}>
                    <SwitchSelector
                        hasPadding
                        options={options}
                        //textStyle={{backgroundColor:'#AA3D0' }}
                        buttonColor='rgb(223,135,29)'
                        initial={0}
                        onPress={(value) => {

                            //eğer 1 ise all progress i aynen gonder.
                            //0 ise all progress i değiştirme. tmp bi array yap 0 value ile gonder.

                            if (value == 1) {
                                setAllOnOff(1);
                                let tmp = allProgress.map(x => {return {...x}});
                                sendAllProgress(tmp);
                            }
                            if (value == 0) {
                                let tmp = allProgress.map(x => {return {...x, value: 0}});
                                sendAllProgress(tmp);
                                setAllOnOff(0);
                            }
                            if (value == 2) {
                                // manual mod end
                                setAllOnOff(-1);
                                sendAllProgress(allProgress, true);
                            }
                        }}

                    />
                </View>

                {/*<View style={{alignContent:"space-between"}}>*/}
                {/*    <CountDown delayTime={delay}></CountDown>*/}
                {/*</View>*/}

            </View>
            <View style={{flex: 4, alignItems: 'center'}}>
                {/*https://www.npmjs.com/package/react-native-radial-slider2*/}
                {/*https://github.com/SimformSolutionsPvtLtd/react-native-radial-slider*/}
                <RadialSlider titleStyle={{color: 'white'}} unit='%' title={t('totalintensity')}
                              value={speed}
                              valueStyle={{color: "white"}}
                              variant={'radial-circle-slider'}
                              min={0}
                              max={100}
                              onComplete={(value) => {complete(value);}}
                    // valueStyle={{fontSize:60,color:"black",alignItems:"center",justifyContent:"center", marginTop:20}}
                              thumbColor={'#FF7345'}
                              unitStyle={{marginLeft: 0, color: "white", fontWeight: "bold", marginTop: 10}}
                              thumbRadius={15}
                              thumbBorderWidth={3}
                              sliderWidth={1}
                              isHideSubtitle={true}
                              linearGradient={[
                                  {offset: '0%', color: '#FFD76F'}, {offset: '100%', color: '#FF7345'}
                              ]}
                              onChange={setSpeed}
                />

            </View>

            <View style={{flex: 2, alignItems: 'center', marginTop: 70}}>
                <RadioForm formHorizontal={true} animation={true}>
                    {delays.map((obj, i) => (<RadioButton labelHorizontal={true} key={obj.value}>
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <RadioButtonInput
                            obj={obj}
                            index={obj.value}
                            isSelected={delay === obj.value}
                            onPress={(value) => {setDelay(value)}}
                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonOuterColor={delay === obj.value ? '#2196f3' : 'white'}
                            buttonSize={20}
                            buttonOuterSize={30}
                            buttonWrapStyle={{marginLeft: 5}}
                        />
                        <RadioButtonLabel
                            obj={obj}
                            index={obj.value}
                            labelHorizontal={true}
                            onPress={(value) => {setDelay(value)}}
                            labelStyle={{fontSize: 10, color: 'white'}}
                            labelWrapStyle={{}}
                        />
                    </RadioButton>))}
                </RadioForm>
            </View>

            <View style={{flex: 4, paddingLeft: 2}}>
                <ScrollView style={{marginTop: -40}}>
                    <MainProgress allProgress={allProgress} setAllProgress={setAllProgress} allOnOff={allOnOff} setAllOnOff={setAllOnOff} ></MainProgress>
                </ScrollView>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, padding: 10}}>
                    {/*<Button title="Load"></Button>*/}
                </View>
                <View style={{flex: 1, padding: 10}}>
                    <Button_1 title={t("Save")} onPress={async () => {
                        // https://rnas.vercel.app/guides/getdata
                        const templateName = await SheetManager.show("savetemplate", {
                            payload: {value: t("templatename")},
                        });
                        if (templateName && templateName.length > 0) {
                            save(templateName);
                        }
                    }}></Button_1>
                </View>
                {/*<SpectrumChart></SpectrumChart>*/}
            </View>
        </View>
    </ImageBackground>);
}

