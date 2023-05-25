import {ImageBackground, View, StyleSheet} from "react-native";
import ChannelProgress from "../components/ChannelProgress";
import images from "../images/images";
import {useContext, useEffect, useState} from "react";
import {MythContext} from "../../store/myth-context";

const MainProgress = (props) => {
    const ctx = useContext(MythContext);
    const [progressObject, setProgressObject] = useState({channel: '', value: 0});
    const [allProgress, setAllProgress] = useState([{channel: 1, value: 0}, {channel: 2, value: 0}, {channel: 3, value: 0}, {channel: 4, value: 0}, {channel: 5, value: 0}, {channel: 6, value: 0}]);


    useEffect(() => {
        if (progressObject) {
            if (!allProgress) {
                return;
            }
            const newState = allProgress.map(obj => {
                if (obj.channel === progressObject.channel) {
                    return {...obj, value: progressObject.value};
                }
                return obj;
            });

            setAllProgress(newState);
            props.setAllProgress(newState);
        }

    }, [progressObject])

    useEffect(() => {
        if (ctx.manuelTemplate) {
            setAllProgress(ctx.manuelTemplate);
            props.setAllProgress(ctx.manuelTemplate);
        }
    }, [ctx.manuelTemplate])

    const getValue = (channel) => {

        let filtered = ctx.manuelTemplate?.filter(x => {
            return x.channel === channel;
        })
        if (filtered?.length > 0) {
            return filtered[0].value;
        }
        return 0;
    }

    return (
        <View style={{flex: 1, padding: 5}}>
            <View style={styles.progressContainer}>
                <View>
                    <ChannelProgress value={getValue(1)} ChannelName='Royal' Channel={1} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
                <View>
                    <ChannelProgress value={getValue(2)} ChannelName='Blue' Channel={2} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
                <View>
                    <ChannelProgress value={getValue(3)} ChannelName='Cyan+' Channel={3} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
                <View>
                    <ChannelProgress value={getValue(4)} ChannelName='Actinic+' Channel={4} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
                <View>
                    <ChannelProgress value={getValue(5)} ChannelName='He White' Channel={5} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
                <View>
                    <ChannelProgress value={getValue(6)} ChannelName='Magenta+' Channel={6} setValue={(e) => {setProgressObject(e)}}></ChannelProgress>
                </View>
            </View>
        </View>

    )
        ;
}

export default MainProgress;
const styles = StyleSheet.create({
                                     progressContainer: {
                                         flex: 2,
                                         display: "flex",
                                         justifyContent: "flex-end",
                                     },
                                 });
