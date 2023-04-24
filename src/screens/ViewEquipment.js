import React from "react";
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";
import EquipmentList from "../components/EquipmentList";

// Essentially entire manager home page, including welcome,
//   user num, equipment, and buttons for settings
function ViewEquipment({navigation}) {
    function handleBack() {
        navigation.navigate('UserHome')
    }

    return (
        <ScrollView style={styles.outer}>
            <Button //Logout button. TODO: format button style
                title="Logout"
                onPress={() => //call method to log out user
                    logout({navigation})
                }
            />
            <View style={styles.container}>
                <Text style={styles.header}>View Equipment</Text>
                <EquipmentList/>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => {handleBack()}}>
                    <Text style={styles.text}>Go Back</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

//Method to sign out of firebase, returns user to login screen
function logout({navigation}) {
    const auth = getAuth();
    // Signs out user
    signOut(auth).then(() => {
        navigation.navigate('Login');
    });
}

export default ViewEquipment;
