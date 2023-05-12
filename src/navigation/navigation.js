import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, Image, View, ImageBackground, SafeAreaView} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {auth, onAuthStateChanged} from "../firebase/firebase-utilities";
import Login from "../Screens/Login";
import NewAquarium from "../Screens/NewAquarium";
import Welcome_screen from '../Screens/Welcome';
import FlatMenu from "../Screens/FlatMenu";
import Radialmenu from "../components/RadialMenu/radialmenu";
import UnderCons from "../components/UnderCons";
import colors from "../components/colors";
import {useTranslation} from "react-i18next";
import images from "../images/images";
import ImageBackgroundPage from "../Test";

const Stack = createStackNavigator();

function AuthScreens() {
    const [t] = useTranslation();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>


            {/*<Stack.Screen name="xx" component={ImageBackgroundPage}/>*/}
            <Stack.Screen name="welcome_screen" component={Welcome_screen}/>
            <Stack.Screen name="NewAquarium" component={NewAquarium}/>
            <Stack.Screen name="menu" component={Radialmenu} options={{
                title: t('menu'), headerShown: false, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>
            <Stack.Screen name="lights" component={FlatMenu} options={{
                title: t('Lights'), headerShown: true, headerTintColor: '#fff', headerStyle: {
                    backgroundColor: colors.black,
                }
            }}/>
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

    const [user, setUser] = useState(false);

    useEffect(() => {
        const redirect = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("user", user);
                setUser(true)

            } else {
                // User is signed out
                // ...
                setUser(false)
            }
        });
        return redirect;

    }, []);

    return (
        <NavigationContainer>
            <AuthScreens/>
        </NavigationContainer>
    );
}

