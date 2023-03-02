import {Pressable, StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
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
    const handleLogin = (accountType) => {
        LoginService.loginUser(email, password, accountType)
            .then(()=> {
                navigation.navigate(accountType === 'User' ? 'UserHome' : 'ManagerHome');
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebeeff',
        height: '80%',
        alignItems: 'center',
        paddingBottom: 30
      },
      outcontainer: {
        flex: 1,
        backgroundColor: '#ebeeff',
        paddingBottom: 40,
        height: '80%',
      },
      header: {
          fontSize: 50,
          textAlign: 'center',
          paddingTop: 15,
          paddingBottom: 20,
      },
      subheader: {
        fontSize: 35,
        textAlign: 'center',
        paddingTop: 30,
      },
      button: {
          height: 70,
          backgroundColor: '#051739',
          width: '90%',
          borderWidth: 1,
          paddingVertical: 15,
          paddingHorizontal: 20,
          justifyContent: 'center',
          borderRadius: 4,
          marginTop: 20,
      },
      text: {
          color: '#ebeeff',
          textAlign: 'center',
          fontSize: 30,
      },
      outer: {
          flex: 1,
          backgroundColor: '#ebeeff',
      },
      checkboxWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 5,
          display: "flex",
          flexWrap: "wrap",
      },
      input: {
          paddingTop: 15,
          borderColor: "grey",
          borderBottomWidth: 2,
          width: '80%',
          fontSize: 20,
      },
    loginButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    userLogin: {
        height: 150,
        backgroundColor: '#051739',
        borderRadius: 4,
        width: '43%',
        justifyContent: 'center',
    },
    blank: {
        height: 150,
        backgroundColor: '#ebeeff',
        width: '4%',
    },
    managerLogin: {
        height: 150,
        backgroundColor: '#D9D9D9',
        backgroundColor: '#051739',
        borderRadius: 4,
        width: '43%',
        justifyContent: 'center',
    },
})

export default Login;
