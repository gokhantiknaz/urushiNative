import ActionSheet, {SheetManager, SheetProps} from "react-native-actions-sheet";
import {View, Text, Button} from "react-native";

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
            <Button
                title="No"
                onPress={() => {
                    SheetManager.hide(props.sheetId, {
                        payload: false,
                    });
                }}
            />
            <Button
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
