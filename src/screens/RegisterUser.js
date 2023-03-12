import { Pressable, Text, TextInput, View } from 'react-native';
import React, { useState } from "react";
import { CheckBox } from 'react-native-elements'
import LoginService from '../services/login_service';
import styles from '../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';

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
                navigation.navigate(accountType === 'User' ? 'GymSearch' : 'GymRegistration');
            })
            .catch(error => alert(error.message))
    }

    return (
        <ScrollView style={styles.outer}>
            <View style={styles.container}>
                <Text style={styles.header}>Create account</Text>
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
                <Text style={styles.subheader}>Confirm Password:</Text>
                <TextInput //Password Confirmation field
                    placeholder="Password"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    style={styles.input}
                    secureTextEntry //automatically turn characters into asterisks
                />
            </View>
            <Text style={styles.subheader}>Account Type:</Text>
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
                <Pressable style={styles.button} textStyle={styles.text} onPress={registerUser}>
                    <Text style={styles.text}>Register</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text}
                           onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.text}>Go back</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default RegisterUser;