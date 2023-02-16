import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function ExerciseManagement({ navigation }) {
  return (
    <View>
      <View style={styles.Container}>
        <Text style={styles.headerText}>Exercise Management</Text>
        <Text style={styles.text}>Name of Exercise:</Text>
        <TextInput //Name of exercise field
          placeholder="Name"
          style={styles.input}
        />
        <Text style={styles.text}>Difficulty Level:</Text>
        <TextInput //Difficulty level
          placeholder="0 to 2"
          style={styles.input}
        />
        <Text style={styles.text}>Number of Repetitions:</Text>
        <TextInput //Number of repetitions
          style={styles.input}
        />
        <Text style={styles.text}>Weight Amount:</Text>
        <TextInput //Weight amount
          style={styles.input}
        />
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
});

export default ExerciseManagement;
