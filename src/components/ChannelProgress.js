import {ImageBackground, StyleSheet, Text, View} from "react-native";
import Slider from '@react-native-community/slider';
import {useState} from "react";
import colors from "./colors";
import images from "../images/images";

const ChannelProgress = (props) => {
    const [slideStartingValue, setSlideStartingValue] = useState(0);
    const [slideCompletionValue, setSlideCompletionValue] = useState(0);

    const [value, setValue] = useState(props.Value ?? 0);
    return (

        <View style={styles.container}>
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
                        setSlideCompletionValue(value);
                    }}
            />
        </View>

    );
}
export default ChannelProgress;
const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         marginTop: 80,
                                         flexDirection: "row",
                                         alignItems: 'flex-start',
                                         marginRight: 20,

                                     },
                                     text: {
                                         marginEnd: 10,
                                         marginLeft: 10,
                                         color: 'white',
                                         width:120
                                     },
                                     slide: {
                                         flexGrow: 1,
                                     }
                                 });
