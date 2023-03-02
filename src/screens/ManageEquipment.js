import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {Button} from "react-native-elements";
import EquipmentService from "../services/equipment_service";
import { Modal } from "../components/Modal";
import { CheckBox } from 'react-native-elements'
import EquipmentList from "../components/EquipmentList";
import login_service from "../services/login_service";
import styles from "../styles/styles";

function ManageEquipment({navigation}) {
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


    useEffect(() => {
        getEquipmentList();
    }, []);

    const getEquipmentList = async () => {
        const equipmentQuery = await EquipmentService.getAllEquipment();
        if (equipmentQuery !== null) {
            setTableRows(generateTableRows(equipmentQuery))
        }
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
                <Text style={styles.equipmentContainer}>Equipment at a Glance</Text>
                <EquipmentList style={styles.equipmentList} navigation={navigation}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.text}>Add Equipment</Text>
                </TouchableOpacity>
                <Modal isVisible={modalVisible}>
                    <Modal.Container>
                    <Modal.Header title="Add Equipment" />
                    <Modal.Body>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => {
                                    setModalVisible(false)
                                    }}>
                                <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                            <Text style={styles.subheader}>Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. dumbbell"
                                keyboardType="default"
                                onChangeText={(val) => setEqName(val)}
                            />
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
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handleAddEquipment(eqName, eqQuantity, biceps, triceps, back, chest, legs, abs)
                            setModalVisible(false)
                            getEquipmentList()
                            }}>
                            <Text style={styles.text}>Add Equipment</Text>
                        </TouchableOpacity>
                    </Modal.Footer>
                    </Modal.Container>
                </Modal>
            </View>
        </ScrollView>
    )
}

const generateTableRows = (equipmentQuery) => {
    let equipmentData = equipmentQuery.map((doc) => ({ data: doc.data(), id: doc.id }))
    return equipmentData.map((eq) => [eq.id, eq.data['count'], eq.data['muscle groups'].toString()])
}

const handleAddEquipment = (eqName, eqQuantity, biceps, triceps, back, chest, legs, abs) => {
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

    EquipmentService.addEquipment(eqName, eqQuantity, muscleGroups)
}



export default ManageEquipment;