import React, { useEffect, useState } from "react";
import { ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import EquipmentService from "../services/equipment_service";
import styles from "../styles/styles";


// renders equipment list for home pages
function EquipmentList({navigation}) {
    const [tableRows, setTableRows] = useState([['a', 'b', 'c']]);
    const tableHead = ['Name', 'Quantity', 'Muscle Groups'];

    useEffect(() => {
        getEquipmentList();
    }, []);

    const getEquipmentList = async () => {
        const equipmentQuery = await EquipmentService.getAllEquipment();
        if (equipmentQuery !== null) {
            setTableRows(generateTableRows(equipmentQuery))
        }
    }

    const handleEditEquipment = (equipmentId) => {
        navigation.navigate('EditEquipment', {
            'equipment': equipmentId
        })
    }

    return (
        <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
        <Table style={styles.table} >
            <Row data={tableHead} flexArr={[2, 1, 2]} style={styles.head} textStyle={styles.headtext} />
                {   
                    tableRows.map((tableRow, index) => (
                        <Row
                        key={index}
                        data={tableRow}
                        flexArr={[2, 1, 2]}
                        style={styles.row}
                        textStyle={styles.text}
                        onPress={() => navigation ? handleEditEquipment(tableRow) : void(0)}
                        />
                    ))
                }
        </Table>
    </ScrollView>
    )
}

const generateTableRows = (equipmentQuery) => {
    let equipmentData = equipmentQuery.map((doc) => ({ data: doc.data(), id: doc.id }))
    return equipmentData.map((eq) => [eq.id, eq.data['count'], eq.data['muscle groups'].toString()])
}

export default EquipmentList;