import {StatusBar, useWindowDimensions, View} from "react-native";
import * as React from "react";
import {SceneMap, TabView} from "react-native-tab-view";
import TemplateList from "../components/TemplateList";
import {ManuelMod} from "../components/ManuelMod";


const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: '#ff4081'}}/>
);

const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#673ab7'}}/>
);

const renderScene = SceneMap({
                                 ManeulMod: ManuelMod,
                                 template: TemplateList,
                             });
export const ManuelModTab = () => {

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
                                        {key: 'ManeulMod', title: 'Manuel Mod'},
                                        {key: 'template', title: 'Templates'},
                                    ]);
    return (
        <View style={{flex:1}}>
            <StatusBar></StatusBar>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
            />
        </View>
    );
}
