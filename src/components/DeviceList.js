import {Dimensions, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {Icon} from "react-native-elements";
import {useTranslation} from "react-i18next";
import images from "../images/images";
import {BleContext} from "../../store/ble-context";
import {Button_1} from "./export";

const DeviceList = (props) => {

    const bleCtx = useContext(BleContext);

    const [isScanning, setIsScanning] = useState(false);
    const [bluetoothDevices, setBluetoothDevices] = useState([]);
    const [t] = useTranslation();

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

        console.log(selectedAquariums);
        props.setDeviceList(selectedAquariums);
    };
    const renderHeader = () => {
        return (
            <View>
                <Button_1 title=  {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'} onPress={startsScan} />
            </View>
        );
    };
    const renderFooter = () => {
        return (
            <View>
                <Text style={styles.footer}>End</Text>
            </View>
        );
    };

    const emptyListView = () => {
        return (
            <View>
                <Text>No records found.</Text>
            </View>
        );
    };

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: width,
                    backgroundColor: '#CED0CE',

                }}
            />
        )
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true}></StatusBar>
            <View>
                {/*{*/}
                {/*    bluetoothDevices.map((item) => {*/}
                {/*                             // return (item.name == "IKIGAI" || item.name == "ikigai") &&*/}
                {/*                             return (1 == 1) &&*/}
                {/*                                 (*/}
                {/*                                     <LinearGradient colors={['blue', 'red']} style={styles.card} key={item.id}>*/}
                {/*                                         <TouchableOpacity style={[styles.list, item.selectedClass]} onPress={() => setSelectedItem(item)}>*/}
                {/*                                             <View style={{alignItems: 'center'}}>*/}
                {/*                                                 /!*<Image style={styles.image} source={item.image}/>*!/*/}
                {/*                                                 <Image source={images.deviceIcon} style={styles.image}></Image>*/}
                {/*                                                 <Text style={styles.itemText}>{item.name}</Text>*/}
                {/*                                             </View>*/}
                {/*                                         </TouchableOpacity>*/}
                {/*                                     </LinearGradient>*/}
                {/*                                 );*/}
                {/*                         }*/}
                {/*    )*/}
                {/*}*/}

                <FlatList
                    data={bluetoothDevices}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={renderHeader}
                    ItemSeparatorComponent={renderSeparator}
                    ListEmptyComponent={emptyListView}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => setSelectedItem(item)}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        padding: 16,
                                        alignItems: 'center'
                                    }}>
                                    {/*<Image*/}
                                    {/*    source={images.mythLight}*/}
                                    {/*    style={{marginRight: 16,height:20,width:20}}*/}
                                    {/*/>*/}
                                    {item.isSelect &&
                                        <Image
                                            source={images.checked}
                                            style={{marginRight: 16, height: 20, width: 20}}
                                        />}
                                    <Text
                                        category='s1'
                                        style={{
                                            color: 'white'
                                        }}>{`${item.name} ${item.id}`}</Text>

                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

        </View>
    );
}
export default DeviceList;
export const FlatListItemSeparator = () => <View style={styles.line}/>;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                     },
                                     header: {
                                         fontSize: 15,
                                         paddingVertical: 15,
                                         fontWeight: 'bold',
                                         textAlign: 'center',
                                         color: "white"
                                     },
                                     flatlist: {
                                         paddingVertical: 30,
                                         paddingHorizontal: 10,
                                     },
                                     heading2: {
                                         fontSize: 12,
                                         color: "white"
                                     },
                                     subheading: {
                                         color: "white"
                                     },
                                     itemSeparator: {
                                         backgroundColor: 'green',
                                         height: 1,
                                     },
                                     selected: {backgroundColor: "#FA7B5F"},
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

