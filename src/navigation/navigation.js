import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, Image, View, ImageBackground, SafeAreaView} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "../Screens/Login";
import NewAquarium from "../Screens/NewAquarium";
import Welcome_screen from '../Screens/Welcome';
import LightDetail from "../Screens/LightDetail";
import AquarimDetailMenu from "../components/RadialMenu/aquarimDetailMenu";
import UnderCons from "../components/UnderCons";
import colors from "../components/colors";
import {useTranslation} from "react-i18next";
import MainProgress from "../Screens/MainProgress";


const Stack = createStackNavigator();
function AuthScreens() {
    const [t] = useTranslation();
    return (

            <Stack.Navigator screenOptions={{headerShown: false}}>
                {/*<Stack.Screen name="chart" component={SpectrumChart}/>*/}
                <Stack.Screen name="welcome_screen" component={Welcome_screen}/>
                <Stack.Screen name="NewAquarium" component={NewAquarium}/>
                <Stack.Screen name="menu" component={AquarimDetailMenu} options={{
                    title: t('menu'), headerShown: false, headerTintColor: '#fff', headerStyle: {
                        backgroundColor: colors.black,
                    }
                }}/>
                <Stack.Screen name="lights" component={LightDetail} options={{
                    title: t('Lights'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                        backgroundColor: colors.black,
                    }
                }}/>
                <Stack.Screen name="seekBar" component={MainProgress}/>
                <Stack.Screen name="login" component={Login}/>
                <Stack.Screen name="UnderCons" component={UnderCons}/>
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

    return (

        <NavigationContainer>
            <AuthScreens/>
        </NavigationContainer>
    );
}

