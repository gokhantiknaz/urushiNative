import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import DraggableDot from "../components/chart/DraggableDot";
import LeftTimeBar from "../components/chart/LeftTimeBar";
import ValueBar from "../components/chart/ValueBar";
import ChartGraph from "../components/chart/ChartGraph"
import DateTimePicker from "@react-native-community/datetimepicker";


const minToTime = (minute) => {
    //convert minutes to time
    const hours = Math.floor(minute / 60)
        .toString()
        .padStart(2, "0");
    const minutes = (minute % 60).toString().padStart(2, "0");
    const sTime = `${hours}:${minutes}`;

    return sTime;
};

function getDateFromHours(time) {
    time = time.split(":");
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
}

const SettingsChartScreen = (props) => {
    const [chartLayout, setChartLayout] = useState({width: 0, height: 0, x: 0, y: 0});
    const [points, setPoints] = useState({values: []});
    const [limits, setLimits] = useState([{min: 1, max: 1439}]);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [currentDate, setCurrentDate] = useState({date: new Date(), index: -1});

    //convert data to points to be used in DraggableDot
    useEffect(() => {
        // @ts-ignore
        if (props.data) {
            const newPoints = props.data.map((point) => {
                const {power, time, color} = point;
                return {power, time, color};
            });
            setPoints((prev) => ({values: newPoints}));

        }
    }, [props.data]);

    useEffect(() => {
        //update limits
        if (points.values.length === 0 || points === undefined) {
            return;
        }
        const newlimits = points.values.map((point, index) => {
            const min = points.values[index - 1] ? points.values[index - 1].time + 60 : 0;
            const max = points.values[index + 1] ? points.values[index + 1].time - 60 : 1439;
            return {min, max};
        });
        setLimits((prev) => [...newlimits]);

    }, [points]);
    const pointsUpdateCallBack = (pointData, index) => {
        //update point data
        const {power, time} = pointData;
        // const newPoints = points.values;

        const newPoints = points.values.map((e) => {
            e.selected = false;
            return e;
        });

        newPoints[index] = {...points.values[index], power: power, time: time,selected:true};
        setPoints((prev) => ({...prev, values: [...newPoints]}));

        props.setPoints([...newPoints]);
    };

    const onTimeChange = (event, selectedDate) => {
        setShowTimePicker(false);
        if (event.type === "dismissed") {
            return;
        }

        const hour = selectedDate.getHours();
        const minute = selectedDate.getMinutes();
        const newTimeValue = hour * 60 + minute;
        const pointIndex = currentDate.index;
        if (newTimeValue < 0 || newTimeValue > 1439) {
            return;
        }
        if (newTimeValue < limits[pointIndex].min || newTimeValue > limits[pointIndex].max) {
            alert("Time is out of range\n" + minToTime(limits[pointIndex].min) + " - " + minToTime(limits[pointIndex].max));
            return;
        }

        const updatedPoint = {...points.values[pointIndex], time: newTimeValue};
        pointsUpdateCallBack(updatedPoint, pointIndex);
    };

    const onTimeOickerShow = (data) => {
        const _date = getDateFromHours(minToTime(data.time)); //convert time to date
        setCurrentDate((prev) => {
            return {...prev, date: _date, ...data};
        });
        setShowTimePicker(true);
    };

    return (
        <>
            <GestureHandlerRootView style={{flex: 1, width: "100%"}}>
                <View
                    onLayout={(e) => {
                        setChartLayout({...e.nativeEvent.layout});
                    }}
                    style={styles.container}>

                    <LeftTimeBar layout={chartLayout}/>
                    <ValueBar layout={chartLayout}/>
                    <ChartGraph data={points.values}/>
                    {points.values.map((point, index) => {
                        return (
                            <DraggableDot
                                pointUpdateCallBack={pointsUpdateCallBack}
                                index={index}
                                key={index}
                                point={point}
                                limits={limits[index]}
                                showTimePicker={onTimeOickerShow}
                                layout={chartLayout}
                                channel={props.channel}
                            />
                        );
                    })}

                    <Text style={{color: 'red'}}>{props.channel}</Text>
                </View>
            </GestureHandlerRootView>

            {showTimePicker && (
                <View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={currentDate.date}
                        locale="en_GB"
                        mode={"time"}
                        // is24Hour={true}
                        onChange={onTimeChange}
                        style={{width: '100%', backgroundColor: "white"}}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
                                     container: {
                                         width: "100%",
                                         height: "100%",
                                         overflow: "hidden",
                                         marginBottom: 10

                                     },
                                     leftTimeBar: {
                                         position: "absolute",
                                         top: 0,
                                         left: 0,
                                         borderTopRightRadius: 100,
                                         width: "10%",
                                         height: "100%",
                                         backgroundColor: "white",
                                         opacity: 0.5
                                     }
                                 });

export default SettingsChartScreen;
