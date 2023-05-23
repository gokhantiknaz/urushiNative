import MainProgress from "../Screens/MainProgress";
import SpectrumChart from "./SpectrumChart";
import {View, Text, ImageBackground, Image, Button, useWindowDimensions, TextInput, StyleSheet, Alert} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import images from "../images/images";
import colors from "./colors";
import {RadialSlider} from "react-native-radial-slider";
import {useEffect, useState} from "react";

import * as React from "react";

import {getData, removeItem, saveData} from "../../data/useAsyncStorage";
import Dialog from "react-native-dialog";
import {useTranslation} from "react-i18next";

export const ManuelMod = (props) => {

    const [template, setTemplate] = useState(null);
    const [allProgress, setAllProgress] = useState([]);

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
        setTemplate(allProgress);
    }, [allProgress])

    const save = async () => {
        let savedTemplates = await getData("manueltemplates");
        if (savedTemplates == null) {
            let newlist = [];
            let obj = {name: name, value: template};
            newlist.push(obj);
            await saveData("manueltemplates", newlist);
        } else {
            let obj = {name: name, value: template};
            console.log(savedTemplates);
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
                    {/*<SpectrumChart></SpectrumChart>*/}
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                    {/*https://www.npmjs.com/package/react-native-radial-slider2*/}
                    {/*https://github.com/SimformSolutionsPvtLtd/react-native-radial-slider*/}
                    <RadialSlider titleStyle={{color: 'white'}} unit='%' title='Total Intensity' value={speed} min={0} max={100} onChange={setSpeed}
                                  onComplete={setIntesity}
                    />
                    {/*<Text style={{color: "white"}}>{speed}</Text>*/}
                </View>

                <View style={{flex: 4}}>
                    <MainProgress allProgress={allProgress} setAllProgress={setAllProgress}></MainProgress>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, padding: 10}}>
                        {/*<Button title="Load"></Button>*/}
                    </View>
                    <View style={{flex: 1, padding: 10}}>
                        <Button title={t("Save")} onPress={() => { setShowModal(true)}}></Button>
                    </View>
                    {/*<SpectrumChart></SpectrumChart>*/}
                </View>
            </View>
            <Dialog.Container visible={showModal} contentStyle={{height: 150, width: '100%', backgroundColor: 'white'}}>

                <Dialog.Description>
                    <View>
                        <Text>{t("templatename")}</Text>
                        <TextInput
                            style={{ borderColor: 'gray', borderWidth: 1 }}
                            placeholderTextColor={"black"}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={() => {
                    setName('');
                    setShowModal(false);
                }}/>
                <Dialog.Button label="Ok" onPress={() => { save(); }}/>
            </Dialog.Container>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
                                     dialog: {
                                         flex: 1,
                                         width: '100%'
                                     }
                                 });
