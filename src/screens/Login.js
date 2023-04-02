import {Pressable, Text, TextInput, View, ScrollView} from 'react-native';
import React, {useState} from "react";
import LoginService from '../services/login_service';
import styles from '../styles/styles';
import gyminfo_service from "../services/gyminfo_service";

function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Method to handle user registration button press
    const handleUserRegistration = () => {
        navigation.navigate('RegisterUser', {
            'email': email,
            'password': password,
        })
    }

    //Method to handle user login button press
    const handleLogin = (accountType) => {
        LoginService.loginUser(email, password, accountType)
            .then(async ()=> {
                if (accountType === 'User') {
                    let gym = await gyminfo_service.getGymOfUser()
                    console.log('got gym:', gym)

                    if (gym === undefined) { // user never selected their gym
                        alert('Please complete the registration process!')
                        navigation.navigate('GymSearch')
                    } else {
                        navigation.navigate('UserHome', {"gymName": gym})
                    }

                } else {
                    navigation.navigate('ManagerHome')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <ScrollView style={styles.outcontainer}>
            <View style={styles.container}>
                <Text style={styles.header}>NextGym</Text>
                <Text style={styles.subheader}>Username:</Text>
                <TextInput //Username/Email field
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <Text style={styles.subheader}>Password:</Text>
                <TextInput //Password field
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry //automatically turn characters into asterisks
                />
            </View>
            <View style={styles.loginButtonContainer}>
                <Pressable //User login button
                    style={styles.userLogin}
                    textStyle={styles.text}
                    onPress={() => handleLogin('User')}
                >
                    <Text style={styles.text}>Login as{'\n'}User</Text>
                </Pressable>
                <Text style={styles.blank}></Text>
                <Pressable //Manager login button
                    style={styles.managerLogin}
                    textStyle={styles.text}
                    onPress={() => handleLogin('Manager')}
                >
                    <Text style={styles.text}>Login as{'\n'}Manager</Text>
                </Pressable>
            </View>
            <View style={styles.container}>
                <Pressable //Registration button
                    style={styles.button}
                    textStyle={styles.text}
                    onPress={handleUserRegistration}
                >
                    <Text style={styles.text}>Register User</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text}>
                    <Text style={styles.text}>Forgot Password?</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default Login;
