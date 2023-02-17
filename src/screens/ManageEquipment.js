import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import {Button} from "react-native-elements";
import EquipmentService from "../services/equipment_service";
import { Modal } from "../components/Modal";
import { CheckBox } from 'react-native-elements'
import EquipmentList from "../components/EquipmentList";

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
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => {
                                setModalVisible(false)
                                }}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. dumbbell"
                            keyboardType="default"
                            onChangeText={(val) => setEqName(val)}
                        />
                        <Text style={styles.modalText}>Muscle groups</Text>
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
                        <Text style={styles.modalText}>Quantity</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 5"
                            keyboardType="default"
                            onChangeText={(val) => setEqQuantity(val)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handleAddEquipment(eqName, eqQuantity, biceps, triceps, back, chest, legs, abs)
                            setModalVisible(false)
                            getEquipmentList()
                            }}>
                            <Text style={styles.buttonText}>Add Equipment</Text>
                        </TouchableOpacity>
                    </Modal.Footer>
                    </Modal.Container>
                </Modal>
            </View>
        </ScrollView>
    )
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
    buttonText: {
        color: '#ebeeff',
        textAlign: 'center',
        fontSize: 20,
    },
    outer: {
        flex: 1,
        backgroundColor: '#ebeeff',
    },
    head: { height: 40, backgroundColor: '#051739', borderWidth: 1, borderRadius: 4 },
    headtext: { color: '#ebeeff', textAlign: 'center' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28, backgroundColor: '#ebeeff', borderWidth: 0.5,  borderRadius: 4 },
    table: {paddingBottom: 35},
    modalText : { textAlign: "center", marginTop: 20 },
    backButton: {
        display: 'flex',
        marginTop: 20,
        height: 30,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        backgroundColor: '#051739',
        shadowColor: '#293571',
        shadowOpacity: 0.5,
        shadowOffset: { 
          height: 10, 
          width: 0 
        },
        shadowRadius: 25,
      },
    input: {
        paddingTop: 10,
        borderColor: "grey",
        borderBottomWidth: 2,
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        display: "flex",
        flexWrap: "wrap",
    },
});

const generateTableRows = (equipmentQuery) => {
    equipmentData = equipmentQuery.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    return equipmentData.map((eq) => [eq.id, eq.data['count'], eq.data['muscle groups'].toString()])
}

const handleAddEquipment = (eqName, eqQuantity, biceps, triceps, back, chest, legs, abs) => {
    muscleGroups = []
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