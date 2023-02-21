import { Pressable, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import EquipmentList from "../components/EquipmentList";

function ExerciseManagement({ route, navigation }) {
  return (
    <ScrollView style={styles.outer}>
      <View style={styles.container}>
        <Text style={styles.header}>Exercise Management</Text>
        <Text style={styles.text}>Name of Exercise:</Text>
        <TextInput //Name of exercise field
          placeholder="Name"
          placeholderTextColor="#000"
          style={styles.input}
        />
        {/* <Text style={styles.text}>Relevant Equipment:</Text>
        <EquipmentList style={styles.equipmentList} ></EquipmentList> */}
        <Text style={styles.subheader}>Difficulty Level:</Text>
        <TextInput //Difficulty level
          keyboardType='number-pad'
          type='number'
          placeholder="0 to 2"
          placeholderTextColor="#000"
          style={styles.input}
        />
        <Text style={styles.subheader}>Number of Repetitions:</Text>
        <TextInput //Number of repetitions
          keyboardType='number-pad'
          type='number'
          placeholder="e.g. 5, 6, or 7"
          placeholderTextColor="#000"
          style={styles.input}
        />
        <Text style={styles.subheader}>Weight Amount:</Text>
        <TextInput //Weight amount
          keyboardType='number-pad'
          type='number'
          placeholder="in lbs"
          placeholderTextColor="#000"
          style={styles.input}
        />
        <Pressable //Add button
          style={styles.button}
          textStyle={styles.text}>
          <Text style={styles.textWhite}>Add</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
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
      fontSize: 35,
      textAlign: 'center',
      paddingTop: 15,
      paddingBottom: 20,
  },
  subheader: {
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 15,
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
      // color: '#ebeeff',
      textAlign: 'center',
      fontSize: 30,
  },
  textWhite: {
    color: '#ebeeff',
    textAlign: 'center',
    fontSize: 30,
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
      // width: '60%',
      // justifyContent: 'center',
  },
  equipmentContainer: {
    fontSize: 20,
    textAlign: "center",
  },
  equipmentList: {
    height: "flex",
    paddingTop: 20,
    paddingBottom: 20,
  },
  outer: {
    flex: 1,
    backgroundColor: '#ebeeff',
  }
});

export default ExerciseManagement;
