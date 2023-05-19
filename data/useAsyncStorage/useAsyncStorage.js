import AsyncStorage from "@react-native-async-storage/async-storage";


export const clearStorage = async () => {
	try {
		await AsyncStorage.clear();
		alert("Storage successfully cleared!");
	} catch (e) {
		alert("Failed to clear the async storage.");
	}
};

export const removeItem = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
		return true;
	} catch (e) {
		console.log("Error retriveing data :", e);
	}
};

export const getAllKeys = async () => {
	let keys = [];
	try {
		keys = await AsyncStorage.getAllKeys();
	} catch (e) {
		// read key error
		console.log("Error retriveing data :", e);
	}
	return keys;
};

export const saveData = async (newValue, key ) => {
	try {
		const jsonValue = JSON.stringify(newValue);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (error) {
		console.error(error);
	}
};

export const getData = async (key = "tempBasket.basket") => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (error) {
		console.error(error);
	}


};

export const mergeData = async (newValue, key = "tempBasket.basket") => {
	try {
		const jsonValue = JSON.stringify(newValue);
		await AsyncStorage.mergeItem(key, jsonValue);
	} catch (error) {
		console.error(error);
	}
};

//   return { value, saveData, getData };
// };
