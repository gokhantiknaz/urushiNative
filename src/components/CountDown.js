
import { Text, View, StyleSheet, Button } from 'react-native';
import * as React from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export const CountDown = (props) => {

    const [isPlaying, setIsPlaying] = React.useState(true)

    return (
        <View style={styles.container}>
            <CountdownCircleTimer
                isPlaying={isPlaying}
                size={60}
                duration={props.delayTime *60}
                // trailColor="red"
                colors={['rgb(253,192,41)', 'rgb(223,135,29)', 'rgb(170,61,1)']}
                colorsTime={[20, 20, 20]}
                onComplete={() => ({ shouldRepeat: true, delay: 2 })}
                updateInterval={1}
                strokeWidth={6}
            >
                {({ remainingTime, color }) => (
                    <Text style={{ color, fontSize: 20 }}>
                        {remainingTime}
                    </Text>
                )}
            </CountdownCircleTimer>

        </View>
    )
}

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         justifyContent: 'center',
                                         alignItems: 'center',
                                         paddingTop: 1,//Constants.statusBarHeight,
                                         padding: 8,
                                     }
                                 });
