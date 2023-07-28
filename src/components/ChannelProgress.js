import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {Slider} from "@rneui/base";


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
                <View style={{flex: 2}}>
                    <Text style={styles.text}>
                        {props.ChannelName}: {value} %
                    </Text>
                </View>

                <View style={{flex: 3}}>

                    <Slider
                        style={{width: 170}}
                        minimumTrackTintColor={'rgb(253,192,41)'}
                        maximumTrackTintColor={'rgb(170,61,1)'}
                        thumbTouchSize={{width: 40, height: 40}}
                        thumbStyle={{width: 30, height: 30, backgroundColor: 'rgb(223,135,29)'}}
                        thumbTintColor={'rgb(223,135,29)'}

                        trackStyle={styles.track}
                        //thumbStyle={styles.thumb}
                        // minimumTrackTintColor='#e6a954'

                        step={1}
                        value={value}
                        minimumValue={0}
                        maximumValue={100}
                        onValueChange={(value) => setValue(value)} onSlidingComplete={() => setReturnObj({channel: props.Channel, value: value})}/>
                </View>

            </View>
        </View>

    );
}
export default ChannelProgress;
const styles = StyleSheet.create({
                                     container: {
                                         padding: 0,
                                         flex:1
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
                                     },

                                     track: {
                                         height: 14,
                                         borderRadius: 1,
                                         backgroundColor: 'white',
                                         borderColor: '#9a9a9a',
                                         borderWidth: 1,
                                     },
                                     thumb: {
                                         width: 20,
                                         height: 20,
                                         borderRadius: 2,
                                         backgroundColor: '#eaeaea',
                                         borderColor: '#9a9a9a',
                                         borderWidth: 1,
                                     }

                                 });
