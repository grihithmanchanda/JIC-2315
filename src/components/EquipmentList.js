import React, { useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
// import { Table } from "react-bootstrap"; // no longer using react-bootstrap
import EquipmentService from "../services/equipment_service";
import { Modal } from "../components/Modal";
import { CheckBox } from 'react-native-elements'

const EquipmentList = (props) => {
    const [tableRows, setTableRows] = useState([['a', 'b', 'c']])
    const tableHead = ['Name', 'Quantity', 'Muscle Groups']

    useEffect(() => {
        getEquipmentList();
        // addEquipmentTest();
    }, []);

    const getEquipmentList = async () => {
        console.log('getting equipment...');
        const equipmentQuery = await EquipmentService.getAllEquipment();
        if (equipmentQuery !== null) {
            setTableRows(generateTableRows(equipmentQuery))
        }
        console.log('---------')
        console.log(tableRows)
        console.log('---------')
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
    container: { flex: 1, padding: 16, paddingTop: 16, width: '90%', backgroundColor: '#912626', overflow: 'scroll', borderRadius: 4 },
    head: { height: 40, backgroundColor: '#671111', borderWidth: 1, borderRadius: 4 },
    headtext: { color: '#ffebeb', textAlign: 'center' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28, backgroundColor: '#ffebeb', borderWidth: 0.5,  borderRadius: 4 },
    text: { textAlign: 'center' },
    table: {paddingBottom: 35}
});

const generateTableRows = (equipmentQuery) => {
    equipmentData = equipmentQuery.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    return equipmentData.map((eq) => [eq.id, eq.data['count'], eq.data['muscle groups'].toString()])
}

export default EquipmentList;