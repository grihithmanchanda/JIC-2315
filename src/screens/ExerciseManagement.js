import React, { useState } from "react";
import { Pressable, Text, TextInput, View, ScrollView } from "react-native";
import workout_service from "../services/workout_service";
import styles from "../styles/styles";

function ExerciseManagement({ route, navigation }) {
  const [eqName, setEqName] = useState(route?.params['equipID'] ?? '')
  const [exerciseName, setExerciseName] = useState('')
  const [difficultyLevel, setDifficultyLevel] = useState(0)
  const [numReps, setNumReps] = useState(0)
  const [amtWeight, setAmtWeight] = useState(0)
  const [exerciseComment, setExerciseComment] = useState('')

  const handleExerciseCreation = async () => {
    await workout_service.addExercise(eqName, exerciseName, difficultyLevel, numReps, amtWeight, exerciseComment).then((exerciseData) => {
      navigation.navigate('EditEquipment', {
        'equipment': eqName
      });
    })
  };

  return (
    <ScrollView style={styles.outer}>
      <View style={styles.container}>
        <Text style={styles.header}>{eqName} exercise:</Text>
        <Text style={styles.text}>Name of Exercise:</Text>
        <TextInput //Name of exercise field
          placeholder="Name"
          style={styles.input}
          onChangeText={text => setExerciseName(text)}
        />
        {/* <Text style={styles.text}>Relevant Equipment:</Text>
        <EquipmentList style={styles.equipmentList} ></EquipmentList> */}
        <Text style={styles.subheader}>Difficulty Level:</Text>
        <TextInput //Difficulty level
          keyboardType='number-pad'
          type='number'
          placeholder="0 to 2"
          style={styles.input}
          onChangeText={text => setDifficultyLevel(text)}
        />
        <Text style={styles.subheader}>Number of Repetitions:</Text>
        <TextInput //Number of repetitions
          keyboardType='number-pad'
          type='number'
          placeholder="e.g. 5, 6, or 7"
          style={styles.input}
          onChangeText={text => setNumReps(text)}
        />
        <Text style={styles.subheader}>Weight Amount:</Text>
        <TextInput //Weight amount
          keyboardType='number-pad'
          type='number'
          placeholder="in lbs"
          style={styles.input}
          onChangeText={text => setAmtWeight(text)}
        />
        <Text style={styles.subheader}>Comments:</Text>
        <TextInput //Exercise comments
          placeholder="Comments"
          style={styles.input}
          onChangeText={text => setExerciseComment(text)}
        />
        <Pressable //Add button
          style={styles.button}
          textStyle={styles.text}
          onPress={handleExerciseCreation}>
          <Text style={styles.text}>Add</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default ExerciseManagement;
