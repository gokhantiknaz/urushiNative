import React, {useState} from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import {StyleSheet, Image, FlatList, Alert} from 'react-native'
import {useTranslation} from "react-i18next";
import colors from "../components/colors";
import images from "../images/images";
const LightDetail = (props) => {

    const {t, i18n} = useTranslation();
    const data = [
        {
            id: 1,
            name:   t('connections'),
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
            image: images.settings,
        },
        {
            id: 6,
            name: t('delete'),
            image: images.settings,
        }
    ]

    const [options, setOptions] = useState(data)
    const clickEventListener = item => {
        Alert.alert('Message', 'Item clicked. ' + item.name)
    }
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.contentList}
                columnWrapperStyle={styles.listContainer}
                data={options}
                keyExtractor={item => {
                    return item.id
                }}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.card} onPress={() => clickEventListener(item)}>
                            <Image style={styles.image} source={item.image}/>
                            <View style={styles.cardContent}>
                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,


                                     },
                                     contentList: {
                                         flex: 1,
                                         backgroundColor: colors.black,

                                     },
                                     cardContent: {
                                         marginLeft: 20,
                                         marginTop: 10,
                                         backgroundColor:colors.black

                                     },
                                     image: {
                                         width: 90,
                                         height: 90,
                                         borderRadius: 45,
                                         borderWidth: 2,
                                         borderColor: '#ebf0f7',
                                         backgroundColor:colors.white
                                     },

                                     card: {
                                         shadowColor: '#00000021',
                                         shadowOffset: {
                                             width: 0,
                                             height: 6,
                                         },
                                         shadowOpacity: 0.37,
                                         shadowRadius: 7.49,
                                         elevation: 12,

                                         marginLeft: 20,
                                         marginRight: 20,
                                         marginTop: 20,
                                         backgroundColor: 'black',
                                         padding: 10,
                                         flexDirection: 'row',
                                         borderRadius: 30,

                                     },

                                     name: {
                                         fontSize: 18,
                                         flex: 1,
                                         alignSelf: 'center',
                                         color: '#3399ff',
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
