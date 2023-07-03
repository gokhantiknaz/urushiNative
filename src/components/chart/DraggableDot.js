import {View, Text, StyleSheet} from "react-native";
import React, {useEffect, useLayoutEffect, useState} from "react";
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    set,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {Pressable} from "react-native";
import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");
const minToTime = (minute) => {
    //convert minutes to time
    const hours = Math.floor(minute / 60)
        .toString()
        .padStart(2, "0");
    const minutes = (minute % 60).toString().padStart(2, "0");
    const sTime = `${hours}:${minutes}`;

    return sTime;
};

const DraggableDot = (props) => {
    const {layout, index, point, limits, pointUpdateCallBack, showTimePicker,channel} = props;
    const isPressed = useSharedValue(false); //is dot pressed
    const pointValues = useSharedValue({x: 50, y: 50}); //current point position
    const pointOffset = useSharedValue({x: 0, y: 0}); //offset of point from center of dot
    const [pointRealValues, setPointRealValues] = useState({time: 0, power: 0}); //current point real values
    const pointLimits = useSharedValue({min: 1, max: 1439});
    useEffect(() => {
        const pos = interpolateValue2Pos(point.power, point.time);
        pointValues.value = {
            x: pos.x,
            y: pos.y
        };
        convertPos2Value(pos);

    }, [point]);


    useLayoutEffect(() => {
        if (!limits) {
            return;
        } //if limits is undefined return
        //set limits
        const interpolateMin = interpolate(limits.min, [1, 1439], [50, height - 50], {
            extrapolateRight: Extrapolation.CLAMP,
            extrapolateLeft: Extrapolation.CLAMP
        }); //convert min to position
        const interpolateMax = interpolate(limits.max, [1, 1439], [50, height - 50], {
            extrapolateRight: Extrapolation.CLAMP,
            extrapolateLeft: Extrapolation.CLAMP
        }); //convert max to position

        pointLimits.value = {
            min: interpolateMin,
            max: interpolateMax
        };
    }, [limits]);

    const interpolateValue2Pos = (x = 0, y = 0) => {
        //convert values to position
        //convert values to position
        const interpolateX = interpolate(x, [0, 100], [0, width - 100], {
            extrapolateRight: Extrapolation.CLAMP,
            extrapolateLeft: Extrapolation.CLAMP
        });
        const interpolateY = interpolate(y, [0, 1439], [50, height - 50], {
            extrapolateRight: Extrapolation.CLAMP,
            extrapolateLeft: Extrapolation.CLAMP
        });
        return {x: interpolateX, y: interpolateY};
    };

    const interpolatePos2Value = (x = 0, y = 0) => {
        //convert position to real values
        const interpolateX = interpolate(x, [0, width - 100], [0, 100], {
            extrapolateRight: Extrapolation.CLAMP,
            extrapolateLeft: Extrapolation.CLAMP
        });
        const interpolateY = interpolate(y, [50, height - 50], [0, 1439], {
            extrapolateRight: Extrapolation.CLAMP,
            extrapolateLeft: Extrapolation.CLAMP
        });
        return {x: interpolateX, y: interpolateY};
    };

    const animatedLineStyle = useAnimatedStyle(() => {
        //animated line style
        return {
            borderStyle: isPressed.value ? "dotted" : "dashed",
            borderColor: isPressed.value ? "yellow" : point.color,
            height: withSpring(pointValues.value.y + pointOffset.value.y),
            width: withSpring(pointValues.value.x + pointOffset.value.x)
        };
    });
    const animatedDotStyle = useAnimatedStyle(() => {
        //animated Dot style
        return {
            backgroundColor: isPressed.value ? "yellow" : point.color
        };
    });

    const animatedLabelTime = useAnimatedStyle(() => {
        //animated label style
        return {
            backgroundColor: withTiming(!isPressed.value ? "#ffffff" : point.color),
            transform: [{scale: withSpring(isPressed.value ? 1.2 : 1)}]
        };
    });

    const pointsCallback = (point) => {
        const lastPoint = interpolatePos2Value(point.x, point.y);
        pointUpdateCallBack({power: lastPoint.x, time: lastPoint.y}, index); //call back to update points in parent component
    };

    const animatedLabelPower = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(!isPressed.value ? "#ffffff80" : point.color),
            transform: [{scale: withSpring(isPressed.value ? 1.2 : 1)}],
            top: withTiming(isPressed.value ? -15 : pointValues.value.y - 45)
        };
    });

    const convertPos2Value = (value) => {
        //convert position to real values
        const posTP = interpolatePos2Value(value.x, value.y); //convert position to values
        setPointRealValues({
                               time: posTP.y,
                               power: posTP.x
                           });

    };

    useAnimatedReaction(
        () => {
            return pointOffset.value;
        },
        (value) => {
            const _pos = {y: value.y + pointValues.value.y, x: value.x + pointValues.value.x};
            runOnJS(convertPos2Value)(_pos); //convert position to real values
        },
        []
    );

    const panGesture = Gesture.Pan()
        .onTouchesDown(() => {
            isPressed.value = true;
        })
        .onUpdate((e) => {
            pointOffset.value = {
                x: index == 0 || index == 3 ? 0 : e.translationX,
                y: e.translationY
            };
        })
        .onEnd(() => {
            //limit the position
            if (pointValues.value.x + pointOffset.value.x < 0) {
                pointOffset.value = {
                    ...pointOffset.value,
                    x: 0 - pointValues.value.x
                };
            }
            if (pointValues.value.x + pointOffset.value.x > width - 100) {
                pointOffset.value = {
                    ...pointOffset.value,
                    x: width - 100 - pointValues.value.x
                };
            }

            if (pointValues.value.y + pointOffset.value.y < pointLimits.value.min) {
                pointOffset.value = {
                    ...pointOffset.value,
                    y: pointLimits.value.min - pointValues.value.y
                };
            }
            if (pointValues.value.y + pointOffset.value.y > pointLimits.value.max) {
                pointOffset.value = {
                    ...pointOffset.value,
                    y: pointLimits.value.max - pointValues.value.y
                };
            }
        })
        .onFinalize(() => {
            pointValues.value = {x: pointValues.value.x + pointOffset.value.x, y: pointValues.value.y + pointOffset.value.y};
            runOnJS(pointsCallback)(pointValues.value);
            pointOffset.value = {x: 0, y: 0};
            isPressed.value = false;
        });

    return (
        <Animated.View style={[styles.lines, {zIndex: 100 - index}, animatedLineStyle]}>
            <Animated.View style={[styles.label, styles.labelTime, animatedLabelTime]}>
                <Pressable
                    style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                    onLongPress={() => {}}
                    onPress={() => {
                        showTimePicker({...pointRealValues, index});
                    }}>
                    <Text
                        numberOfLines={1}
                        style={[styles.text]}>
                        {minToTime(Math.round(pointRealValues.time))}
                    </Text>
                </Pressable>
            </Animated.View>
            <Animated.View style={[styles.label, styles.labelPower, animatedLabelPower]}>
                <Text style={[styles.text]}>{`${Math.round(pointRealValues.power)}%`}</Text>
            </Animated.View>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.dot, animatedDotStyle]}/>
            </GestureDetector>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
                                     lines: {
                                         position: "absolute",
                                         top: 18,
                                         left: 60,
                                         borderRightWidth: 2,
                                         borderBottomWidth: 2
                                     },
                                     dot: {
                                         position: "absolute",
                                         width: 20,
                                         height: 20,
                                         borderRadius: 10,
                                         right: -10,
                                         bottom: -10,
                                         zIndex: 11
                                     },
                                     label: {
                                         position: "absolute",
                                         backgroundColor: "#ffffff",
                                         borderRadius: 3,
                                         paddingHorizontal: 5,
                                         paddingVertical: 2,
                                         zIndex: 0,
                                         elevation: 10,
                                         shadowColor: "#000",
                                         shadowOffset: {
                                             width: 0,
                                             height: 0
                                         },
                                         shadowOpacity: 0.5,
                                         shadowRadius: 3.84
                                     },

                                     labelTime: {
                                         left: -60,
                                         bottom: -15,
                                         width: 60
                                     },
                                     labelPower: {
                                         width: 60,
                                         right: -30,
                                         top: 0
                                     },

                                     text: {
                                         textAlign: "center",
                                         fontSize: 16,
                                         fontWeight: "bold"
                                     }
                                 });

export default DraggableDot;
