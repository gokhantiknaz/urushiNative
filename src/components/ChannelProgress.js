import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import MotionSlider from 'react-native-motion-slider';


const ChannelProgress = (props) => {
    const [value, setValue] = useState(props.value ?? 0);
    const [returnobj, setReturnObj] = useState({channel: 1, value: 0});

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

                <MotionSlider
                    min={0}
                    max={100}
                    value={value}
                    height={50}
                    width={250}
                    borderRadius={5}
                    units={'%'}
                    backgroundColor={['rgb(253,192,41)', 'rgb(223,135,29)', 'rgb(170,61,1)']}
                    onValueChanged={(x) => setValue(x)}
                    onPressOut={() => setReturnObj({channel: props.Channel, value: value})}
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
                                         justifyContent: "center",
                                         alignItems: 'center'
                                     },
                                     text: {
                                         //marginTop:10,
                                         color: 'white',
                                         width: 120

                                     },
                                     slide: {
                                         flex: 1,
                                         marginLeft: 1,
                                         marginRight: 10,
                                         alignItems: "stretch",
                                         justifyContent: "center"
                                     }
                                 });
