import React from "react";
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import EquipmentList from "../components/EquipmentList";

function UserHome() {
    return (
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
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffebeb',
      alignItems: 'center',
      paddingBottom: 40,
      height: '80%'
    },
    header: {
        fontSize: '50px',
        textAlign: 'center',
        paddingTop: 20,
    },
    streak: {
        fontSize: '30px',
        textAlign: 'center',
        paddingTop: 20,
    },
    eaag: {
        fontSize: '40px',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    el: {
        height: 'flex'
    },
    start: {
        height: 100,
        backgroundColor: '#912626',
        width: '90%',
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 20,
    },
    text: {
        color: '#ffebeb',
        textAlign: 'center',
        fontSize: 35,
    }
  });

export default UserHome;
