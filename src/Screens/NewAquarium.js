import React from "react";
import {View, TextInput, Button, StyleSheet, Text, Alert} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {
    auth,
    createUserWithEmailAndPassword,
} from "../firebase/firebase-utilities";
import Button_1 from "../components/button1";
import firebaseConfig from "../firebase/firebaseConfig";
import {db, collection, addDoc} from "../firebase/firebase-utilities";
import DeviceList from "../components/DeviceList";

const NewAquarium = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [name, setName] = React.useState("");
    const navigation = useNavigation();

    const handleSave = () => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    const docRef = await addDoc(collection(db, "users"), {
                        name: name,
                        email: email,
                        password: password,
                    });
                    console.log("Document written with ID: ", docRef.id);
                }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

            });
        } catch (error) {
            console.error("Error", error);
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.SignUpLabel}>New Aquarium</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Aquarium Name"
                    placeholderTextColor={"#ffffff"}
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.container2}>
                <DeviceList></DeviceList>
            </View>
            <View style={styles.container3}>
                <Button_1 title="Save" onPress={handleSave}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1,
                                         justifyContent: "space-between",
                                         alignItems: "center",
                                         paddingHorizontal: "10%",
                                         backgroundColor: "black",

                                     },
                                     container1: {
                                         width: "100%",
                                         justifyContent: "center",
                                         alignItems: "center",
                                         alignSelf: "center",
                                         top: '10%',
                                         // backgroundColor: "red",
                                     },
                                     container2: {
                                         flex:2,
                                         top: '10%',
                                         justifyContent: "center",
                                         alignItems: "center",
                                     },
                                     container3: {
                                         width: "100%",
                                         justifyContent: "center",
                                         alignItems: "center",
                                         bottom: "5%"
                                     },
                                     SignUpLabel: {
                                         fontSize: 40,
                                         marginBottom: 50,
                                         fontFamily: 'OpenSans_800ExtraBold',
                                         color: "#224957",
                                     },
                                     input: {
                                         width: "100%",
                                         borderWidth: 1,
                                         borderColor: "#ccc",
                                         borderRadius: 10,
                                         paddingHorizontal: 16,
                                         paddingVertical: 12,
                                         marginBottom: 10,
                                         // borderRadius: 12,
                                         backgroundColor: "black",
                                         fontSize: 15,
                                         fontFamily: 'OpenSans_400Regular',
                                         color: "#ffffff",
                                     },

                                     Button: {
                                         width: "100%",
                                         height: 48,
                                         borderRadius: 8,
                                         backgroundColor: "#007AFF",
                                         justifyContent: "center",
                                         alignItems: "center",
                                     },
                                 });

export default NewAquarium;
