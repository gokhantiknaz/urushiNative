import React, {useState, useEffect} from 'react';
import {Button, Image, View, Platform, Dimensions, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useTranslation} from "react-i18next";
import {Button_1} from "./export";

export default function ImageSelect(props) {
    const [image, setImage] = useState(null);
    const [t] = useTranslation();
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
                                                                   mediaTypes: ImagePicker.MediaTypeOptions.All,
                                                                   allowsEditing: true,
                                                                   aspect: [4, 3],
                                                                   quality: 1,
                                                                   base64: true

                                                               });
        // console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            props.setImageUri(result.assets[0].uri);
            props.setImage(result.assets[0].base64);
        }
    };
    const width = Dimensions.get('window').width;
    return (

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {!image &&
                <Button_1 title={t("imageselect")} onPress={pickImage}/>}
            {image && <TouchableOpacity onPress={pickImage}>
                <Image source={{uri: image}} style={{width: width, height: 80}}/>
            </TouchableOpacity>}
        </View>
    );
}
