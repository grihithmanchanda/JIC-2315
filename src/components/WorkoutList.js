import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import EquipmentService from "../services/equipment_service";


// is equipment list for now; will need help switching

// renders equipment list for home pages
const WorkoutList = ({getWorkouts}) => {
    const [tableRows, setTableRows] = useState([['a', 'b', 'c']]);
    const [workouts, setWorkouts] = useState([]);
    const tableHead = ['Name', 'Quantity', 'Muscle Groups'];

    useEffect(() => {
        getEquipmentList();
    }, []);

    const getEquipmentList = async () => {
        console.log('getting equipment...');
        const equipmentQuery = await EquipmentService.getAllEquipment();
        if (equipmentQuery !== null) {
            setTableRows(generateTableRows(equipmentQuery))
        }
    }

    getWorkouts(workouts);

    function handleWorkouts(row) {
        var newWorkouts = workouts;
        if (workouts.includes(row)) {
            newWorkouts = workouts.filter(i => i != row);
        } else if (workouts.length < 4) {
            newWorkouts = [...workouts, row];
        }
        setWorkouts(newWorkouts);
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
                            style={workouts.includes(tableRow[0]) ? styles.rowSel : styles.row}
                            textStyle={workouts.includes(tableRow[0]) ? styles.textWhite : styles.text}
                            onPress={() => handleWorkouts(tableRow[0])}
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
    row: { height: 28, backgroundColor: '#ebeeff', borderWidth: 0.5,  borderRadius: 4 },
    rowSel: { height: 28, backgroundColor: '#ebeeff', borderWidth: 0.5,  borderRadius: 4, backgroundColor: '#293571'},
    text: { textAlign: 'center' },
    textWhite: { textAlign: 'center', color: '#ffffff' },
    table: {paddingBottom: 35}
});


const generateTableRows = (equipmentQuery) => {
    equipmentData = equipmentQuery.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    return equipmentData.map((eq) => [eq.id, eq.data['count'], eq.data['muscle groups'].toString()])
}

export default WorkoutList;