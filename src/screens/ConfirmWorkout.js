import React, { useState } from "react";
import {Pressable, ScrollView, Text, View, TextInput} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";

// Essentially entire manager home page, including welcome,
//   user num, equipment, and buttons for settings
function ConfirmWorkout({route, navigation}) {
    const workouts = route.params.workouts;
    const [setQuantity, setSetQuantity] = useState("0")
    const [repQuantity, setRepQuantity] = useState("0")
    const handleConfirm = () => {
        navigation.navigate('ManagerHome')
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
                <Text style={styles.header}>Set Workout</Text>
                {   
                    workouts.map((workout, index) => (
                        <>
                        <Text key={index} style={styles.subheader}>{workout}</Text><Text style={styles.subsubheader}>Number of Sets</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 5"
                            keyboardType="number"
                            onChangeText={(val) => setSetQuantity(val)}
                        />
                        <Text style={styles.subsubheader}>Reps per Set</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 5"
                            keyboardType="number"
                            onChangeText={(val) => setRepQuantity(val)} />
                        </>
                    ))
                }
                <Pressable style={styles.button} textStyle={styles.text} onPress={handleConfirm}>
                    <Text style={styles.text}>Confirm</Text>
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

export default ConfirmWorkout;
