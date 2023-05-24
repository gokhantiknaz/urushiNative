import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "../Screens/Login";
import NewAquarium from "../Screens/NewAquarium";
import Welcome_screen from '../Screens/Welcome';
import LightDetail from "../Screens/LightDetail";
import AquarimDetailMenu from "../components/AquarimDetailMenu";
import UnderCons from "../components/UnderCons";
import colors from "../components/colors";
import {useTranslation} from "react-i18next";
import SprialMenu from "../components/spiralMenu/SprialMenu";

import BLEDevices from "../Screens/BLEDevices";
import {ManuelModTab} from "../Screens/ManuelModTab";
import TemplateList from "../components/TemplateList";
import {Simulation} from "../Screens/Simulation";


const Stack = createStackNavigator();

function AuthScreens() {
    const [t] = useTranslation();
    return (

        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/*<Stack.Screen name="spiralMenux" component={SprialMenu}/>*/}
            {/*<Stack.Screen name="BleScreen" component={BLEScreen} options={{title: 'BLE Devce Scanner'}}/>*/}
            {/*<Stack.Screen name="chart" component={SpectrumChart}/>*/}
            <Stack.Screen name="home" component={Welcome_screen} options={{
                title: t('Welcome'), headerShown: false, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>
            <Stack.Screen name="manuelModTab" component={ManuelModTab} options={{
                title: t('ManuelMod'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>
            <Stack.Screen name="NewAquarium" component={NewAquarium} options={{
                title: t('NewAquarium'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>
            <Stack.Screen name="detail" component={AquarimDetailMenu} options={{
                title: t('AquariumDetail'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>
           <Stack.Screen name="lights" component={LightDetail} options={{
                title: t('Lights'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>

            <Stack.Screen name="simulation" component={Simulation} options={{
                title: t('simulation'), headerShown: false, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>

            <Stack.Screen name="login" component={Login}/>
            <Stack.Screen name="UnderCons" component={UnderCons}/>
            <Stack.Screen name="spiralMenu" component={SprialMenu}/>
            <Stack.Screen name="BleDevices" component={BLEDevices}/>
        </Stack.Navigator>
    );
}

function AppScreens() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name="chatListScreen" component={ChatListScreen} /> */}
            {/*<Stack.Screen name="choice" component={Choice}/>*/}
            {/*<Stack.Screen name="createChat" component={CreateChat}/>*/}
            {/*<Stack.Screen name="createimage" component={CreateImage}/>*/}
            {/*<Stack.Screen name="colorPicker" component={ColorPicker}/>*/}
        </Stack.Navigator>
    );
}

export default function Home() {

    // const [loading, setLoading] = useState(false);
    // const bleCtx = useContext(BleContext); //get ble context
    //
    // React.useEffect(() => {
    //     startsScan();
    // }, [])
    //
    //
    // const startsScan = async () => { // start scanning for bluetooth devices
    //
    //     if (loading) {
    //         setLoading(false);
    //         bleCtx.stopScan();
    //         return;
    //     }
    //     const stopTimer = setTimeout(() => {
    //         bleCtx.stopScan();
    //         setLoading(false);
    //         clearTimeout(stopTimer);
    //     }, 60000);
    //
    //     setLoading(true);
    //
    //     bleCtx.startScan();
    // };
    //
    // if (loading) {
    //     return < Loading_Screen/>;
    // }

    return (

        <NavigationContainer>
            <AuthScreens/>
        </NavigationContainer>
    );
}

