import ActionSheet, {SheetManager, SheetProps} from "react-native-actions-sheet";
import {View, Text, TextInput, Button} from "react-native";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useState} from "react";

function GetNameSheet(props: SheetProps) {

    const [name, setName] = useState("");
    const [t] = useTranslation();
    return (
        <ActionSheet id={props.sheetId}>
            <View style={{backgroundColor: '#9BDEE8', height: 150}}>
                <View style={{flex: 5}}>
                    <Text style={{width: '100%'}}>{props.payload?.value}</Text>
                    <TextInput
                        style={{borderColor: 'gray', borderWidth: 1, marginTop: 20}}
                        placeholderTextColor={"black"}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View>
                    <Button
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

export default GetNameSheet;
