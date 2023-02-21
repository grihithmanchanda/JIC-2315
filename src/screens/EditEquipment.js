import React, { useState } from "react";
import {Pressable, ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import {Button, CheckBox} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";

// Essentially entire manager home page, including welcome,
//   user num, equipment, and buttons for settings
function EditEquipment({route, navigation}) {
    const [tableRows, setTableRows] = useState([['', '', '']])
    const [modalVisible, setModalVisible] = useState(false)
    const tableHead = ['Name', 'Quantity', 'Muscle Groups']
    const [eqName, setEqName] = useState('')
    const [eqQuantity, setEqQuantity] = useState("0")
    const [biceps, setBiceps] = useState(false)
    const [triceps, setTriceps] = useState(false)
    const [back, setBack] = useState(false)
    const [chest, setChest] = useState(false)
    const [legs, setLegs] = useState(false)
    const [abs, setAbs] = useState(false)


    const [equipmentId, setEquipmentId] = useState(route?.params['equipment'] ?? '')
    const handleManageEquipment = () => {
        navigation.navigate('ManageEquipment')
    }
    const handleExerciseManagement = () => {
        navigation.navigate('ExerciseManagement', {'equipID': equipmentId[0]});
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
                <Text style={styles.header}>Edit {equipmentId[0]}</Text>
                <Text style={styles.subheader}>Muscle groups</Text>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        checked={biceps}
                        title="Biceps"
                        onPress={() => setBiceps(!biceps)}
                    />
                    <CheckBox
                        checked={triceps}
                        title="Triceps"
                        onPress={() => setTriceps(!triceps)}
                    />
                    <CheckBox
                        checked={back}
                        title="Back"
                        onPress={() => setBack(!back)}
                    />
                    <CheckBox
                        checked={chest}
                        title="Chest"
                        onPress={() => setChest(!chest)}
                    />
                    <CheckBox
                        checked={legs}
                        title="Legs"
                        onPress={() => setLegs(!legs)}
                    />
                    <CheckBox
                        checked={abs}
                        title="Abs"
                        onPress={() => setAbs(!abs)}
                    />
                </View>
                <Text style={styles.subheader}>Quantity</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. 5"
                    keyboardType="default"
                    onChangeText={(val) => setEqQuantity(val)}
                />
                <Pressable style={styles.button} textStyle={styles.text} onPress={handleManageEquipment}>
                    <Text style={styles.text}>Confirm Selection</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={handleExerciseManagement}>
                    <Text style={styles.text}>Manage Exercises</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text}>
                    <Text style={styles.text}>Delete Equipment</Text>
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
        fontSize: 35,
        textAlign: 'center',
        paddingTop: 15,
    },
    subheader: {
        fontSize: 25,
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
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        display: "flex",
        flexWrap: "wrap",
    },
    input: {
        paddingTop: 10,
        borderColor: "grey",
        borderBottomWidth: 2,
    },
});

export default EditEquipment;
