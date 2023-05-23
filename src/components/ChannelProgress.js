import {ImageBackground, StyleSheet, Text, View} from "react-native";
import Slider from '@react-native-community/slider';
import {useContext, useEffect, useState} from "react";
import colors from "./colors";
import images from "../images/images";
import {BleContext} from "../../store/ble-context";

const ChannelProgress = (props) => {
    const bleCtx = useContext(BleContext);
    const [slideStartingValue, setSlideStartingValue] = useState(0);
    const [slideCompletionValue, setSlideCompletionValue] = useState(0);

    const [value, setValue] = useState(props.value ?? 0);

    const [returnobj, setReturnObj] = useState({});

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    useEffect(() => {
        props.setValue(returnobj);
    }, [returnobj])

    useEffect(() => {
        sendData();
    }, [slideCompletionValue])

    const sendData = async () => {
        let connectedDevices = await bleCtx.getBleManagerConnectedDevices();
        connectedDevices.forEach(x => {
            bleCtx.sendDatatoDevice(x, slideCompletionValue.toString());
        });
    }

    return (

        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.text}>
                    {props.ChannelName}: {value} %
                </Text>
                <Slider style={styles.slide}
                        value={value}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        minimumTrackTintColor={colors.test2}
                        maximumTrackTintColor="white"
                        onValueChange={setValue}
                        onSlidingStart={value => {
                            setSlideStartingValue(value);
                        }}
                        onSlidingComplete={value => {
                            setReturnObj({channel: props.Channel, value: value});
                            setSlideCompletionValue(value);
                        }}
                />
            </View>
        </View>

    );
}
export default ChannelProgress;
const styles = StyleSheet.create({
                                     container: {
                                         padding: 10,

                                     },
                                     item: {
                                         display: "flex",
                                         flexDirection: "row",

                                     },
                                     text: {
                                         marginEnd: 10,
                                         color: 'white',
                                         width: 120,

                                     },
                                     slide: {
                                         flexGrow: 1,
                                     }
                                 });
