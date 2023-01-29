import React from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from "react-native-elements";
import EquipmentList from "../components/EquipmentList";
import { getAuth, signOut } from "firebase/auth";

// Essentially entire user home page, including welcome,
// streak, equipment, and buttons for working out and settings
function UserHome({navigation}) {
    return (
        <View style={styles.outer}>
            <Button //Logout button. TODO: format button style
                title="Logout"
                onPress={() => //call method to log out user
                    logout({navigation})
                }
            />
            <View style={styles.container}>
                <Text style={styles.header}>Welcome,{'\n'}User</Text>
                <Text style={styles.streakText}>5 Day Streak!</Text>
                <Text style={styles.equipmentContainer}>Equipment at a Glance</Text>
                <EquipmentList style={styles.equipmentList}/>
                <Pressable style={styles.button} textStyle={styles.text}>
                    <Text style={styles.text}>Select/Start Workout</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text}>
                    <Text style={styles.text}>User Settings</Text>
                </Pressable>
            </View>
        </View>
    );
}

//Method to sign out of firebase, returns user to login screen
function logout({navigation}) {
    const auth = getAuth();
    // Signs out user
    signOut(auth).then(() => {
        // console.log("LOGOUT"); //Debugging
        navigation.navigate('Login');
    }).catch((error) => {
        // console.log("ERROR");
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
        fontSize: 50,
        textAlign: 'center',
        paddingTop: 20,
    },
    streakText: {
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 20,
    },
    equipmentContainer: {
        fontSize: 40,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    equipmentList: {
        height: 'flex'
    },
    button: {
        height: 100,
        backgroundColor: '#051739',
        width: '90%',
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 20,
    },
    text: {
        color: '#ebeeff',
        textAlign: 'center',
        fontSize: 35,
    },
    outer: {
        flex: 1,


    }
});

export default UserHome;
