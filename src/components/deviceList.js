import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Icon} from "react-native-elements";

const DeviceList = () => {

    const [deviceList, setDeviceList] = useState([
                                                     {deviceId: "01-12-112", name: "IKIGAI 01"},
                                                     {deviceId: "01-12-113", name: "IKIGAI 02"},
                                                     {deviceId: "01-12-143", name: "IKIGAI 03"}
                                                 ]);
    const [selectedIds, setSelectedIds] = useState([]);

    const setSelectedItem = data => {
        let tmpdeviceList = [...deviceList];
        data.isSelect = !data.isSelect;
        data.selectedClass = data.isSelect ? styles.selected : styles.list;

        const index = tmpdeviceList.findIndex(
            item => data.deviceId === item.deviceId
        );
        tmpdeviceList[index] = data;
        setDeviceList(tmpdeviceList);
    };

    const renderItem = ({item}) => {
        const {deviceId, name} = item;

        return (
            <TouchableOpacity
                style={[styles.list, item.selectedClass]}
                onPress={() => setSelectedItem(item)}
            >
                <Text style={styles.lightText}>  {item.name} / {item.deviceId}  </Text>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Device List</Text>
            <FlatList
                data={deviceList}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={item => renderItem(item)}
                keyExtractor={item => item.deviceId.toString()}
                extraData={selectedIds}
            />

        </View>
    );
    // return (
    //     <View>
    //         <FlatList
    //             ItemSeparatorComponent={FlatListItemSeparator}
    //             keyExtractor={item => item.deviceId.toString()}
    //             data={deviceList}
    //             extraData={selectedIds}
    //             renderItem={renderItem}></FlatList>
    //     </View>
    // );
}
export default DeviceList;
export const FlatListItemSeparator = () => <View style={styles.line}/>;

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         backgroundColor: "black",
                                         paddingVertical: 50,
                                         position: "relative",

                                     },
                                     title: {
                                         fontSize: 20,
                                         color: "#fff",
                                         textAlign: "center",
                                         marginBottom: 10
                                     },
                                     loader: {
                                         flex: 1,
                                         justifyContent: "center",
                                         alignItems: "center",
                                         backgroundColor: "#fff"
                                     },
                                     list: {
                                         paddingVertical: 5,
                                         margin: 3,
                                         flexDirection: "row",

                                         justifyContent: "flex-start",
                                         alignItems: "center",
                                         zIndex: -1,
                                         borderRadius: 10,


                                     },
                                     lightText: {
                                         color: "#f7f7f7",
                                         width: 200,
                                         paddingLeft: 15,
                                         fontSize: 12
                                     },
                                     line: {
                                         height: 0.5,
                                         width: "100%",
                                         backgroundColor: "rgba(255,255,255,0.5)"
                                     },
                                     icon: {
                                         position: "absolute",
                                         bottom: 20,
                                         width: "100%",
                                         left: 290,
                                         zIndex: 1
                                     },
                                     selected: {backgroundColor: "#FA7B5F"},

                                 });
