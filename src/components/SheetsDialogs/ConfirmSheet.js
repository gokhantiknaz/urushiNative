import ActionSheet, {SheetManager, SheetProps} from "react-native-actions-sheet";
import {View, Text, Button} from "react-native";
import {Button_1} from "../export";

function ConfirmSheet(props: SheetProps<{ message: string }>) {
    return (
        <ActionSheet id={props.sheetId}>
            <Text
                style={{
                    marginBottom: 10,
                    color: "black",
                }}
            >
                {props.payload?.message}
            </Text>
            <Button_1
                title="No"
                onPress={() => {
                    SheetManager.hide(props.sheetId, {
                        payload: false,
                    });
                }}
            />
            <Button_1
                title="Yes"
                onPress={() => {
                    SheetManager.hide(props.sheetId, {
                        payload: true,
                    });
                }}
            />
        </ActionSheet>
    );
}

export default ConfirmSheet;
