import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import gyminfo_service from "../services/gyminfo_service";

function GymSearch({navigation}) {
    const [gymName, setGymName] = useState('')

    const handleGymSearch = async () => {
        navigation.navigate('UserHome');
        let gymData = {} // dictionary mapping gym name -> firebase reference

        let gymQuery = await gyminfo_service.getAllGymInfo() // get all gyms
        await gymQuery.forEach((doc) => {
            gymData[doc.id] = doc.ref; // store gym name and reference
        });

        console.log('gym list:', Object.keys(gymData)) // print all gym names

        // TODO:
        // 1. get user document reference using userEmail parameter
        // 2. match user's entered gym name with map of gym references to get appopriate document reference
        // 3. add user's reference to gym document

        // navigation.navigate('UserHome');
    }

    return (
        <View>
            <View style={styles.Container}>
                <Text style={styles.headerText}>Gym Search</Text>
                <Text style={styles.headerText}>Gym Name:</Text>
                <TextInput //Name field
                    value={gymName}
                    onChangeText={text => setGymName(text)}
                    style={styles.input}
                />
                <Pressable //Submit button
                    style={styles.submit}
                    textStyle={styles.text}
                    onPress={handleGymSearch}>
                <Text style={styles.text}>Submit</Text>
                </Pressable>
            </View>
        </View>
    )
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
    submit: {
        justifyContent: 'center',
        marginTop: 15,
        backgroundColor: "#D9D9D9",
        height: 50,
        width: 150,
        borderRadius: 10,
    },
  });
  
  export default GymSearch;