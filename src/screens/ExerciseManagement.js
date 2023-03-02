import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function ExerciseManagement({ navigation }) {
  return (
    <View>
      <View style={styles.Container}>
        <Text style={styles.headerText}>Exercise Management</Text>
        <Text style={styles.text}>Name of Exercise:</Text>
        <TextInput //Name of exercise field
          placeholder="Name"
          placeholderTextColor="#000"
          style={styles.input}
        />
        <Text style={styles.text}>Difficulty Level:</Text>
        <TextInput //Difficulty level
          keyboardType='number-pad'
          type='number'
          placeholder="0 to 2"
          placeholderTextColor="#000"
          style={styles.input}
        />
        <Text style={styles.text}>Number of Repetitions:</Text>
        <TextInput //Number of repetitions
          keyboardType='number-pad'
          type='number'
          placeholder="e.g. 5, 6, or 7"
          placeholderTextColor="#000"
          style={styles.input}
        />
        <Text style={styles.text}>Weight Amount:</Text>
        <TextInput //Weight amount
          keyboardType='number-pad'
          type='number'
          placeholder="in lbs"
          placeholderTextColor="#000"
          style={styles.input}
        />
        <Pressable //Add button
          style={styles.submit}
          textStyle={styles.text}>
          <Text style={styles.text}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    textAlign: "center",
    paddingTop: 20,
    marginBottom: 50,
  },
  input: {
    height: 40,
    backgroundColor: "#D9D9D9",
    width: "90%",
    textAlign: "center",
  },
  text: {
    color: "#000000",
    textAlign: "center",
    fontSize: 35,
  },
  submit: {
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: "#D9D9D9",
    height: 50,
    width: 150,
    borderRadius: 10,
  },
});

export default ExerciseManagement;
