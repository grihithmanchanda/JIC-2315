import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Table, Row } from 'react-native-table-component';
import EquipmentService from "../services/equipment_service";
import styles from "../styles/styles";


// renders equipment list for home pages
function ExerciseList({navigation, getWorkouts}) {
    const [exerciseData, setExerciseData] = useState([])
    const [tableRows, setTableRows] = useState([['a', 'b', 'c']]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [difficultyFilter, setDifficultyFilter] = useState('')
    const tableHead = ['Name', 'Assoc. Equipment', 'Difficulty'];

    // when selectedExercises changes, send data to superclass
    useEffect(() => {
        getWorkouts(selectedExercises);
    }, [selectedExercises])

    // when exerciseData is updated, generate updated table
    useEffect(() => {
        setTableRows(generateTableRows(exerciseData))
    }, [exerciseData])

    // when difficulty changes, get exercises from firebase
    useEffect(() => {
        getExerciseList();
    }, [difficultyFilter]);

    const getExerciseList = async () => {
        const exerciseDataSnap = await EquipmentService.getAllExercises(currentLoginEmail);
        if (exerciseDataSnap !== null) {
            setExerciseData(exerciseDataSnap)
        } else {
            //TODO: handle case when no exercises available
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

    const generateTableRows = (exerciseData) => {
        // filter by difficulty
        const filteredExerciseData = exerciseData.filter((exercise) => {
            return difficultyFilter ? exercise['difficulty'] === difficultyFilter : true
        })
        // map to table rows
        const filteredExerciseRows = filteredExerciseData.map((exercise) => [exercise['exercise name'], exercise['equipment name'], exercise['difficulty']])
        return filteredExerciseRows
    }

    return (
        <ScrollView style={styles.listContainer} scrollEnabled={true}>
            <View style={styles.pickerOuterView}>
                <Text style={styles.pickerText}>Filter by Difficulty:</Text>
                <View style={styles.pickerInnerView}>
                    <Picker style={styles.picker} itemStyle={styles.pickerItem} selectedValue={difficultyFilter} onValueChange={(difficulty) => setDifficultyFilter(difficulty)}>
                        <Picker.Item label="No Filter" value=""/>
                        <Picker.Item label="Beginner" value="beginner"/>
                        <Picker.Item label="Intermediate" value="intermediate"/>
                        <Picker.Item label="Advanced" value="advanced"/>
                    </Picker>
                </View>
            </View>
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

export default ExerciseList;