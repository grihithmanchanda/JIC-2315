import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import EquipmentService from "../services/equipment_service";


// renders equipment list for home pages
function ExerciseList({navigation, getWorkouts}) {
    const [tableRows, setTableRows] = useState([['a', 'b', 'c']]);
    const tableHead = ['Name', 'Assoc. Equipment', 'Difficulty'];
    const [selectedExercises, setSelectedExercises] = useState([]);

    useEffect(() => {
        getExerciseList();
    }, []);

    const getExerciseList = async () => {
        console.log('getting exercises...');
        const exerciseData = await EquipmentService.getAllExercises();
        if (exerciseData !== null) {
            setTableRows(generateTableRows(exerciseData))
        }
    }

    getWorkouts(selectedExercises);

    function handleExerciseSelect(row) {
        var newExercises = selectedExercises;
        if (selectedExercises.includes(row)) {
            newExercises = selectedExercises.filter(i => i != row);
        } else if (selectedExercises.length < 4) {
            newExercises = [...selectedExercises, row];
        }
        setSelectedExercises(newExercises);
    }

    return (
        <ScrollView style={styles.container} scrollEnabled={true}>
            <Table style={styles.table} >
                <Row data={tableHead} flexArr={[2, 1, 2]} style={styles.head} textStyle={styles.headtext} />
                    {   
                        tableRows.map((tableRow, index) => (
                            <Row
                            key={index}
                            data={tableRow}
                            flexArr={[2, 1, 2]}
                            style={selectedExercises.includes(tableRow[0]) ? styles.rowSel : styles.row}
                            textStyle={selectedExercises.includes(tableRow[0]) ? styles.textWhite : styles.text}
                            onPress={() => handleExerciseSelect(tableRow[0])}
                            />
                        ))
                    }
            </Table>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 16, width: '90%', backgroundColor: '#8794d4', overflow: 'scroll', borderRadius: 4 },
    head: { height: 40, backgroundColor: '#051739', borderWidth: 1, borderRadius: 4 },
    headtext: { color: '#ebeeff', textAlign: 'center' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 40, backgroundColor: '#ebeeff', borderWidth: 0.5,  borderRadius: 4 },
    rowSel: { height: 40, backgroundColor: '#ebeeff', borderWidth: 0.5,  borderRadius: 4, backgroundColor: '#293571'},
    text: { textAlign: 'center' },
    textWhite: { textAlign: 'center', color: '#ffffff' },
    table: {paddingBottom: 35}
});

const generateTableRows = (exerciseData) => {
    return exerciseData.map((exercise) => [exercise['exercise name'], exercise['equipment name'], exercise['difficulty']])
    // equipmentData = equipmentQuery.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    // return equipmentData.map((eq) => [eq.id, eq.data['count'], eq.data['muscle groups'].toString()])
}

export default ExerciseList;