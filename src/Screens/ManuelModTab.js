import {Alert, Text, useWindowDimensions, View} from "react-native";
import * as React from "react";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import TemplateList from "../components/TemplateList";
import {ManuelMod} from "../components/ManuelMod";
import {useTranslation} from "react-i18next";
import {StatusBar} from "expo-status-bar";
import {memo, useContext, useEffect, useState} from "react";
import {BleContext} from "../../store/ble-context";
import {MythContext} from "../../store/myth-context";
import Loading from "../../loading";
import {showMessage} from "react-native/Libraries/Utilities/LoadingView";

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
    const renderScene = (props) => {
        switch (props.route.key) {
            case 'manuelMod':
                return <ManuelMod {...props} setRefresh={setRefresh} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate}/>;
            case 'template':
                return <TemplateList {...props} mod={'manuel'} refresh={refresh} setSelectedTemplate={setSelectedTemplate}/>;
            default:
                return null;
        }
    };

    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [t] = useTranslation();
    const [routes] = React.useState([
                                        {key: 'manuelMod', title: t('manuel')},
                                        {key: 'template', title: t('favs')},
                                    ]);

    const [loading, setLoading] = useState(false);

    const bleCtx = useContext(BleContext);
    const ctx = useContext(MythContext);

    useEffect(() => {
        if (ctx.aquarium.deviceList.length == 0) {
            Alert.alert(t("warn"), t("noDevice"));
            return;
        }
        searchAndConnect();

    }, [])
    const searchAndConnect = async () => {
        setLoading(true);
        if (ctx.aquarium && ctx.aquarium.deviceList && ctx.aquarium.deviceList.length > 0) {
            let connectedDevices= await bleCtx.getBleManagerConnectedDevices();
            showMessage(t("connecting", "load"));

            ctx.aquarium.deviceList.forEach(x => {
                //baglı değilse.
                // bleCtx.getBleManagerConnectedDevices().then(result => {
                //     if (result.find(d => d.id == x.id)) {
                //         console.log("I:", x.name + " already connected");
                //     } else {
                //         bleCtx.connectDevice(null, x.id).then(res => {}).catch(er => {});
                //     }
                // })

                if(connectedDevices.find(d => d.id == x.id))
                    console.log("I:", x.name + " already connected");
                else
                {
                    bleCtx.connectDevice(null, x.id).then(result => {
                        console.log("I:", x.name + " connected");
                    }).catch(error => {
                        console.log("connect device error:", error);
                    });
                }
            });

            setTimeout(function () { setLoading(false);}, ctx.aquarium.deviceList.length * 1000)
        }
    }
    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{marginTop: 0, backgroundColor: '#484848'}}
        />
    );

    if (loading) {
        return <Loading>{<Text>Connecting to saved devices</Text>}</Loading>
    }
    return (
        <View style={{flex: 1}}>
            <StatusBar hidden={true}></StatusBar>
            <TabView
                navigationState={{index, routes}}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                swipeEnabled={false}
                initialLayout={{width: layout.width}}
            />
        </View>
    );
}


