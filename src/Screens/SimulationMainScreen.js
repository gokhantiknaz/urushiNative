import {Image, View, StyleSheet, ImageBackground, useWindowDimensions, Text} from "react-native";
import images from "../images/images";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {StatusBar} from "expo-status-bar";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {ManuelMod} from "../components/ManuelMod";
import TemplateList from "../components/TemplateList";
import {Simulation} from "./Simulation";
import SwitchSelector from "react-native-switch-selector";


const SimulationMainScreen = () => {

    const MainScreen = () => {
        return <>
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                    <View style={{flex: 2, marginTop: 5}}>
                        <Text style={{color: 'white', marginLeft: 20}}>{t("lunaar")}</Text>
                    </View>
                    <View style={{flex: 3, marginRight: 20}}>
                        <SwitchSelector
                            options={options}
                            //textStyle={{backgroundColor:'#AA3D0' }}
                            buttonColor='#AA3D01'
                            initial={1}
                            onPress={val => {console.log(val)}}
                        />
                    </View>
                </View>
                <Image style={{flex: 2, height: '100%', width: '100%', resizeMode: 'contain'}} source={images.simulation}/>
                <View style={{flex: 4}}>

                </View>
            </View></>
    }
    const renderScene = SceneMap({
                                     auto: MainScreen,
                                     templates: TemplateList,
                                 });

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [t] = useTranslation();
    const [routes] = React.useState([
                                        {key: 'auto', title: 'Auto'},
                                        {key: 'templates', title: t('templates')},
                                    ]);

    const options = [
        {label: t("on"), value: "1"}, {label: t("off"), value: "0"}
    ];
    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{marginTop: 0, backgroundColor: '#5D92C4'}}
        />
    );
    return (
        <ImageBackground source={images.background} style={{flex: 1}}>
            <StatusBar hidden={true}></StatusBar>

            <TabView
                navigationState={{index, routes}}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                swipeEnabled={false}
                initialLayout={{width: layout.width}}
            />

        </ImageBackground>

    );
}
export default SimulationMainScreen;

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1
                                     }
                                 })
