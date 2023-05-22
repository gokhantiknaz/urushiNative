import {Dimensions, FlatList, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {Icon} from "react-native-elements";
import {useTranslation} from "react-i18next";
import images from "../images/images";
import colors from "./colors";
import {BleContext} from "../../store/ble-context";

const numColumns = 2;
const DeviceList = (props) => {

    const bleCtx = useContext(BleContext);

    const [isScanning, setIsScanning] = useState(false);
    const [bluetoothDevices, setBluetoothDevices] = useState([]);
    const [t] = useTranslation();

    // const [deviceList, setDeviceList] = useState([
    //                                                  {key: 1, id: "01-12-112", name: "IKIGAI 01 adasdas"},
    //                                                  {key: 2, id: "01-12-113", name: "IKIGAI 02"},
    //                                                  {key: 3, id: "01-12-143", name: "IKIGAI 03"},
    //                                                  {key: 4, id: "01-12-134", name: "IKIGAI 04"},
    //                                                  {key: 5, id: "01-12-144", name: "IKIGAI 05"}
    //                                              ]);

    useEffect(() => {
        startsScan();
    }, [])

    const startsScan = async () => { // start scanning for bluetooth devices
        if (isScanning) {
            setIsScanning(false);
            bleCtx.stopScan();
            return;
        }
        const stopTimer = setTimeout(() => {
            bleCtx.stopScan();
            setIsScanning(false);
            clearTimeout(stopTimer);
        }, 60000);

        setIsScanning(true);
        setBluetoothDevices([]);
        bleCtx.startScan();
    };

    useEffect(() => {
        // update current list of bluetooth devices when new device is discovered in useBLE hook
        setBluetoothDevices(bleCtx.devices);
    }, [bleCtx.devices]);


    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({key: `blank-${numberOfElementsLastRow}`, empty: true, id: "", name: ""});
            numberOfElementsLastRow++;
        }

        return data;
    };

    const [selectedIds, setSelectedIds] = useState([]);

    const setSelectedItem = data => {
        let tmpdeviceList = [...bluetoothDevices];
        data.isSelect = !data.isSelect;
        data.selectedClass = data.isSelect ? styles.selected : styles.list;

        const index = tmpdeviceList.findIndex(
            item => data.id === item.id
        );
        tmpdeviceList[index] = data;
        setBluetoothDevices(tmpdeviceList);

        let selectedAquariums = tmpdeviceList.filter(x => x.isSelect === true).map(a => ({name: a.name, id: a.id}));

        props.setDeviceList(selectedAquariums);
    };

    const renderItem = ({item}) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]}/>;
        }
        if (item.name !== "IKIGAI") {
            return;
        }
        return (
            <TouchableOpacity
                style={[styles.list, item.selectedClass]}
                onPress={() => setSelectedItem(item)}>
                {/*<ImageBackground source={images.deviceIcon}>*/}
                <Image source={images.deviceIcon} style={{height: 50, width: 50}}></Image>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>{item.id}</Text>
                </View>
                {/*</ImageBackground>*/}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('deviceList')}</Text>
            <FlatList
                data={formatData(bluetoothDevices, numColumns)}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={item => renderItem(item)}
                keyExtractor={item => item?.id.toString()}
                extraData={selectedIds}
                numColumns={numColumns}
            />
        </View>
    );
}
export default DeviceList;
export const FlatListItemSeparator = () => <View style={styles.line}/>;

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                     },
                                     title: {
                                         fontSize: 20,
                                         color: "#fff",
                                         textAlign: "center",
                                         marginBottom: 10
                                     },
                                     item: {
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                         width: Dimensions.get('window').width / numColumns, // approximate a square
                                     },
                                     itemInvisible: {
                                         backgroundColor: 'transparent',
                                     },
                                     itemText: {
                                         color: '#fff',
                                     },
                                     selected: {backgroundColor: "#FA7B5F"},
                                     list: {
                                         paddingVertical: 3,
                                         margin: 2,
                                         alignItems: "center",
                                         zIndex: -1,
                                         borderRadius: 10,
                                     },
                                     line: {
                                         height: 0.5,
                                         width: "100%",
                                         backgroundColor: "rgba(255,255,255,0.5)"
                                     },
                                 });

// const styles = StyleSheet.create({
//                                      container: {
//                                          flex: 1,
//                                          backgroundColor: "black",
//                                          paddingVertical: 50,
//                                          position: "relative",
//
//                                      },
//                                      title: {
//                                          fontSize: 20,
//                                          color: "#fff",
//                                          textAlign: "center",
//                                          marginBottom: 10
//                                      },
//                                      loader: {
//                                          flex: 1,
//                                          justifyContent: "center",
//                                          alignItems: "center",
//                                          backgroundColor: "#fff"
//                                      },
//                                      list: {
//                                          paddingVertical: 5,
//                                          margin: 3,
//                                          flexDirection: "row",
//
//                                          justifyContent: "flex-start",
//                                          alignItems: "center",
//                                          zIndex: -1,
//                                          borderRadius: 10,
//                                      },
//                                      lightText: {
//                                          color: "#f7f7f7",
//                                          width: 200,
//                                          paddingLeft: 15,
//                                          fontSize: 12
//                                      },
//                                      line: {
//                                          height: 0.5,
//                                          width: "100%",
//                                          backgroundColor: "rgba(255,255,255,0.5)"
//                                      },
//                                      icon: {
//                                          position: "absolute",
//                                          bottom: 20,
//                                          width: "100%",
//                                          left: 290,
//                                          zIndex: 1
//                                      },
//                                      selected: {backgroundColor: "#FA7B5F"},
//
//                                  });

