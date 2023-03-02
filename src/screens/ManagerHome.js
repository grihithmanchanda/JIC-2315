import React from "react";
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import EquipmentList from "../components/EquipmentList";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";

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
        <ScrollView style={styles.outcontainer}>
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

export default ManagerHome;
