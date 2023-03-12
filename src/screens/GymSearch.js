import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import styles from "../styles/styles";
import gyminfo_service from "../services/gyminfo_service";

function GymSearch({navigation}) {
    const [gymName, setGymName] = useState('')

    const handleGymSearch = async () => {
        await gyminfo_service.addUserToGym(gymName)
        navigation.navigate('UserHome');
    }

    return (
        <ScrollView style={styles.outer}>
            <View style={styles.container}>
                <Text style={styles.header}>Gym Search</Text>
                <Text style={styles.subheader}>Gym Name:</Text>
                <TextInput //Name field
                    value={gymName}
                    onChangeText={text => setGymName(text)}
                    style={styles.input}
                />
                <Pressable //Submit button
                    style={styles.button}
                    textStyle={styles.text}
                    onPress={handleGymSearch}>
                <Text style={styles.text}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default GymSearch;