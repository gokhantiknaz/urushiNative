import React from 'react';
import {StyleSheet, Text, Pressable, Animated} from 'react-native';


const Button_1 = props => {

    const expand = React.useRef(new Animated.Value(0)).current;

    const expand_Up = () => {
        Animated.spring(expand, {
            toValue: 5,
            useNativeDriver: true,
        }).start();
    };
    const expand_Down = () => {
        Animated.spring(expand, {
            toValue: -5,
            bounciness: 12,
            useNativeDriver: true,
        }).start();
    };

    const animate_button = () => {
        expand_Up;
        expand_Down;
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{translateY: expand}]
                }
            ]}
        >
            <Pressable
                onPressIn={expand_Up}
                onPressOut={expand_Down}
                style={styles.button1}
                onPress={props.onPress}
                disabled={props.disabled}
            >
                <Text style={{
                    alignItems: 'center',
                    fontFamily: 'OpenSans_600SemiBold',
                    fontSize: 16, color: '#ffffff'
                }}>{props.title}</Text>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
                                     container: {
                                         width: '90%'
                                     },
                                     button1: {
                                         alignSelf: 'stretch',
                                         paddingVertical: "3%",
                                         borderRadius: 10,
                                         backgroundColor: "#bcd635",
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                     }
                                 })

export default Button_1;
