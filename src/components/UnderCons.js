import {Image, Text, View, StyleSheet, StatusBar} from "react-native";
import {useAssets} from "expo-asset";
import images from "../images/images";
import colors from "./colors";


const UnderCons = () => {

    return (
        <View style={styles.container}>
            <StatusBar hidden={true}></StatusBar>
            <Image
                style={styles.stretch}
                source={images.undercons}
            />
        </View>);
}

export default UnderCons;

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         paddingTop: 50,
                                         backgroundColor: colors.black,

                                     },
                                     stretch: {
                                         width: 400,
                                         height: 400,
                                         resizeMode: 'center'
                                     },
                                 });
