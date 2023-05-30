import React, {useEffect, useLayoutEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {Extrapolation, interpolate} from "react-native-reanimated";
import Svg, {Defs, Path, RadialGradient, Rect, Stop} from "react-native-svg";

const {width, height} = Dimensions.get("window");

const interpolateValue2Pos = (power = 0, time = 0) => {
    //convert values to position
    try {
        const interpolateX = interpolate(power, [0, 100], [60, width - 60], {
            extrapolateRight: Extrapolation.CLAMP,
            extrapolateLeft: Extrapolation.CLAMP
        });
        const interpolateY = interpolate(time, [0, 1440], [50, height - 50], {
            extrapolateRight: Extrapolation.CLAMP,
            extrapolateLeft: Extrapolation.CLAMP
        });
        return {x: interpolateX + 10, y: interpolateY + 10};
    } catch (error) {
        return {x: -1, y: -1};
    }
};

const ChartGraph = ({data}) => {
    const [points, setPoints] = useState([{x: 0, y: 0}]);
    const [lines, setLines] = useState("");

    useLayoutEffect(() => {
        if (data) {
            const newDataPoints = data.map((item) => {
                return interpolateValue2Pos(item.power, item.time);
            });
            setPoints(() => newDataPoints);
        }
    }, [data]);

    useEffect(() => {
        if (points.length > 1) {
            const path = `M
			${points[0].x} ${points[0].y}
		
			Q ${Math.max(points[1].x, points[0].x)} ${(points[1].y - (points[1].y - points[0].y) / 2)} ${points[1].x} ${points[1].y}
			Q ${Math.max(points[2].x, points[1].x)} ${(points[2].y - (points[2].y - points[1].y) / 2)} ${points[2].x} ${points[2].y}
			Q ${Math.max(points[3].x, points[2].x)} ${(points[3].y - (points[3].y - points[2].y) / 2)} ${points[3].x} ${points[3].y}
			`;

            setLines(() => path);
        }
    }, [points]);

    return (
        <View style={styles.graph}>
            <Svg
                height="100%"
                width="100%">
                <Path
                    d={lines}
                    stroke="purple"
                    strokeWidth="2"
                    fill="gray"
                />
            </Svg>
        </View>
    );
};
const styles = StyleSheet.create({
                                     graph: {
                                         position: "absolute",
                                         top: 0,
                                         left: 0,
                                         width: "100%",
                                         height: "100%",
                                         opacity: 0.5,
                                         zIndex: -1
                                     }
                                 });

export default ChartGraph;
