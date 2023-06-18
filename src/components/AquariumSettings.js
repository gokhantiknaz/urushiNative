import {ImageBackground, Text} from "react-native";
import images from "../images/images";
import UnderCons from "./UnderCons";

const AquariumSettings = () => {

    return (
        <ImageBackground source={images.background} style={{flex: 1}}>

            <UnderCons></UnderCons>
           
        </ImageBackground>
    );
}
export default AquariumSettings;
