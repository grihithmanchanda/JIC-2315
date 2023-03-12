import React, { useState } from "react";
import {Pressable, ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";

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
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 5
    },
    subsubheader: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10
    },
    equipmentContainer: {
        fontSize: 40,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    equipmentList: {
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

export default ConfirmWorkout;
