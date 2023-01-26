import React from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Button } from "react-native-elements";
import EquipmentList from "../components/EquipmentList";

// Essentially entire user home page, including welcome,
//   streak, equipment, and buttons for working out and settings
function UserHome({navigation}) {
    return (
        /*/
        <View style={styles.container}>
            <View style={styles.container}>
                <Button
                    title="User Home"
                    onPress={() => console.log("test")}
                />
            </View>
            */

        <View style = {styles.outer}>
            <Button
                    title="Logout"
                    onPress={() => navigation.navigate('Login')}
            />
            <View style={styles.container}>
                

                <Text style={styles.header}>Welcome,{'\n'}User</Text>
                <Text style={styles.streak}>5 Day Streak!!</Text>
                <Text style={styles.eaag}>Equipment at a Glance</Text>
                <EquipmentList style={styles.el}/>
                <Pressable style={styles.start} textStyle={styles.text}>
                    <Text style={styles.text}>Select/Start Workout</Text>
                </Pressable>
                <Pressable style={styles.start} textStyle={styles.text}>
                    <Text style={styles.text}>User Settings</Text>
                </Pressable>
            </View>
        </View>
    );
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
    streak: {
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 20,
    },
    eaag: {
        fontSize: 40,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    el: {
        height: 'flex'
    },
    start: {
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
