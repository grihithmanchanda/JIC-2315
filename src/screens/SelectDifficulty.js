import React from "react";
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";

// Essentially entire manager home page, including welcome,
//   user num, equipment, and buttons for settings
function SelectDifficulty({navigation}) {
    function handleWOTD(difficulty) {
        navigation.navigate('WOTD', {'workoutDifficulty': difficulty})
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
                <Text style={styles.header}>Select Difficulty</Text>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => {handleWOTD(0)}}>
                    <Text style={styles.text}>Beginner</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => {handleWOTD(1)}}>
                    <Text style={styles.text}>Intermediate</Text>    
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => {handleWOTD(2)}}>
                    <Text style={styles.text}>Advanced</Text>
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

export default SelectDifficulty;
