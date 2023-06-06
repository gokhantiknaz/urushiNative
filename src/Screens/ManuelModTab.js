import {useWindowDimensions, View} from "react-native";
import * as React from "react";
import {SceneMap, TabView} from "react-native-tab-view";
import TemplateList from "../components/TemplateList";
import {ManuelMod} from "../components/ManuelMod";
import {useTranslation} from "react-i18next";
import {StatusBar} from "expo-status-bar";
import {useContext, useEffect, useState} from "react";
import {BleContext} from "../../store/ble-context";
import {MythContext} from "../../store/myth-context";
import Loading from "../../loading";

const renderScene = SceneMap({
                                 manuelMod: ManuelMod,
                                 template: TemplateList,
                             });

// const renderScene = ({route}) => {
//     switch (route.key) {
//         case 'manuelMod':
//             return <ManuelMod/>;
//         case 'template':
//             return <TemplateList/>;
//         default:
//             return null;
//     }
// };

export const ManuelModTab = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [t] = useTranslation();
    const [routes] = React.useState([
                                        {key: 'manuelMod', title: 'Manuel Mod'},
                                        {key: 'template', title: t('favs')},
                                    ]);

    const bleCtx = useContext(BleContext);
    const ctx = useContext(MythContext);

    useEffect(() => {
        bleCtx.getBleManagerConnectedDevices().then((res) => {
            console.log(res);// 3 taneden ikisine baglı değil 1ine baglıysa baglı olmayana da baglanmak gerek. kontrolünü ekleyeceğiz.
            if (res.length != ctx.aquarium.deviceList.length) {
                searchAndConnect();
                return;
            }
        });
    }, [])

    useEffect(() => {
        console.log(bleCtx.devices.map(x => {return x.name}));
    }, [bleCtx.devices]);

    const searchAndConnect = async () => {
        if (ctx.aquarium && ctx.aquarium.deviceList && ctx.aquarium.deviceList.length > 0) {
            ctx.aquarium.deviceList.forEach(x => {
                bleCtx.connectDevice(null, x.id).then(result => {
                    console.log("I:", x.name + " connected");
                });
            })
        }
    }

    return (
        <View style={{flex: 1}}>
            <StatusBar hidden={true}></StatusBar>
            {/*<TabView*/}
            {/*    renderTabBar={props => <TabBar {...props} />}*/}
            {/*    navigationState={{index, routes}}*/}
            {/*    renderScene={renderScene}*/}
            {/*    onIndexChange={setIndex}*/}
            {/*    initialLayout={{width: layout.width}}*/}
            {/*/>*/}
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                swipeEnabled={false}
                initialLayout={{width: layout.width}}
            />
        </View>
    );
}
