import React, { useState } from "react";
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import ManagerExerciseList from "../components/ManagerExerciseList";
import workout_service from "../services/workout_service";
import styles from "../styles/styles";

// WOTD page for creating workout routines
// Essentially entire manager home page, including welcome,
//   user num, equipment, and buttons for settings
function WOTD({route, navigation}) {
    const [workoutDifficulty, setWorkoutDifficulty] = useState(route?.params['workoutDifficulty'] ?? 0)
    const [exercises, setExercises] = useState([]);

    let handleWorkoutSubmission= async() => {
        await workout_service.addWorkout(exercises, global.gymID, workoutDifficulty)
        navigation.navigate('ManagerHome');
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
                <Text style={styles.header}>Create Workout of the Day</Text>
                <Text style={styles.subheader}>Select 4 exercises</Text>
                <ManagerExerciseList style={styles.managerExerciseList} getExercises={setExercises}/>
                <Pressable style={styles.button} textStyle={styles.text}>
                    <Text style={styles.text} onPress={handleWorkoutSubmission}>Use These Exercises</Text>
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

export default WOTD;
