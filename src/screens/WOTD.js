import React, { useState } from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import ExerciseList from "../components/ExerciseList";
import workout_service from "../services/workout_service";
import gyminfo_service from "../services/gyminfo_service";

// WOTD page for creating workout routines
function WOTD({route, navigation}) {
    const [workoutDifficulty, setWorkoutDifficulty] = useState(route?.params['workoutDifficulty'] ?? 0)
    const [workouts, setWorkouts] = useState([]);

    let handleWorkoutSubmission= async() => {
        await workout_service.addWorkout(workouts, gymID)
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
                <ExerciseList style={styles.exerciseList} getWorkouts={setWorkouts}/>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebeeff',
        alignItems: 'center',
        paddingBottom: 40,
        height: '80%'
    },
    header: {
        fontSize: 40,
        textAlign: 'center',
        paddingTop: 15,
    },
    subheader: {
        fontSize: 25,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 20
    },
    equipmentContainer: {
        fontSize: 40,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    exerciseList: {
        paddingTop: 10,
        height: 'flex'
    },
    button: {
        height: 70,
        backgroundColor: '#051739',
        width: '90%',
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 20,
    },
    text: {
        color: '#ebeeff',
        textAlign: 'center',
        fontSize: 30,
    },
    outer: {
        flex: 1,
        backgroundColor: '#ebeeff',
    }
});

export default WOTD;
