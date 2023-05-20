import {Text, StyleSheet, StatusBar, View,} from "react-native";
import FanButton from "./index";
import {useState} from "react";

const SprialMenu = () => {

    const [index, setIndex] = useState(0);
    const state = {
        index: -1
    };

    return (<View style={styles.container}>
        <StatusBar barStyle={'default'}/>

        <View style={styles.content}>
            <FanButton updateIndex={(index) => setIndex(index)}/>
            <Text style={{marginTop: 36, fontSize: 18, fontWeight: '300'}}>MYTH LIGHTS</Text>
        </View>
    </View>);
}

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         backgroundColor: 'black',
                                     },
                                     title: {
                                         paddingTop: 100,
                                         alignItems: 'center',
                                         justifyContent: 'center'
                                     },
                                     content: {
                                         flex: 1,
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                     }
                                 });

export default SprialMenu;
