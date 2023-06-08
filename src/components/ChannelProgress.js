import {ImageBackground, StyleSheet, Text, View} from "react-native";
import Slider from '@react-native-community/slider';
import {useContext, useEffect, useState} from "react";
import colors from "./colors";
import {BleContext} from "../../store/ble-context";
import images from "../images/images";
import MotionSlider from 'react-native-motion-slider';

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


    return (

        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.text}>
                    {props.ChannelName}: {value} %
                </Text>
                {/*<Slider style={styles.slide}*/}
                {/*        value={value}*/}
                {/*        minimumValue={0}*/}
                {/*        maximumValue={100}*/}
                {/*        thumbImage={images.sliderIcon}*/}
                {/*        step={1}*/}
                {/*        minimumTrackTintColor={colors.test2}*/}
                {/*        maximumTrackTintColor="white"*/}
                {/*        onValueChange={setValue}*/}
                {/*        onSlidingStart={value => {*/}
                {/*            setSlideStartingValue(value);*/}
                {/*        }}*/}
                {/*        onSlidingComplete={e => {*/}
                {/*            setReturnObj({channel: props.Channel, value: e});*/}
                {/*            setSlideCompletionValue(value);*/}
                {/*        }}*/}
                {/*/>*/}

                <MotionSlider
                    min={0}
                    max={100}

                    height={45}
                    width={250}
                    // valueBackgroundColor={'rgb(188,182,174)'}
                    // valueColor='white'
                    value={value}
                    // decimalPlaces={1}
                    borderRadius={20}
                    units={'%'}
                    backgroundColor={['rgb(253,192,41)', 'rgb(223,135,29)', 'rgb(170,61,1)']}
                    onValueChanged={(value) => setValue(value)}
                    onPressOut={() => setReturnObj({channel: props.Channel, value: value})}
                    // onDrag={() => console.log('Dragging')}
                />
            </View>
        </View>

    );
}
export default ChannelProgress;
const styles = StyleSheet.create({
                                     container: {
                                         padding: 0,

                                     },
                                     item: {
                                         display: "flex",
                                         flexDirection: "row",
                                         justifyContent:"center",
                                         alignItems: 'center'
                                     },
                                     text: {
                                         // marginTop:10,
                                         color: 'white',
                                         width: 120

                                     },
                                     slide: {
                                         flex: 1,
                                         marginLeft: 10,
                                         marginRight: 10,
                                         alignItems: "stretch",
                                         justifyContent: "center"
                                     }
                                 });
