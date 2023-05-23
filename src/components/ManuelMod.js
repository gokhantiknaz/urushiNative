import MainProgress from "../Screens/MainProgress";
import SpectrumChart from "./SpectrumChart";
import {View, Text, ImageBackground, Image, Button, useWindowDimensions} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import images from "../images/images";
import colors from "./colors";
import {RadialSlider} from "react-native-radial-slider";
import {useState} from "react";
import {SceneMap, TabView} from "react-native-tab-view";
import * as React from "react";
import TemplateList from "./TemplateList";

export const ManuelMod = (props) => {

    const options = [
        {label: "ON", value: "1"},
        {label: "OFF", value: "0"}
    ];

    const [speed, setSpeed] = useState(0);

    function setIntesity() {

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
                    <MainProgress></MainProgress>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1,padding:10}}>
                        {/*<Button title="Load"></Button>*/}
                    </View>
                    <View style={{flex: 1,padding:10}}>
                        <Button title="Save"></Button>
                    </View>
                    {/*<SpectrumChart></SpectrumChart>*/}
                </View>
            </View>
        </ImageBackground>
    );
}
