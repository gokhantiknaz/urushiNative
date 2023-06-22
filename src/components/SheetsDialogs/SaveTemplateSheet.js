import ActionSheet, {SheetManager, SheetProps} from "react-native-actions-sheet";
import {View, TextInput, Button} from "react-native";
import {Text} from "react-native-elements";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Button_1} from "../export";
import {BackgroundImage} from "@rneui/base";
import images from "../../images/images";

function SaveTemplateSheet(props: SheetProps) {

    const [name, setName] = useState("");
    const [t] = useTranslation();
    return (
        <ActionSheet id={props.sheetId} containerStyle={{backgroundColor: "black",   paddingHorizontal: 12}}>
            <View style={{height: 190, paddingTop: 20, paddingHorizontal: 20, paddingBottom: 30}}>
                <View style={{flex: 5}}>
                    <Text h4 style={{textAlign: "center", width: '100%', color: 'white'}}>{props.payload?.value}</Text>
                    <TextInput
                        style={{borderColor: 'gray', borderWidth: 1, marginTop: 20, backgroundColor: 'white', borderRadius: 10, padding: 5}}
                        placeholderTextColor={"black"}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={{alignItems: "center"}}>
                    <Button_1
                        title="Yes"
                        onPress={() => {
                            SheetManager.hide(props.sheetId, {
                                payload: name,
                            });
                        }}
                    />
                </View>
            </View>
        </ActionSheet>
    );
}

export default SaveTemplateSheet;
