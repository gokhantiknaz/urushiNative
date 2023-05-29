import {Alert} from "react-native";
import {useTranslation} from "react-i18next";

export const showConfirmDialog = (confirm: () => {}) => {
    const [t] = useTranslation();
    return Alert.alert(
        "Are your sure?",
        "Are you sure you want to delete?",
        [
            // The "Yes" button
            {
                text: t("Yes"),
                onPress: () => {
                    confirm();
                },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
                text: t("No"),
            },
        ]
    );
};
