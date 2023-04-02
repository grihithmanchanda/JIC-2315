import React, {useState, useEffect} from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import styles from "../styles/styles";
import gyminfo_service from "../services/gyminfo_service";

function GymInformation({navigation}) {
    const handleReturn = () => {
        navigation.navigate('UserHome');
    };

    const [gymAddress, setGymAddress] = useState('')
    const [gymName, setGymName] = useState('')
    const [hourEnd, setHourEnd] = useState('')
    const [hourStart, setHourStart] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [managerEmail, setManagerEmail] = useState('')

    useEffect(() => {
        getGymData();
        // 'gymAddress': gymAddress,
        // 'gymName': gymName,
        // 'hourEnd': hourEnd,
        // 'hourStart': hourStart,
        // 'phoneNumber': phoneNumber,
        // 'managerEmail': email,
    }, []);

    const getGymData = async () => {
        let gymData = await gyminfo_service.getGymInfo();

        setGymAddress(gymData.gymAddress)
        setGymName(gymData.gymName)
        setHourEnd(gymData.hourEnd)
        setHourStart(gymData.hourStart)
        setPhoneNumber(gymData.phoneNumber)
        setManagerEmail(gymData.managerEmail)
        
    }

    return (
        <ScrollView style={styles.outer}>
            <View style={styles.container}>
                <Text style={styles.header}>Gym Information</Text>
                <Text style={styles.subheader}>Gym Name: {gymName}</Text>
                <Text style={styles.subheader}>Address: {gymAddress}</Text>
                <Text style={styles.subheader}>Hours of Operation: {hourStart} to {hourEnd}</Text>
                <Text style={styles.subheader}>Phone Number: {phoneNumber}</Text>
                <Text style={styles.subheader}>Manager Email: {managerEmail}</Text>
                <Pressable style={styles.button} textStyle={styles.text} onPress={() => handleReturn()}>
                    <Text style={styles.text}>Back</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default GymInformation;