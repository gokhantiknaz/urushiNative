import {ImageBackground, View, StyleSheet} from "react-native";
import ChannelProgress from "../components/ChannelProgress";
import images from "../images/images";
import {useState} from "react";

const MainProgress = (props) => {

    const[value,setValue]  = useState(0);
    return (

            <View style={{flex: 1, padding: 5}}>

                <View style={{flex: 1}}></View>
                <View style={styles.progressContainer}>
                    <View>
                        <ChannelProgress Value={props.allValue} ChannelName='Royal' setValue={(e)=>{setValue(e)}}></ChannelProgress>
                    </View>
                    <View>
                        <ChannelProgress Value={props.allValue} ChannelName='Blue'></ChannelProgress>
                    </View>
                    <View>
                        <ChannelProgress Value={props.allValue} ChannelName='Cyan+'></ChannelProgress>
                    </View>
                    <View>
                        <ChannelProgress Value={props.allValue} ChannelName='Actinic+'></ChannelProgress>
                    </View>
                    <View>
                        <ChannelProgress Value={props.allValue} ChannelName='He White'></ChannelProgress>
                    </View>
                    <View>
                        <ChannelProgress Value={props.allValue} ChannelName='Magenta+'></ChannelProgress>
                    </View>
                </View>
            </View>

    )
        ;
}

export default MainProgress;
const styles = StyleSheet.create({
    progressContainer: {
        flex:2,
        display: "flex",
        justifyContent:"flex-end",
    },
});
