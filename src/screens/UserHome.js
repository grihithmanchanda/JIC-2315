import React, { useEffect, useState } from "react";
import { Pressable, Text, ScrollView, View } from "react-native";
import { Button } from "react-native-elements";
import workout_service from "../services/workout_service";
import { getAuth, signOut } from "firebase/auth";
import styles from "../styles/styles";

// Essentially entire user home page, including welcome,
// streak, equipment, and buttons for working out and settings
function UserHome({navigation}) {
    const [difficultyFilter, setDifficultyFilter] = useState(2)
    const [wodData, setWODData] = useState(["one", "two", "three", "four"])
    const [safetyText, setSafetyText] = useState('Be safe!')

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${month}-${day}-${year}`;

    useEffect(() => {
        getFilteredWOD()
    }, [difficultyFilter]);

    const getFilteredWOD = async () => {
        const wodDataSnap = await workout_service.getWOD(difficultyFilter);
        if (wodDataSnap === undefined) {
            alert(`There is no workout for difficulty level ${difficultyFilter}.`)
        } else {
            setWODData(wodDataSnap)
            setSafetyText(wodDataSnap.map((exercise) => exercise.exerciseComment).join(', '))
        }
    }

    return (
        <ScrollView style={styles.outer}>
            <Button //Logout button. TODO: format button style
                title="Logout"
                onPress={() =>
                    //call method to log out user
                    logout({navigation})
                }
            />
            <View style={styles.container}>
                <Text style={styles.header}>Welcome,{"\n"}User</Text>
                <Text style={styles.subheader}>5 Day Streak!</Text>
                <Text style={styles.subheader}>Workout of the Day:</Text>
                <Text style={styles.subhalfsubheader}>(Advanced)</Text>
                {
                    wodData.map((exercise) => (
                        <Text key={exercise.name} style={styles.subsubheader}>{exercise.name}</Text>
                    ))
                }
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => {
                    navigation.navigate('WOTDInfo')
                }}>
                    <Text style={styles.text}>Start Workout</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => {
                    navigation.navigate('ViewEquipment')
                }}>
                    <Text style={styles.text}>View Available Equipment</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => {
                    navigation.navigate('UserSettings')
                }}>
                    <Text style={styles.text}>User Settings</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => handleGymInformation()}>
                    <Text style={styles.text}>Gym Information</Text>
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

export default UserHome;
