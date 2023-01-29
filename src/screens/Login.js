import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from "react";
import LoginService from "../services/login_service";

function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Method to handle user registration button press
    const handleUserRegistration = () => {
        LoginService.registerNewUser(email, password, "User")
            .then((user) => {
                alert('User registered!' + user.email)
            })
            // .then(userCredential => {
            //     const user = userCredential.user;
            //     // console.log('Successfully registered new user: ', user.email); //Debugging
            //     navigation.navigate('UserHome')
            // })
            .catch(error => alert(error.message))
    }

    //Method to handle user login button press
    const handleUserLogin = () => {
        LoginService.loginUser(email, password)
            .then((user) => {
                // console.log('Successfully logged in with user: ', user.email); //Debugging
                navigation.navigate('UserHome')
            })
            .catch(error => alert(error.message))
    }

    return (
        <View>
            <View style={styles.Container}>
                <Text style={styles.headerText}>NextGym</Text>
                <Text style={styles.text}>Username:</Text>
                <TextInput //Username/Email field
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <Text style={styles.text}>Password:</Text>
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
                    onPress={handleUserLogin}
                >
                    <Text style={styles.text}>Login as{'\n'}User</Text>
                </Pressable>
                <Text style={styles.blank}></Text>
                <Pressable //Manager login button
                    style={styles.managerLogin}
                    textStyle={styles.text}
                    onPress={handleUserRegistration} //TODO: No register user button, so the manager button, which is not currently implemented, is temporarily being used to perform this task.
                >
                    <Text style={styles.text}>Login as{'\n'}Manager</Text>
                </Pressable>
            </View>
            <View style={styles.Container}>
                <Pressable style={styles.forgotPassword} textStyle={styles.text}>
                    <Text style={styles.text}>Forgot Password?</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'column',
        justfiyContent: 'center',
        alignItems: 'center',
    },
    loginButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    headerText: {
        fontSize: 50,
        textAlign: 'center',
        paddingTop: 20,
    },
    input: {
        height: 40,
        backgroundColor: '#D9D9D9',
        width: '90%',
        textAlign: 'center',
    },
    userLogin: {
        height: 150,
        backgroundColor: '#D9D9D9',
        width: '43%',
        justifyContent: 'center',
    },
    blank: {
        height: 150,
        backgroundColor: 'FFFFFF',
        width: '4%',
    },
    managerLogin: {
        height: 150,
        backgroundColor: '#D9D9D9',
        width: '43%',
        justifyContent: 'center',
    },
    forgotPassword: {
        height: 80,
        backgroundColor: '#D9D9D9',
        width: '90%',
        justifyContent: 'center',
        marginTop: 15,
    },
    text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 35,
    },
})

export default Login;
