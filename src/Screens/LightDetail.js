import React, {useState} from 'react'
import {Text, TouchableOpacity, View, Dimensions} from "react-native";
import {StyleSheet, Image, FlatList, Alert, useWindowDimensions } from 'react-native';
import {useTranslation} from "react-i18next";
import colors from "../components/colors";
import images from "../images/images";
import { LinearGradient } from 'expo-linear-gradient';


const LightDetail = (props) => {

    const {navigation} = props;
    const {t, i18n} = useTranslation();
    const data = [
        {
            id: 1,
            name: t('connections'),
            image: images.connection,
        },
        {
            id: 2,
            name: t('auto'),
            image: images.auto,
        },
        {
            id: 3,
            name: t('manuel'),
            image: images.manuel,
            navigate: "manuelMod"
        },
        {
            id: 4,
            name: t('settings'),
            image: images.settings,
        }
        ,
        {
            id: 5,
            name: t('templates'),
            image: images.template,
        },
        {
            id: 6,
            name: t('delete'),
            image: images.delete,
            navigate: "delete"
        }
    ]

    const [options, setOptions] = useState(data)
    const clickEventListener = item => {
        navigation.navigate(item.navigate);
    }
 
    
   
    return (
        <View style={styles.container}>
            {
                data.map((item) => {
                    return (
                                <LinearGradient colors={['#3696af', '#232f5d' ]} style={styles.card}>
                                <TouchableOpacity key={item.id} onPress={() => clickEventListener(item)}>
                                    <View style={styles.cardContent}>
                                        <Image style={styles.image} source={item.image}/>
                                        <Text style={styles.name}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                </LinearGradient>
                        );
                    }
                )
            }                  
        </View>   
    );
}


const styles = StyleSheet.create({
    
                                    container: {
                                        flex: 1,
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        alignItems: 'flex-start',
                                        backgroundColor: colors.black,
                                    },
                                    image: {
                                        width: 90,
                                        height: 90,
                                    },

                                    card: {
                                        justifyContent:'center',
                                        alignItems:'center',
                                        width:(Dimensions.get("window").width/2)-10,
                                        margin:5,
                                        height:130,
                                        borderRadius: 20,
                                    },

                                    name: {
                                        fontSize: 18,
                                        flex: 1,
                                        alignSelf: 'center',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                    },
                                    count: {
                                        fontSize: 14,
                                        flex: 1,
                                        alignSelf: 'center',
                                        color: '#6666ff',
                                    },
                                    followButton: {
                                        marginTop: 10,
                                        height: 35,
                                        width: 100,
                                        padding: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 30,
                                        backgroundColor: 'white',
                                        borderWidth: 1,
                                        borderColor: '#dcdcdc',
                                    },
                                    followButtonText: {
                                        color: '#dcdcdc',
                                        fontSize: 12,
                                    },
                                 })
export default LightDetail;
