import {Alert} from "react-native";
import {useTranslation} from "react-i18next";


export const showConfirmDialog = (detailMessage:null, confirm: () => {}) => {

    return Alert.alert(
        "Are your sure?",
        detailMessage??"Are you sure you want to delete?",
        [
            // The "Yes" button
            {
                text: "Yes",
                onPress: () => {
                    confirm();
                },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
                text: "No",
            },
        ]
    );
};
