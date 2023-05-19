import {View, StyleSheet, Dimensions, Text} from "react-native";
import {LineChart} from "react-native-chart-kit";
import colors from "./colors";


const SpectrumChart = (props) => {

    const data = {
        labels: ["7:00","12:00", "18:00", "24:00"],
        legend: ["Ch1", "Ch2", "Ch3","Ch4","Ch5","Ch6"],
        datasets: [
            // {
            //     data: [0],withDots: false // min
            // },
            // {
            //     data: [100] ,withDots: false// max
            // },
            {
                data: [0, 100, 100, 0,], strokeWidth: 2,
                color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`, // optional
            },
            {
                data: [0, 100, 100, 0], strokeWidth: 2,
                color: (opacity = 50) => `rgba(100, 65, 244, ${opacity})`, // optional
            },
            {
                data: [0, 90, 90, 0], strokeWidth: 2,
                color: (opacity = 1) => `rgba(25, 65, 159, ${opacity})`, // optional
            },
            {
                data: [0, 75, 75, 0], strokeWidth: 2,
                color: (opacity = 1) => `rgba(089, 12, 244, ${opacity})`, // optional
            },
            {
                data: [0, 10, 10, 0], strokeWidth: 2,
                color: (opacity = 1) => `rgba(125, 65, 244, ${opacity})`, // optional
            },
            {
                data: [0, 40, 40, 0], strokeWidth: 2,
                color: (opacity = 1) => `rgba(250, 65, 244, ${opacity})`, // optional
            }

        ]
    };
    return (
        <View style={{flex: 1, marginTop: 50, marginLeft: 20, marginRight: 20}}>
            <Text>Graphical Settings</Text>
            <LineChart
                data={data}
                width={Dimensions.get("window").width - 40} // from react-native
                height={220}

                fromZero={true}
                segments={5}
                yAxisSuffix="%"
                fromNumber={100}
                yAxisInterval={1} // optional, defaults to 1
                onDayPress={(value) => {console.log(value)}}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: colors.test1,
                    backgroundGradientTo: colors.test8,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                onDataPointClick={(e) => {console.log(e)}}
                // renderDotContent={(e) => {console.log(e)}}
            />

        </View>


    );
}

export default SpectrumChart;

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         backgroundColor: '#F5FCFF'
                                     },
                                     chart: {
                                         flex: 1
                                     }
                                 });
