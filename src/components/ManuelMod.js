import * as React from "react";
import MainProgress from "../Screens/MainProgress";
import {View, Text, ImageBackground, Image, Button, useWindowDimensions, TextInput, StyleSheet, Alert} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import images from "../images/images";
import colors from "./colors";
import {RadialSlider} from "react-native-radial-slider";
import {useEffect, useState} from "react";
import {getData, removeItem, saveData} from "../../data/useAsyncStorage";
import Dialog from "react-native-dialog";
import {useTranslation} from "react-i18next";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import {SheetManager} from "react-native-actions-sheet";

export const ManuelMod = (props) => {

    const [template, setTemplate] = useState(null);
    const [allProgress, setAllProgress] = useState([]);
    const [delay, setDelay] = useState(1);

    var delays = [
        {label: '1Min', value: 1},
        {label: '10Min', value: 10},
        {label: '30Min', value: 30},
    ]

    const options = [
        {label: "ON", value: "1"},
        {label: "OFF", value: "0"}
    ];

    const [t] = useTranslation();
    const [speed, setSpeed] = useState(0);
    const [name, setName] = useState("");
    const [showModal, setShowModal] = useState(false);

    function setIntesity() {

    }

    useEffect(() => {
        if (allProgress) {
            setTemplate(allProgress);
        }

    }, [allProgress])
    const save = async (templateName) => {
        console.log(template);
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

    return (
        <ImageBackground source={images.background} style={{flex: 1}}>
            <View style={{flex: 1, marginTop: 30}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 2, marginTop: 5}}>
                        <Text style={{color: 'white', marginLeft: 20}}>All Lights:</Text>
                    </View>
                    <View style={{flex: 3, marginRight: 20}}>
                        <SwitchSelector
                            options={options}
                            initial={0}
                            onPress={value => console.log(`Call onPress with value: ${value}`)}
                        />
                    </View>
                </View>
                <View style={{flex: 4, alignItems: 'center'}}>
                    {/*https://www.npmjs.com/package/react-native-radial-slider2*/}
                    {/*https://github.com/SimformSolutionsPvtLtd/react-native-radial-slider*/}
                    <RadialSlider titleStyle={{color: 'white'}} unit='%' title='Total Intensity' value={speed} min={0} max={100} onChange={setSpeed}
                                  onComplete={setIntesity}
                    />
                    {/*<Text style={{color: "white"}}>{speed}</Text>*/}
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <RadioForm
                        formHorizontal={true}
                        animation={true}
                    >
                        {
                            delays.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={obj.value}>
                                    {/*  You can set RadioButtonLabel before RadioButtonInput */}

                                    <RadioButtonInput
                                        obj={obj}
                                        index={obj.value}
                                        isSelected={delay === obj.value}
                                        onPress={(value) => {setDelay(value)}}
                                        borderWidth={1}
                                        buttonInnerColor={'#e74c3c'}
                                        buttonOuterColor={delay === obj.value ? '#2196f3' : '#000'}
                                        buttonSize={30}
                                        buttonOuterSize={40}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{marginLeft: 10}}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={obj.value}
                                        labelHorizontal={true}
                                        onPress={(value) => {setDelay(value)}}
                                        labelStyle={{fontSize: 10, color: 'white'}}
                                        labelWrapStyle={{}}
                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>
                </View>

                <View style={{flex: 4}}>
                    <MainProgress allProgress={allProgress} setAllProgress={setAllProgress} delayTime={delay}></MainProgress>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, padding: 10}}>
                        {/*<Button title="Load"></Button>*/}
                    </View>
                    <View style={{flex: 1, padding: 10}}>
                        <Button title={t("Save")} onPress={async () => {
                            // https://rnas.vercel.app/guides/getdata
                            const templateName = await SheetManager.show("GetName-Sheet", {
                                payload: {value: t("templatename")},
                            });
                            if (templateName && templateName.length > 0) {
                                save(templateName);
                            }
                        }}></Button>
                    </View>
                    {/*<SpectrumChart></SpectrumChart>*/}
                </View>
            </View>
            {/*<Dialog.Container visible={showModal} style={styles.dialog} contentStyle={{height: 150, width: '100%', backgroundColor: '#9BDEE8'}}>*/}
            {/*    <Dialog.Description>*/}
            {/*        <View style={{backgroundColor: '#9BDEE8', width: 300}}>*/}
            {/*            <Text style={{width: '100%'}}>{t("templatename")}</Text>*/}
            {/*            <TextInput*/}
            {/*                style={{borderColor: 'gray', borderWidth: 1}}*/}
            {/*                placeholderTextColor={"black"}*/}
            {/*                value={name}*/}
            {/*                onChangeText={setName}*/}
            {/*            />*/}
            {/*        </View>*/}

            {/*    </Dialog.Description>*/}
            {/*    <Dialog.Button label="Cancel" onPress={() => {*/}
            {/*        setName('');*/}
            {/*        setShowModal(false);*/}
            {/*    }}/>*/}
            {/*    <Dialog.Button label="Ok" onPress={() => { save(); }}/>*/}
            {/*</Dialog.Container>*/}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
                                     dialog: {
                                         flex: 1,
                                         backgroundColor: "#fff",
                                         alignItems: "center",
                                         justifyContent: "center",
                                     }
                                 });