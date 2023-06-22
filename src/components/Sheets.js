import { registerSheet } from 'react-native-actions-sheet';
import ExampleSheet from "./SheetsDialogs/SaveTemplateSheet";
import ConfirmSheet from "./SheetsDialogs/ConfirmSheet";


registerSheet("savetemplate", ExampleSheet);
registerSheet("confirm-sheet", ConfirmSheet);

export {};
