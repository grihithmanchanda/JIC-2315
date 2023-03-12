import React, { useEffect, useState } from "react";
import { ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import EquipmentService from "../services/equipment_service";
import styles from "../styles/styles";


// renders equipment list for home pages
function ExerciseList({navigation, getWorkouts}) {
    const [tableRows, setTableRows] = useState([['a', 'b', 'c']]);
    const tableHead = ['Name', 'Assoc. Equipment', 'Difficulty'];
    const [selectedExercises, setSelectedExercises] = useState([]);

    useEffect(() => {
        getExerciseList();
    }, []);

    useEffect(() => {
        getWorkouts(selectedExercises);
    }, [selectedExercises])

    const getExerciseList = async () => {
        const exerciseData = await EquipmentService.getAllExercises(currentLoginEmail);
        if (exerciseData !== null) {
            setTableRows(generateTableRows(exerciseData))
        }
    }

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
        <ScrollView style={styles.listContainer} scrollEnabled={true}>
            <Table style={styles.table} >
                <Row data={tableHead} flexArr={[2, 1, 2]} style={styles.head} textStyle={styles.headtext} />
                    {   
                        tableRows.map((tableRow, index) => (
                            <Row
                            key={index}
                            data={tableRow}
                            flexArr={[2, 1, 2]}
                            style={selectedExercises.includes(tableRow[0]) ? styles.rowSel : styles.row}
                            textStyle={selectedExercises.includes(tableRow[0]) ? styles.textWhite : styles.tableText}
                            onPress={() => handleExerciseSelect(tableRow[0])}
                            />
                        ))
                    }
            </Table>
        </ScrollView>
    )
}

const generateTableRows = (exerciseData) => {
    return exerciseData.map((exercise) => [exercise['exercise name'], exercise['equipment name'], exercise['difficulty']])
}

export default ExerciseList;