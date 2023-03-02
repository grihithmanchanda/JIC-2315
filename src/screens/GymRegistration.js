import { Pressable, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import React, { useState } from "react";
import gymInfoService from '../services/gyminfo_service';
import LoginService from '../services/login_service';


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
                <Text style={styles.headerText}>Gym Registration</Text>
                <Text style={styles.headerText}>Gym Name:</Text>
                <TextInput //Name field
                    value={gymName}
                    onChangeText={text => setGymName(text)}
                    style={styles.input}
                />
                <Text style={styles.headerText}>Gym Address:</Text>
                <TextInput //Address field
                    value={address}
                    onChangeText={text => setAddress(text)}
                    style={styles.input}
                />
                <Text style={styles.headerText}>Opening Hour:</Text>
                <TextInput //Opening hour field
                    value={openingHour}
                    onChangeText={text => setOpeningHour(text)}
                    style={styles.input}
                />
                <Text style={styles.headerText}>Closing Hour:</Text>
                <TextInput //Closing hour field
                    value={closingHour}
                    onChangeText={text => setClosingHour(text)}
                    style={styles.input}
                />
                <Text style={styles.headerText}>Gym Phone Number:</Text>
                <TextInput //Gym phone number
                    keyboardType='number-pad'
                    type='number'
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    style={styles.input}
                />
                <Pressable //Submit button
                    style={styles.submit}
                    textStyle={styles.text}
                    onPress={handleGymRegistration}>
                <Text style={styles.text}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>
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
    outer: {
        flex: 1,
        backgroundColor: '#ebeeff',
    }
  });
  
  export default GymRegistration;