import * as React from "react";
import MainProgress from "../Screens/MainProgress";
import {View, Text, ImageBackground, Image, Button, useWindowDimensions, TextInput, StyleSheet, Alert, ScrollView} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import images from "../images/images";
import colors from "./colors";
import {RadialSlider} from "react-native-radial-slider";
import {useContext, useEffect, useState} from "react";
import {getData, removeItem, saveData} from "../../data/useAsyncStorage";
import Dialog from "react-native-dialog";
import {useTranslation} from "react-i18next";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import {SheetManager} from "react-native-actions-sheet";
import {MythContext} from "../../store/myth-context";
import {Button_1} from "./export";
import {CountDown} from "./CountDown";


export const ManuelMod = (props) => {

    const ctx = useContext(MythContext);
    const [allProgress, setAllProgress] = useState([]);
    const [delay, setDelay] = useState(1);

    var delays = [
        {label: '1Min', value: 1}, {label: '10Min', value: 10}, {label: '30Min', value: 30},
    ]
    const [t] = useTranslation();
    const options = [
        {label: t("on"), value: "1"}, {label: t("off"), value: "0"},{label:"Stop",value: "2"}
    ];

    const [speed, setSpeed] = useState(0);
    const [allOnOff, setAllOnOff] = useState(0);

    useEffect(() => {
        if (props.selectedTemplate) {
            setAllProgress(props.selectedTemplate);
        }
    }, [props.selectedTemplate])

    const complete = (value) => {
        let all = [{"channel": 1, "value": value}, {"channel": 2, "value": value}, {"channel": 3, "value": value}, {"channel": 4, "value": value}, {"channel": 5, "value": value}, {"channel": 6, "value": value}];
        setAllProgress(all);
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

    return (<ImageBackground source={images.background} style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 20}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 2, marginTop: 5}}>
                    <Text style={{color: 'white', marginLeft: 20}}>{t("alllights")}</Text>
                </View>
                <View style={{flex: 3, marginRight: 30}}>
                    <SwitchSelector
                        options={options}
                        //textStyle={{backgroundColor:'#AA3D0' }}
                        buttonColor='#AA3D01'
                        initial={1}
                        onPress={(value) => {
                            console.log(value);
                            if (value == 1) {
                                complete(100);
                                setSpeed(100)
                            } else {
                                setSpeed(0);
                                complete(0);
                            }
                        }}
                    />
                </View>

                <View style={{alignContent:"space-between"}}>
                    <CountDown delayTime={delay}></CountDown>
                </View>

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
                              onComplete={(value) => {complete(value)}}
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

            <View style={{flex: 2, alignItems: 'center', marginTop: 10}}>
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

            <View style={{flex: 4}}>
                <ScrollView style={{marginTop: -70}}>
                    <MainProgress allProgress={allProgress} setAllProgress={setAllProgress} delayTime={delay} allOnOff={allOnOff}></MainProgress>
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

