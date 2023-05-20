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

export const saveData = async (key, value ) => {
	try {
		// const jsonValue = JSON.stringify(value);
		// await AsyncStorage.setItem(key, jsonValue);

		const store = JSON.stringify(value).match(/.{1,1000000}/g);
		store.forEach((part, index) => { AsyncStorage.setItem((key + index), part); });
		await AsyncStorage.setItem(key, ("" + store.length));
	} catch (error) {
		console.error(error);
	}
};

export const getData = async (key = "tempBasket.basket") => {
	try {
		// const jsonValue = await AsyncStorage.getItem(key);
		// return jsonValue != null ? JSON.parse(jsonValue) : null;

		let store = "";
		let numberOfParts = await AsyncStorage.getItem(key);
		if(typeof(numberOfParts) === 'undefined' || numberOfParts === null)
			return null;
		else
			numberOfParts = parseInt(numberOfParts);
		for (let i = 0; i < numberOfParts; i++) { store += await AsyncStorage.getItem(key + i); }
		if(store === "")
			return null;
		return JSON.parse(store);
	} catch (error) {
		console.error(error);
	}


};

export const mergeData = async (key = "tempBasket.basket",newValue) => {
	try {
		const jsonValue = JSON.stringify(newValue);
		await AsyncStorage.mergeItem(key, jsonValue);
	} catch (error) {
		console.error(error);
	}
};

//   return { value, saveData, getData };
// };
