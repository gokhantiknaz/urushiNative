import { registerSheet } from 'react-native-actions-sheet';
import ExampleSheet from "./GetNameSheet";
import ConfirmSheet from "./ConfirmSheet";


registerSheet("GetName-Sheet", ExampleSheet);
registerSheet("confirm-sheet", ConfirmSheet);

export {};
