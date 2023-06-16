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

export const ManuelMod = (props) => {

    const ctx = useContext(MythContext);
    const [template, setTemplate] = useState(null);
    const [allProgress, setAllProgress] = useState([]);
    const [delay, setDelay] = useState(1);

    var delays = [
        {label: '1Min', value: 1}, {label: '10Min', value: 10}, {label: '30Min', value: 30},
    ]
    const [t] = useTranslation();
    const options = [
        {label: t("on"), value: "1"}, {label: t("off"), value: "0"}
    ];

    const [speed, setSpeed] = useState(0);
    const [name, setName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [allOnOff, setAllOnOff] = useState(0);

    useEffect(() => {
        let all = [{"channel": 1, "value": speed}, {"channel": 2, "value": speed}, {"channel": 3, "value": speed}, {"channel": 4, "value": speed}, {"channel": 5, "value": speed}, {"channel": 6, "value": speed}];
        setAllProgress(all);
        if (speed === 100 || speed === 0) {
            setAllOnOff(speed);
        }
    }, [speed])

    useEffect(() => {
        if (allProgress) {
            setTemplate(allProgress);
        }
    }, [allProgress])

    useEffect(() => {
        console.log("manuelmod:", ctx.manuelTemplate);
        if (ctx.manuelTemplate) {
            setAllProgress(ctx.manuelTemplate);
        }
    }, [ctx.manuelTemplate])

    const complete = (value) => {
        let all = [{"channel": 1, "value": value}, {"channel": 2, "value": value}, {"channel": 3, "value": value}, {"channel": 4, "value": value}, {"channel": 5, "value": value}, {"channel": 6, "value": value}];
        setAllProgress(all);
        setAllOnOff(value);
    }
    const save = async (templateName) => {
        let savedTemplates = await getData("manueltemplates");
        if (savedTemplates == null) {
            let newlist = [];
            let obj = {name: templateName, value: template};
            newlist.push(obj);
            await saveData("manueltemplates", newlist);
        } else {
            let obj = {name: templateName, value: template};
            savedTemplates.push(obj);
            await removeItem("manueltemplates");
            await saveData("manueltemplates", savedTemplates);
        }
        Alert.alert(t("success"));
        setShowModal(false);
    }

    return (<ImageBackground source={images.background} style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 20}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 2, marginTop: 5}}>
                    <Text style={{color: 'white', marginLeft: 20}}>{t("alllights")}</Text>
                </View>
                <View style={{flex: 3, marginRight: 20}}>
                    <SwitchSelector
                        options={options}
                        //textStyle={{backgroundColor:'#AA3D0' }}
                        buttonColor='#AA3D01'
                        initial={1}
                        onPress={value => value == 1 ? setSpeed(100) : setSpeed(0)}
                    />
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
                              thumbRadius={20}
                              thumbBorderWidth={3}
                              sliderWidth={5}
                              isHideSubtitle={true}
                              linearGradient={[
                                  {offset: '0%', color: '#FFD76F'}, {offset: '100%', color: '#FF7345'}
                              ]}
                              onChange={setSpeed}
                />
                {/*<Text style={{color: "white"}}>{speed}</Text>*/}
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

            <View style={{flex: 4}}>
                <ScrollView style={{marginTop: -40}}>
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
                        const templateName = await SheetManager.show("GetName-Sheet", {
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
