import React from "react";
import {View, StyleSheet, Image, Text} from "react-native";

const Loading_Screen = ({children}) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={require("./assets/loading2.gif")}
            />
            {children ?? <Text>Loading...</Text>}

        </View>
    );
};

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         flexDirection: 'column',
                                         justifyContent: "space-around",
                                         alignItems: "center",
                                         backgroundColor:"black"

                                     },
                                     container1: {
                                         width: '100%',
                                         paddingTop: '5%',
                                         paddingHorizontal: '10%'
                                     },
                                     image: {
                                         width: "90%",
                                         height: "40%",
                                     },
                                 });

export default Loading_Screen;
