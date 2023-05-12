import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import images from "./images/images";
import Home from "./navigation/navigation";
import Radialmenu from "./components/RadialMenu/radialmenu";

const source =
    'https://images.unsplash.com/photo-1481595357459-84468f6eeaac?dpr=1&auto=format&fit=crop&w=376&h=251&q=60&cs=tinysrgb';

export default function ImageBackgroundPage() {
    return (

            <ImageBackground source={images.background} style={styles.image}>

            </ImageBackground>

    );
}

const styles = StyleSheet.create({
                                     image: {
                                         width: '100%',
                                         height: '100%',
                                         justifyContent: 'center',
                                         alignItems: 'center',

                                     },
                                     text: {
                                         color: 'white',
                                         fontWeight: 'bold',
                                         fontSize: 18,
                                         position: 'relative',
                                         top: 50
                                     }
                                 });
