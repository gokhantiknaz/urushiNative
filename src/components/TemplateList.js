import {Alert, Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import images from "../images/images";
import React, {useContext, useEffect, useState} from "react";
import colors from "./colors";
import {getData, removeItem} from "../../data/useAsyncStorage";
import {MythContext} from "../../store/myth-context";
import {Icon} from "react-native-elements";

const TemplateList = (props) => {

    const [templateList, setTemplateList] = useState([]);
    const ctx = useContext(MythContext);
    const getTemplates = async () => {
        let list = await getData("manueltemplates");
        setTemplateList(list);
    }

    useEffect(() => {
        getTemplates();
    }, [])

    const loadTemplate = item => {
        // load templated
        ctx.setTemplate(item.value);
        props.jumpTo("manuelMod");
    }
    return (
        <ImageBackground source={images.background} style={{flex: 1}}>
            <View style={styles.container}>
                <FlatList
                    style={styles.contentList}
                    columnWrapperStyle={styles.listContainer}
                    data={templateList}
                    keyExtractor={item => {
                        return item.name
                    }}
                    renderItem={({item}) => {
                        return (
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <View style={styles.cardContent}>
                                    <TouchableOpacity onPress={() => loadTemplate(item)}>
                                        {/*<Image style={styles.image} source={item.image}/>*/}
                                        <Text style={styles.name}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.delete}>
                                    <TouchableOpacity  onPress={() => {Alert.alert('delete alarm')}}>
                                        <Icon name='delete' color='red'/>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )
                    }}
                    />
            </View>
        </ImageBackground>
    );
}

    export default TemplateList;


    const styles = StyleSheet.create({
                                         container: {
                                             flex: 1,
                                             marginTop: 10
                                         },
                                         contentList: {
                                             flex: 1,
                                             marginTop: 10
                                         },
                                         cardContent: {
                                             marginTop: 50,
                                             width: '80%',
                                             color: 'white'
                                         },
                                         delete: {
                                             marginTop: 50,
                                             width: '20%',
                                             color: 'white'
                                         },
                                         name: {
                                             fontSize: 18,
                                             flex: 1,
                                             alignSelf: 'center',
                                             color: '#3399ff',
                                             fontWeight: 'bold',
                                         }
                                     })
