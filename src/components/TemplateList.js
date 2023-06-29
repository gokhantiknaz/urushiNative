import {Alert, Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import images from "../images/images";
import React, {useContext, useEffect, useState} from "react";
import colors from "./colors";
import {getData, removeItem, saveData} from "../../data/useAsyncStorage";
import {MythContext} from "../../store/myth-context";
import {Icon} from "react-native-elements";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";

const TemplateList = (props) => {

    const [t] = useTranslation();
    const [templateList, setTemplateList] = useState([]);
    const ctx = useContext(MythContext);
    const navigation = useNavigation();

    const getTemplates = async () => {
        let list = await getData("manueltemplates");
        setTemplateList(list);
    }
    const getAutoTemplates = async () => {
        let list = await getData("autotemplates");
        setTemplateList(list);
    }

    useEffect(() => {
        if (props.mod === "auto") {
            getAutoTemplates();
        } else {
            getTemplates();
        }
    }, [props.refresh])
    const loadTemplate = item => {
        ctx.setTemplate(item.value);
        if (props.mod === "auto") {
            navigation.navigate("simulationdetail",{template: item.value});
        } else {
            props.jumpTo("manuelMod");
        }
    }
    const deleteTemplate = async (item) => {
        let savedTemplates = await getData(props.mod == "auto" ? "autotemplates" : "manueltemplates");
        let newArray = (savedTemplates.filter(function (t) {
            return t.name !== item.name
        }));

        await removeItem(props.mod == "auto" ? "autotemplates" : "manueltemplates");
        await saveData(props.mod == "auto" ? "autotemplates" : "manueltemplates", newArray);

        setTemplateList(newArray);
        Alert.alert(t("success"),"Başarıyla Silindi");
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
                                    <TouchableOpacity onPress={() => {deleteTemplate(item)}}>
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
                                         color: 'white',

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
