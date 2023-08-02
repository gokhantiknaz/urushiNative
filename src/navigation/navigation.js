import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "../Screens/Login";
import NewAquarium from "../Screens/NewAquarium";
import Welcome_screen from '../Screens/Welcome';
import LightDetail from "../Screens/LightDetail";
import UnderCons from "../components/UnderCons";
import colors from "../components/colors";
import {useTranslation} from "react-i18next";
import SprialMenu from "../components/spiralMenu/SprialMenu";

import BLEDevices from "../Screens/BLEDevices";
import {ManuelModTab} from "../Screens/ManuelModTab";
import {Simulation} from "../Screens/Simulation";
import LightSettings from "../components/LightSettings";
import LightConnections from "../Screens/LightConnections";
import SimulationMainScreen from "../Screens/SimulationMainScreen";
import MainSettings from "../components/MainSettings";
import {DeviceListTemp} from "../components/DeviceListTemp";


const Stack = createStackNavigator();

function AuthScreens() {
    const [t] = useTranslation();
    return (

        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={Welcome_screen} options={{
                title: t('Welcome'), headerShown: false, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.darkGrey,
                }
            }}/>

            <Stack.Screen name="lights" component={LightDetail} options={{
                title: t('lights'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>
            <Stack.Screen name="manuelModTab" component={ManuelModTab} options={{
                title: t('manuel'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>
            <Stack.Screen name="NewAquarium" component={NewAquarium} options={{
                title: t('newAquarium'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>

            <Stack.Screen name="simulation" component={SimulationMainScreen} options={{
                title: t('simulation'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>
            <Stack.Screen name="simulationdetail" component={Simulation} options={{
                title: t('simulation'), headerShown: false, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>
            <Stack.Screen name="lightsettings" component={LightSettings} options={{
                title: t('aquariumsettings'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>

            <Stack.Screen name="aquariumsettings" component={MainSettings} options={{
                title: t('aquariumsettings'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>

            <Stack.Screen name="lightConnections" component={LightConnections} options={{
                title: t('connections'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>


            <Stack.Screen name="UnderCons" component={UnderCons} options={{
                title: t('undercons'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>


            {/*<Stack.Screen name="UnderCons" component={SimulationMainScreen} options={{*/}
            {/*    title: t('undercons'), headerShown: true, headerTintColor: '#fff', headerStyle: {*/}
            {/*        backgroundColor: colors.black,*/}
            {/*    }*/}
            {/*}}/>*/}
            <Stack.Screen name="temperatureSettings" component={DeviceListTemp} options={{
                title: t('deviceList'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>


            <Stack.Screen name="spiralMenu" component={SprialMenu}/>
            <Stack.Screen name="BleDevices" component={BLEDevices}/>
        </Stack.Navigator>
    );
}

export default function Home() {

    return (

        <NavigationContainer>
            <AuthScreens/>
        </NavigationContainer>
    );
}

