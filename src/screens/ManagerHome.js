import React from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';
import EquipmentList from "../components/EquipmentList";

// Essentially entire user home page, including welcome,
//   streak, equipment, and buttons for working out and settings
function ManagerHome() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome,{'\n'}Manager</Text>
            <Text style={styles.num}>37</Text>
            <Text style={styles.reg}>Registered users with your gym</Text>
            <Pressable style={styles.start} textStyle={styles.text}>
                <Text style={styles.text}>Manage Users</Text>
            </Pressable>
            <Text style={styles.eaag}>Equipment at a Glance</Text>
            <EquipmentList style={styles.el}/>
            <Pressable style={styles.start} textStyle={styles.text}>
                <Text style={styles.text}>Manage Equipment</Text>
            </Pressable>
            <Pressable style={styles.start} textStyle={styles.text}>
                <Text style={styles.text}>Gym Settings</Text>
            </Pressable>
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
    num: {
        fontSize: 50,
        textAlign: 'center',
        paddingTop: 20,
    },
    reg: {
        fontSize: 25,
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
    }
  });

export default ManagerHome;
