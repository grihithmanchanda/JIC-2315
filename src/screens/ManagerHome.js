import React from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import EquipmentList from "../components/EquipmentList";
import {getAuth, signOut} from "firebase/auth";

// Essentially entire manager home page, including welcome,
//   user num, equipment, and buttons for settings
function ManagerHome({navigation}) {
    const handleManageEquipment = () => {
        navigation.navigate('ManageEquipment')
    }
    const handleSD = () => {
        navigation.navigate('SelectDifficulty')
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
                <Text style={styles.header}>Welcome,{'\n'}Manager</Text>
                <Text style={styles.number}>37</Text>
                <Text style={styles.regText}>Registered users with your gym</Text>
                <Pressable style={styles.button} textStyle={styles.text}>
                    <Text style={styles.text}>Manage Users</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={handleSD}>
                    <Text style={styles.text}>Create Workout of the Day</Text>    
                </Pressable>
                <Text style={styles.equipmentContainer}>Equipment at a Glance</Text>
                <EquipmentList style={styles.equipmentList}/>
                <Pressable style={styles.button} textStyle={styles.text} onPress={handleManageEquipment}>
                    <Text style={styles.text}>Manage Equipment</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text}>
                    <Text style={styles.text}>Gym Settings</Text>
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
        fontSize: 40,
        textAlign: 'center',
        paddingTop: 15,
    },
    number: {
        fontSize: 35,
        textAlign: 'center',
        paddingTop: 15,
    },
    regText: {
        fontSize: 25,
        textAlign: 'center',
        paddingTop: 10,
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

export default ManagerHome;
