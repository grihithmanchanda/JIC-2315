import React, { useEffect, useState } from "react";
import {Pressable, ScrollView, Text, View, TextInput} from 'react-native';
import {Button, CheckBox} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";
import EquipmentService from "../services/equipment_service";
import equipment_service from "../services/equipment_service";

// Essentially entire manager home page, including welcome,
//   user num, equipment, and buttons for settings
function EditEquipment({route, navigation}) {
    const [tableRows, setTableRows] = useState([['', '', '']])
    const [modalVisible, setModalVisible] = useState(false)
    const tableHead = ['Name', 'Quantity', 'Muscle Groups']
    const [equipmentId, setEquipmentId] = useState(route?.params['equipment'] ?? '')
    const [eqQuantity, setEqQuantity] = useState("0")
    const [biceps, setBiceps] = useState(false)
    const [triceps, setTriceps] = useState(false)
    const [back, setBack] = useState(false)
    const [chest, setChest] = useState(false)
    const [legs, setLegs] = useState(false)
    const [abs, setAbs] = useState(false)

    useEffect(() => {
        // getEquipmentList();
        if (equipmentId != ''){
            let eqName = equipmentId[0]
            getEquipment(eqName)
        }
    }, []);

    // const getEquipmentList = async () => {
    //     const equipmentQuery = await EquipmentService.getAllEquipment();
    //     if (equipmentQuery !== null) {
    //         setTableRows(generateTableRows(equipmentQuery))
    //     }
    // }

    const getEquipment = async(eqName=equipmentId[0]) => {
        let eqSnap = await equipment_service.getEquipment(eqName)
        let eqCount = eqSnap.data['count']
        let muscleGroups = eqSnap.data['muscle groups']

        setEqQuantity(eqCount)

        for (const muscleGroup of muscleGroups) {
            switch(muscleGroup) {
                case 'biceps':
                    setBiceps(true)
                    break
                case 'triceps':
                    setTriceps(true)
                    break
                case 'back':
                    setBack(true)
                    break
                case 'chest':
                    setChest(true)
                    break
                case 'legs':
                    setLegs(true)
                    break
                case 'abs':
                    setAbs(true)
                    break
            }
        }
    }

    const handleManageEquipment = () => {
        handleUpdateEquipment(equipmentId[0], eqQuantity, biceps, triceps, back, chest, legs, abs);
        navigation.navigate('ManageEquipment')
        // getEquipmentList();
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
                    style={styles.numInput}
                    placeholder="e.g. 5"
                    keyboardType="default"
                    value={eqQuantity}
                    onChangeText={(val) => setEqQuantity(val)}
                />
                <Pressable style={styles.button} textStyle={styles.text} onPress={handleExerciseManagement}>
                    <Text style={styles.text}>Exercise Management</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text}
                onPress = {() => {
                    handleDeleteEquipment(equipmentId[0])
                    navigation.navigate('ManageEquipment')
                    // getEquipmentList();
                }}>
                    <Text style={styles.text}>Delete Equipment</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={handleManageEquipment}>
                    <Text style={styles.text}>Confirm Selection</Text>
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

const generateTableRows = (equipmentQuery) => {
    let equipmentData = equipmentQuery.map((doc) => ({ data: doc.data(), id: doc.id }))
    return equipmentData.map((eq) => [eq.id, eq.data['count'], eq.data['muscle groups'].toString()])
}

const handleDeleteEquipment = async (eqName) => {
    await EquipmentService.deleteEquipment(eqName);
}

const handleUpdateEquipment = async (eqName, eqQuantity, biceps, triceps, back, chest, legs, abs) => {
    let muscleGroups = []
    if (biceps) {
        muscleGroups.push('biceps')
    }
    if (triceps) {
        muscleGroups.push('triceps')
    }
    if (back) {
        muscleGroups.push('back')
    }
    if (chest) {
        muscleGroups.push('chest')
    }
    if (legs) {
        muscleGroups.push('legs')
    }
    if (abs) {
        muscleGroups.push('abs')
    }
    await EquipmentService.updateEquipment(eqName, eqQuantity, muscleGroups);
}


export default EditEquipment;
