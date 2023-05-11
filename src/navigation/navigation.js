import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {auth, onAuthStateChanged} from "../firebase/firebase-utilities";
import Login from "../Screens/Login";
import NewAquarium from "../Screens/NewAquarium";
import Welcome_screen from '../Screens/Welcome';
import FlatMenu from "../Screens/FlatMenu";
import Radialmenu from "../components/RadialMenu/radialmenu";
import UnderCons from "../components/UnderCons";

const Stack = createStackNavigator();

function AuthScreens() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="radialmenu" component={Radialmenu}/>
            {/*<Stack.Screen name="xx" component={SprialMenu}/>*/}
            <Stack.Screen name="lights" component={FlatMenu}/>
            <Stack.Screen name="welcome_screen" component={Welcome_screen}/>
            <Stack.Screen name="login" component={Login}/>
            <Stack.Screen name="NewAquarium" component={NewAquarium}/>
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


    ////  Comment Below stack for Development Mode /////
    ////  UnComment Below stack for Production Mode /////
    return (
        <NavigationContainer>
            {user == true ? <AppScreens/> : <AuthScreens/>}
        </NavigationContainer>
    );


    ///  {/* Developent Mode  */}  ///
    ///  {/* UnComment below Stack for App */}  ///
    return (
        <NavigationContainer>
            <AppScreens/>
        </NavigationContainer>
    );
}
