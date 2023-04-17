import React, { useEffect, useState } from "react";
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";
import Stopwatch, { modifyTimer } from "../components/Stopwatch";
import workout_service from "../services/workout_service";

function Workout({route, navigation}) {
    
    let [wodData, setWODData] = useState(route?.params['wod'] ?? null)
    let [curExerciseIndex, setCurExerciseIndex] = useState(0);
    let [curExercise, setCurExercise] = useState(route?.params["wod"][0] ?? null)
    let [running, setRunning] = useState(true);
    let [repsDone, setRepsDone] = useState(0);

    let button_text = "Next";

    useEffect(() => {
        if (curExerciseIndex >= wodData.length) {
            // user pressed finish button
            navigation.navigate('UserHome')
        } else if (curExerciseIndex === wodData.length) {
            // currently on last exercise; change button text
            button_text = "Finish";
        } else {
            // update current exercise to next exercise
            setCurExercise(route?.params["wod"][curExerciseIndex] ?? null)
        }
    }, [curExerciseIndex]);

    const handleNext = () => {
        setCurExerciseIndex(curExerciseIndex + 1)
    };

    const handlePause = () => {
        setRunning(!running);
    };

    const handleQuit = () => {
        workout_service.storeWorkoutInUserDoc(wodData);
        navigation.navigate("UserHome")
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
                <Text style={styles.header}>
                    Workout Time:
                </Text>
                <Stopwatch running={running}/>
                <Text style={styles.header}>
                    Exercise:
                </Text>
                <Text style={styles.subheader}>
                    {curExercise.name}
                </Text>
                <Text style={styles.header}>
                    Rep Goal:
                </Text>
                <Text style={styles.subheader}>
                    {curExercise.numReps}
                </Text>
                <Text style={styles.header}>
                    Reps Done:
                </Text>
                <View style={styles.plusminus}>
                <Pressable style={styles.pmbutton} textStyle={styles.text} onPress={() => {repsDone ? setRepsDone(repsDone - 1) : {}}}>
                    <Text style={styles.text}>-</Text>
                </Pressable>
                <Text style={styles.middlenumber}>
                    {repsDone}
                </Text>
                <Pressable style={styles.pmbutton} textStyle={styles.text} onPress={() => {setRepsDone(repsDone + 1)}}>
                    <Text style={styles.text}>+</Text>
                </Pressable>
                </View>
                <Pressable style={styles.button} textStyle={styles.text} onPress={handleNext}>
                    <Text style={styles.text}>{curExerciseIndex + 1 < wodData.length ? 'Next' : 'Finish'}</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={handlePause}>
                    <Text style={styles.text}>{running ? 'Pause' : 'Resume'}</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={handleQuit}>
                    <Text style={styles.text}>Quit</Text>
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

export default Workout;