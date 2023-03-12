import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebeeff',
        paddingBottom: 40,
        height: '80%',
        alignItems: 'center',
    },
    outcontainer: {
        flex: 1,
        backgroundColor: '#ebeeff',
        paddingBottom: 40,
        height: '80%',
    },
    header: {
        fontSize: 40,
        textAlign: 'center',
        paddingTop: 15,
    },
    subheader: {
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 15
    },
    subsubheader: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10
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
        paddingTop: 10,
        height: 'flex'
    },
    listContainer: {
        flex: 1,
        padding: 16,
        paddingTop: 16,
        width: '90%', 
        backgroundColor: '#8794d4',
        overflow: 'scroll',
        borderRadius: 4
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
    darkText: {
        color: "#000000",
        textAlign: "center",
        fontSize: 35,
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
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        display: "flex",
        flexWrap: "wrap",
    },
    input: {
        paddingTop: 10,
        borderColor: "grey",
        borderBottomWidth: 2,
        width: '80%',
        fontSize: 20,
        textAlign: "center",
    },
    numInput: {
        paddingTop: 10,
        borderColor: "grey",
        borderBottomWidth: 2,
        width: '15%',
        fontSize: 20,
        textAlign: "center",
    },
    loginButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    userLogin: {
        height: 150,
        backgroundColor: '#051739',
        borderRadius: 4,
        width: '43%',
        justifyContent: 'center',
    },
    blank: {
        height: 150,
        backgroundColor: '#ebeeff',
        width: '4%',
    },
    managerLogin: {
        height: 150,
        backgroundColor: '#051739',
        borderRadius: 4,
        width: '43%',
        justifyContent: 'center',
    },
    head: {
        height: 40,
        backgroundColor: '#051739',
        borderWidth: 1,
        borderRadius: 4
    },
    headtext: {
        color: '#ebeeff',
        textAlign: 'center'
    },
    wrapper: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        backgroundColor: '#f6f8fa'
    },
    row: {
        height: 28,
        backgroundColor: '#ebeeff',
        borderWidth: 0.5,
        borderRadius: 4
    },
    rowSel: {
        height: 28,
        backgroundColor: '#293571',
        borderWidth: 0.5,
        borderRadius: 4
    },
    table: {
        paddingBottom: 35
    },
    modalText : {
        textAlign: "center",
        marginTop: 20
    },
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
    body: {
        justifyContent: "center",
        paddingHorizontal: 15,
        minHeight: 100,
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
    },
    modalHeader: {
        alignItems: "center",
        justifyContent: "center",
    },
    modalContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
        alignItems: "center",
    },
    modalView: {
        alignItems: "center",
    },
    tableText: {
        textAlign: 'center'
    },
    textWhite: {
        textAlign: 'center',
        color: '#ffffff'
    },

    // picker styling
    pickerText: {
        textAlign: 'left',
        color:'#ffffff',
        width: '50%'
    },
    pickerInnerView: {
        width: '50%',
        marginLeft: 10
    },
    pickerOuterView: {
        flexDirection: 'row'
    },
    pickerItem: {
        color:'#ffffff',
        width:'50%',
        textAlign: 'center'
    }
});

export default styles;
