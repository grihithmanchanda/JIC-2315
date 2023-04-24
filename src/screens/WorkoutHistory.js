import React, { useState } from "react";
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";

// Essentially entire manager home page, including welcome,
//   user num, equipment, and buttons for settings
function WorkoutHistory({navigation}) {
    const [streak, setStreak] = useState(0);

    return (
        <ScrollView style={styles.outer}>
            <Button //Logout button. TODO: format button style
                title="Logout"
                onPress={() => //call method to log out user
                    logout({navigation})
                }
            />
            <View style={styles.container}>
                <Text style={styles.header}>Current Streak:</Text>
                <Text style={styles.header}>{streak}</Text>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => {navigation.navigate('UserHome')}}>
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
    signOut(auth)
        .then(() => {
            // console.log("LOGOUT"); //Debugging
            navigation.navigate("Login");
        })
        .catch((error) => {
            // console.log("ERROR");
        });
}

export default WorkoutHistory;