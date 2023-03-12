import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import styles from "../styles/styles";

function GymInformation({navigation}) {
    const handleReturn = () => {
        navigation.navigate('UserHome');
    };

    return (
        <ScrollView style={styles.outer}>
            <View style={styles.container}>
                <Text style={styles.header}>Gym Information</Text>
                <Text style={styles.subheader}>Gym Name:</Text>
                <Text style={styles.subheader}>Address:</Text>
                <Text style={styles.subheader}>Hours of Operation:</Text>
                <Text style={styles.subheader}>Phone Number:</Text>
                <Text style={styles.subheader}>Manager Email:</Text>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => handleReturn()}>
                    <Text style={styles.text}>Back</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default GymInformation;