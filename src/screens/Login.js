import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from "react";
import LoginService from '../services/login_service';

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
    const handleUserLogin = () => {
        LoginService.loginUser(email, password)
            .then(() => {
                navigation.navigate('UserHome')
            })
            .catch(error => alert(error.message))
    }

    const handleManagerLogin = () => {
        LoginService.loginUser(email, password)
            .then(() => {
                navigation.navigate('ManagerHome')
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
                    onPress={handleManagerLogin}
                >
                    <Text style={styles.text}>Login as{'\n'}Manager</Text>
                </Pressable>
            </View>
            <View style={styles.Container}>
                <Pressable //Registration button
                    style={styles.register}
                    textStyle={styles.text}
                    onPress={handleUserRegistration}
                >
                    <Text style={styles.text}>Register User</Text>
                </Pressable>
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
        justifyContent: 'center',
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
        backgroundColor: '#FFFFFF',
        width: '4%',
    },
    managerLogin: {
        height: 150,
        backgroundColor: '#D9D9D9',
        width: '43%',
        justifyContent: 'center',
    },
    register: {
        height: 80,
        backgroundColor: '#D9D9D9',
        width: '90%',
        justifyContent: 'center',
        marginTop: 15,
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
