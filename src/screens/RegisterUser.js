import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from "react";
import { CheckBox } from 'react-native-elements'
import LoginService from '../services/login_service';

function RegisterUser({route, navigation}) {
    const [email, setEmail] = useState(route?.params['email'] ?? '')
    const [password, setPassword] = useState(route?.params['password'] ?? '')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [accountType, setAccountType] = useState('User')

    const registerUser = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        await LoginService.registerNewUser(email, password, accountType)
            .then((user) => {
                alert(`User ${user.email} registered!`);
                navigation.navigate(accountType === 'User' ? 'UserHome' : 'GymRegistration');
            })
            .catch(error => alert(error.message))
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.headerText}>Create account</Text>
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
                <Text style={styles.text}>Confirm Password:</Text>
                <TextInput //Password Confirmation field
                    placeholder="Password"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    style={styles.input}
                    secureTextEntry //automatically turn characters into asterisks
                />
            </View>
            <Text style={styles.text}>Account Type:</Text>
            <View style={styles.checkboxWrapper}>
                <CheckBox
                    checked={accountType === 'User'}
                    title="Gym User"
                    onPress={() => setAccountType('User')}
                />
                <CheckBox
                    checked={accountType === 'Manager'}
                    title="Gym Manager"
                    onPress={() => setAccountType('Manager')}
                />
            </View>

            <View style={styles.container}>
                <Pressable style={styles.forgotPassword} textStyle={styles.text} onPress={registerUser}>
                    <Text style={styles.text}>Register</Text>
                </Pressable>
            </View>
            <View style={styles.container}>
                <Pressable style={styles.forgotPassword} textStyle={styles.text}
                           onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.text}>Go back</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        paddingBottom: 30,
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
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingLeft: 30,
        display: "flex",
        flexWrap: "wrap",
    },
})

export default RegisterUser;