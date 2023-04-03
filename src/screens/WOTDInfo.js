import React, { useEffect, useState } from "react";
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";
import {Picker} from '@react-native-picker/picker';
import workout_service from "../services/workout_service";

// Essentially entire manager home page, including welcome,
//   user num, equipment, and buttons for settings
function WOTDInfo({navigation}) {
    const [difficultyFilter, setDifficultyFilter] = useState('advanced')
    const [wodData, setWODData] = useState(["one", "two", "three", "four"])

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${month}-${day}-${year}`;

    useEffect(async () => {
        const wodDataSnap = await workout_service.getWOD();
        setWODData(wodDataSnap[difficultyFilter])
    }, [difficultyFilter]);

    return (
        <ScrollView style={styles.outer}>
            <Button //Logout button. TODO: format button style
                title="Logout"
                onPress={() => //call method to log out user
                    logout({navigation})
                }
            />
            <View style={styles.container}>
                <Text style={styles.header}>Workout of the Day</Text>
                <Text style={styles.subheader}>{date}</Text>
                <Text style={styles.subheader}>Difficulty Level: </Text>
                <View style={styles.pickerOuterView}>
                 <Text style={styles.pickerText}></Text>
                 <View style={styles.pickerInnerView}>
                     <Picker style={styles.picker} itemStyle={styles.pickerItem} selectedValue={difficultyFilter} onValueChange={(difficulty) => setDifficultyFilter(difficulty)}>
                         <Picker.Item label="novice" value="novice"/>
                         <Picker.Item label="Intermediate" value="intermediate"/>
                         <Picker.Item label="Advanced" value="advanced"/>
                     </Picker>
                 </View>
             </View>
                <Text style={styles.subheader}>Exercises:</Text>
                {   
                    wodData.map((exercise) => (
                        <Text style={styles.subsubheader}>{exercise}</Text>
                    ))
                }
                <Text style={styles.subheader}>Additional Information:</Text>
                <Text style={styles.subsubheader}>Be safe!</Text>
                <Pressable style={styles.button} textStyle={styles.text}>
                    <Text style={styles.text}>Begin Workout</Text>
                </Pressable>
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
    signOut(auth).then(() => {
        navigation.navigate('Login');
    });
}

export default WOTDInfo;
