import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import images from "../images/images";
import React, {useState} from "react";
import colors from "./colors";

const TemplateList = () => {

    const [templateList,setTemplateList] = useState([{name:"Full Spectrum",id:'manuelTemplate'},{name:"Full Royal",id:'manuelTemplate2'}]);
    const clickEventListener = item => {
        console.log(item);
    }
    return (
        <ImageBackground source={images.background} style={{flex:1}}>
            <View style={styles.container}>
                <FlatList
                    style={styles.contentList}
                    columnWrapperStyle={styles.listContainer}
                    data={templateList}
                    keyExtractor={item => {
                        return item.id
                    }}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity style={styles.card} onPress={() => clickEventListener(item)}>
                                {/*<Image style={styles.image} source={item.image}/>*/}
                                <View style={styles.cardContent}>
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
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
                                         marginTop:50
                                     },
                                     contentList: {
                                         flex: 1,
                                         marginTop:50
                                     },
                                     cardContent: {
                                         marginLeft: 20,
                                         marginTop: 10,
                                         color:'white'
                                     },
                                     name: {
                                         fontSize: 18,
                                         flex: 1,
                                         alignSelf: 'center',
                                         color: '#3399ff',
                                         fontWeight: 'bold',
                                     }
                                 })
