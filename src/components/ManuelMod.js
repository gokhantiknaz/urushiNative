import MainProgress from "../Screens/MainProgress";
import SpectrumChart from "./SpectrumChart";
import {View} from "react-native";
export const ManuelMod = (props) => {

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 2}}>
                <SpectrumChart></SpectrumChart>
            </View>

            <View style={{flex: 3}}>
                <MainProgress></MainProgress>
            </View>

        </View>
    );
}
