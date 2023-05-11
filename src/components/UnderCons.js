import {Image, Text, View, StyleSheet} from "react-native";
import {useAssets} from "expo-asset";
import images from "../images/images";


const UnderCons = () => {

    return (
        <View style={styles.container}>
            <Image
                style={styles.stretch}
                source={images.undercons}
            />
        </View>);
}

export default UnderCons;

const styles = StyleSheet.create({
                                     container: {
                                         paddingTop: 50,
                                     },
                                     stretch: {
                                         width: 400,
                                         height: 400, resizeMode: 'center'
                                     },
                                 });
