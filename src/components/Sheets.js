import { registerSheet } from 'react-native-actions-sheet';
import ExampleSheet from "./SheetsDialogs/GetNameSheet";
import ConfirmSheet from "./SheetsDialogs/ConfirmSheet";


registerSheet("GetName-Sheet", ExampleSheet);
registerSheet("confirm-sheet", ConfirmSheet);

export {};
