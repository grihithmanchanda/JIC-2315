import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Login({ navigation })  {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = getAuth();

    //Method to register new user in firebase
    const registerNewUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log('Successfully registered new user: ', user.email); //Debugging
                navigation.navigate('UserHome')
            })
            .catch(error => alert(error.message))
    }

    //Method to log in using an existing user
    //MAYBE: create custom error messages when receiving error from firebase?
    //Duplicate method for managers, change screen that it navigates to manager home
    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log('Successfully logged in with user: ', user.email); //Debugging
                navigation.navigate('UserHome')
            })
            .catch(error => alert(error.message))
    }

    return (
        <View>
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

            <Pressable //User login button
                style={styles.userLogin} 
                textStyle={styles.text} 
                onPress={loginUser}
            >
                <Text style={styles.text}>Login as{'\n'}User</Text>
            </Pressable>
            <Pressable //Manager login button
                style={styles.managerLogin} 
                textStyle={styles.text} 
                onPress={registerNewUser} //TODO: issue with register user button being cut off screen, temporarily adding register functionality to "Login as Manager" button. replace when manager home is implemented
            >
                <Text style={styles.text}>Login as{'\n'}Manager</Text>
            </Pressable>

            <Pressable //Register user button. TODO: Create separate button for creating manager account? or separate screen
                style={styles.registerUserButton} 
                textStyle={styles.text} 
                onPress={registerNewUser} //call method to send a register user request to firebase
            >
                <Text style={styles.text}>Register User</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 50,
        textAlign: 'center',
        paddingTop: 20,
    },
    input: {
        height: 60,
        backgroundColor: '#D9D9D9',
        width: '90%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginLeft: 23
    },
    userLogin: {
        height: 150,
        backgroundColor: '#D9D9D9',
        width: '45%',
        justifyContent: 'center',
        marginTop: 100,
        marginLeft: 15
    },
    managerLogin: {
        height: 150,
        backgroundColor: '#D9D9D9',
        width: '45%',
        justifyContent: 'center',
        marginTop: -150,
        marginLeft: 215
    }, 
    registerUserButton: {
        height: 100,
        backgroundColor: '#D9D9D9',
        width: '80%',
        justifyContent: 'center',
        marginTop: 40,
        marginLeft: 43,
    },
    text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 35,
    },
})

export default Login;
