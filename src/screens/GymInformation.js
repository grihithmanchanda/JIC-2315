import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function GymInformation({navigation}) {
    const handleReturn = () => {
        navigation.navigate('UserHome');
    };

    return (
        <View>
            <View style={styles.Container}>
                <Text style={styles.headerText}>Gym Information</Text>
                <Text style={styles.text}>Gym Name:</Text>
                <Text style={styles.text}>Address:</Text>
                <Text style={styles.text}>Hours of Operation:</Text>
                <Text style={styles.text}>Phone Number:</Text>
                <Text style={styles.text}>Manager Email:</Text>
                <Pressable style={styles.back} textStyle={styles.text} onPress={() => handleReturn()}>
                    <Text style={styles.text}>Back</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 50,
        textAlign: 'center',
        paddingTop: 20,
        marginBottom: 50,
    },
    text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 35,
    },
    back: {
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: "#D9D9D9",
        height: 50,
        width: 150,
        borderRadius: 10,
    },
})

export default GymInformation;