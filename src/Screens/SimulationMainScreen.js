import {Image, View, StyleSheet, ImageBackground, useWindowDimensions, Text, TouchableOpacity, TextInput, Alert, Switch} from "react-native";
import images from "../images/images";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {StatusBar} from "expo-status-bar";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import TemplateList from "../components/TemplateList";
import SwitchSelector from "react-native-switch-selector";
import {useContext, useDebugValue, useEffect, useState} from "react";
import {MythContext} from "../../store/myth-context";
import {findArrayElementById} from "../utils";
import {Models} from "../../data/Model";
import {CheckBox} from '@rneui/themed';
import {getAllKeys, getData, removeItem} from "../../data/useAsyncStorage";

const SimulationMainScreen = ({navigation}) => {

    const [t] = useTranslation();
    const [lightDetail, setlightdetail] = useState({activeChannels: 6, sunRise: "08:00", night: "24:00", activeHours: 0, maxPar: 0, maxLumen: 0});
    const [refresh, setRefresh] = useState(false);
    const ctx = useContext(MythContext);
    const [isRealTime, setIsRealTime] = useState(false);
    const [lunar, setLunar] = useState(0);
    const [indexLunar, setIndexLunar] = useState(1);
    const [activePoints, setActivePoints] = useState([]);
    const toggleCheckbox = () => setIsRealTime(!isRealTime);


    useEffect(() => {

        if (ctx.aquarium.deviceList.length == 0) {
            Alert.alert(t("warn"), t("noDevice"));
        }
        let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");

        if (model && model.SubModels) {
            let subModel = findArrayElementById(model.SubModels, ctx.aquarium.submodelId ?? ctx.aquarium.modelId, "id");
            let tmp = {...lightDetail};
            tmp.activeChannels = subModel.Channels.length;
            tmp.sunRise = "----";
            tmp.night = "----";
            getData("activeSim").then(result => {
                let hour = result[4];
                let min = result[5];

                let hour2 = result[13];
                let min2 = result[14];

                tmp.sunRise = hour + ":" + min;
                tmp.night = hour2 + ":" + min2;
            });

            setlightdetail(tmp);
        }

        getData("activePoints").then(result => {
            if (result != null) {
                setActivePoints(result);
            }
        });
    }, [])

    const options = [
        {label: t("off"), value: 0}, {label: t("on"), value: 1}
    ];
    const MainScreen = () => {
        return <>
            <View style={styles.container}>
                {/*<View style={{flex: 1, flexDirection: 'row', marginTop: 10, alignItems: "center"}}>*/}
                {/*    <View style={{flex: 2, marginTop: 5, alignItems: "center"}}>*/}
                {/*        <Text style={{color: 'white', marginLeft: 20}}>{t("lunar")}</Text>*/}
                {/*    </View>*/}
                {/*    <View style={{flex: 3, marginRight: 20}}>*/}
                {/*        <SwitchSelector*/}
                {/*            hasPadding*/}
                {/*            options={options}*/}
                {/*            //textStyle={{backgroundColor:'#AA3D0' }}*/}
                {/*            buttonColor='rgb(223,135,29)'*/}
                {/*            initial={indexLunar}*/}
                {/*            value={indexLunar}*/}
                {/*            onPress={(value) => {*/}
                {/*                setIndexLunar(value);*/}
                {/*                setLunar(value);*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </View>*/}
                {/*</View>*/}
                <TouchableOpacity style={{flex: 2}} onPress={() => {
                    navigation.navigate("simulationdetail", {
                        isRealTime: isRealTime,
                        lunar: lunar,
                        activePoints: activePoints
                    })
                }}>
                    <Image style={{flex: 2, height: '100%', width: '100%', resizeMode: 'contain'}} source={images.simulation}/>
                </TouchableOpacity>

                <View style={{flex: 4}}>

                    <View style={styles.row}>
                        <View style={{flex: 2}}>
                            <Text style={{color: "black"}}>{t('activechannel')}</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <Text style={{color: "black"}}>{lightDetail.activeChannels}</Text>
                        </View>
                    </View>

                    {/*<View style={styles.row}>*/}
                    {/*    <View style={{flex: 2}}>*/}
                    {/*        <Text style={{color: "white"}}>{t('sunrise')}</Text>*/}
                    {/*    </View>*/}
                    {/*    <View style={{flex: 2}}>*/}
                    {/*        <Text style={{color: "white"}}>{lightDetail.sunRise}</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    {/*<View style={styles.row}>*/}
                    {/*    <View style={{flex: 2}}>*/}
                    {/*        <Text style={{color: "white"}}>{t('night')}</Text>*/}
                    {/*    </View>*/}
                    {/*    <View style={{flex: 2}}>*/}
                    {/*        <Text style={{color: "white"}}>{lightDetail.night}</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    {/*<View style={styles.row}>*/}
                    {/*    <View style={{flex: 2}}>*/}
                    {/*        <Text style={{color: "white"}}>{t('activehours')}</Text>*/}
                    {/*    </View>*/}
                    {/*    <View style={{flex: 2}}>*/}
                    {/*        <Text style={{color: "white"}}>{lightDetail.activeHours}</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    {/*<View style={styles.row}>*/}
                    {/*    <View style={{flex: 2}}>*/}
                    {/*        <Text style={{color: "white"}}>{t('maxpar')}</Text>*/}
                    {/*    </View>*/}
                    {/*    <View style={{flex: 2}}>*/}
                    {/*        <Text style={{color: "white"}}>{lightDetail.maxPar}</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    {/*<View style={styles.row}>*/}
                    {/*    <View style={{flex: 2}}>*/}
                    {/*        <Text style={{color: "white"}}>{t('maxlumen')}</Text>*/}
                    {/*    </View>*/}
                    {/*    <View style={{flex: 2}}>*/}
                    {/*        <Text style={{color: "white"}}>{lightDetail.maxLumen}</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    <View style={styles.row}>
                        {/*<View style={{flex: 2}}>*/}
                        {/*    <Text style={{color: "white"}}>Real Time Data</Text>*/}
                        {/*</View>*/}

                        <CheckBox
                            size={18}
                            containerStyle={{width: "50%", backgroundColor: "trans"}}
                            textStyle={{color: "black"}}
                            title="Real Time Simulation"
                            checked={isRealTime}
                            onPress={toggleCheckbox}
                            // Use ThemeProvider to make change for all checkbox
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor="orange"
                        />
                    </View>
                </View>
            </View></>
    }
    const renderScene = (props) => {

        switch (props.route.key) {
            case 'auto':
                return <MainScreen {...props} setRefresh={setRefresh}/>;
            case 'templates':
                return <TemplateList {...props} mod={'auto'} refresh={refresh}/>;
            default:
                return null;
        }
    };

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
                                        {key: 'auto', title: 'Auto'},
                                        {key: 'templates', title: t('templates')},
                                    ]);


    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{marginTop: 0, backgroundColor: '#484848'}}
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
                                     },
                                     row: {
                                         flexDirection: "row", marginTop: 15, marginLeft: 15
                                     }
                                 })
