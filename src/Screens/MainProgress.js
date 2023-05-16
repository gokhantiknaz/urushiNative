import {ImageBackground, View} from "react-native";
import ChannelProgress from "../components/ChannelProgress";
import images from "../images/images";

const MainProgress = (props) => {

    return (
        <ImageBackground source={images.background} style={{flex: 1}}>
            <View style={{flex: 1, padding: 5}}>

                <View style={{flex: 1}}></View>
                <View style={{flex: 2}}>
                    <View style={{height:40}}>
                        <ChannelProgress ChannelName='Royal'></ChannelProgress>
                    </View>
                    <View style={{height:40}}>
                        <ChannelProgress ChannelName='Blue'></ChannelProgress>
                    </View>
                    <View style={{height:40}}>
                        <ChannelProgress ChannelName='Cyan+'></ChannelProgress>
                    </View>
                    <View style={{flex: 1}}>
                        <ChannelProgress ChannelName='Actinic+'></ChannelProgress>
                    </View>
                    <View style={{flex: 1}}>
                        <ChannelProgress ChannelName='He White'></ChannelProgress>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <ChannelProgress ChannelName='Magenta+'></ChannelProgress>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
        ;
}

export default MainProgress;
