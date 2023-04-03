import React, { useState } from "react";
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";
import Stopwatch, { modifyTimer } from "../components/Stopwatch";

function Workout({route, navigation}) {
    if (!route?.params["exercises"]["names"].length) {
        navigation.navigate("UserHome");
    }
    let curr_exercise = route?.params["exercises"]["names"][0];
    let exercises_left = route?.params["exercises"]["names"];
    
    let curr_reps = route?.params["exercises"]["reps"][0];
    let reps_left = route?.params["exercises"]["reps"];
    
    let [repsDone, setRepsDone] = useState(0);

    let [running, setRunning] = useState(true);

    let button_text = "Next";
    if (exercises_left.length == 1) {
        button_text = "Finish";
    }

    let pause_text = "Pause";
    if (!running) {
        pause_text = "Resume";
    }

    const handleNext = () => {
        exercises_left.splice(0, 1);
        reps_left.splice(0, 1);
        let data = {
            "names": exercises_left,
            "reps": reps_left
        };
        setRepsDone(0);
        navigation.navigate('Workout', {"exercises": data})
    };

    const handlePause = () => {
        setRunning(!running);
    };

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
                    {curr_exercise}
                </Text>
                <Text style={styles.header}>
                    Rep Goal:
                </Text>
                <Text style={styles.subheader}>
                    {curr_reps}
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
                    <Text style={styles.text}>{button_text}</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={handlePause}>
                    <Text style={styles.text}>{pause_text}</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => navigation.navigate("UserHome")}>
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
