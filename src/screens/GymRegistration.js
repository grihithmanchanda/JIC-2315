import { Pressable, Text, TextInput, View, ScrollView } from "react-native";
import React, { useState } from "react";
import gymInfoService from '../services/gyminfo_service';
import styles from "../styles/styles";


function GymRegistration({navigation}) {
    const [gymName, setGymName] = useState('')
    const [address, setAddress] = useState('')
    const [openingHour, setOpeningHour] = useState('')
    const [closingHour, setClosingHour] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)

    const handleGymRegistration = async () => {
        if (gymName == "" || address == "" || openingHour == "" || closingHour == "" || phoneNumber == "") {
            alert("Please fill in all fields!");
            return;
        }
        await gymInfoService.addGymInfo(gymName, address, gymName, openingHour, closingHour, phoneNumber, currentLoginEmail)
            .then(() => {
                alert(`Gym registered!`);
                navigation.navigate('ManagerHome');
            })
            .catch(error => alert(error.message))
    }

    return (
        <ScrollView style={styles.outer}>
            <View style={styles.Container}>
                <Text style={styles.header}>Gym Registration</Text>
                <Text style={styles.header}>Gym Name:</Text>
                <TextInput //Name field
                    value={gymName}
                    onChangeText={text => setGymName(text)}
                    style={styles.input}
                />
                <Text style={styles.header}>Gym Address:</Text>
                <TextInput //Address field
                    value={address}
                    onChangeText={text => setAddress(text)}
                    style={styles.input}
                />
                <Text style={styles.header}>Opening Hour:</Text>
                <TextInput //Opening hour field
                    value={openingHour}
                    onChangeText={text => setOpeningHour(text)}
                    style={styles.input}
                />
                <Text style={styles.header}>Closing Hour:</Text>
                <TextInput //Closing hour field
                    value={closingHour}
                    onChangeText={text => setClosingHour(text)}
                    style={styles.input}
                />
                <Text style={styles.header}>Gym Phone Number:</Text>
                <TextInput //Gym phone number
                    keyboardType='number-pad'
                    type='number'
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    style={styles.input}
                />
                <Pressable //Submit button
                    style={styles.submit}
                    textStyle={styles.darkText}
                    onPress={handleGymRegistration}>
                <Text style={styles.darkText}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

  
  export default GymRegistration;