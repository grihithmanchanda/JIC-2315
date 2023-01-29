import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import EquipmentService from "../services/equipment_service";


// renders equipment list for home pages
const EquipmentList = (props) => {
    const [tableRows, setTableRows] = useState([['a', 'b', 'c']])
    const tableHead = ['Name', 'Quantity', 'Muscle Groups']

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

    return (
        <ScrollView style={styles.container} scrollEnabled={true}>
            <Table style={styles.table} >
                <Row data={tableHead} flexArr={[2, 1, 2]} style={styles.head} textStyle={styles.headtext} />
                <TableWrapper style={styles.wrapper}>
                    <Rows data={tableRows} flexArr={[2, 1, 2]} style={styles.row} textStyle={styles.text} />
                </TableWrapper>
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
    text: { textAlign: 'center' },
    table: {paddingBottom: 35}
});

const generateTableRows = (equipmentQuery) => {
    equipmentData = equipmentQuery.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    return equipmentData.map((eq) => [eq.id, eq.data['count'], eq.data['muscle groups'].toString()])
}

export default EquipmentList;