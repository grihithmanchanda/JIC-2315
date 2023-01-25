import React from "react";
import { Button, Text, View, StyleSheet, Pressable, TextInput } from 'react-native';

function Login({ navigation })  {
    return (
        <View>
            <Text style={styles.headerText}>NextGym</Text>
            <Button
                title="User Home"
                onPress={() => navigation.navigate('UserHome')}
            />
            <Text style={styles.text}>Username:</Text>
            <TextInput style={styles.input}/>
            <Text style={styles.text}>Password:</Text>
            <TextInput style={styles.input}/>
            <Pressable style={styles.userLogin} textStyle={styles.text}>
                <Text style={styles.text}>Login as{'\n'}User</Text>
            </Pressable>
            <Pressable style={styles.managerLogin} textStyle={styles.text}>
                <Text style={styles.text}>Login as{'\n'}Manager</Text>
            </Pressable>
            <Pressable style={styles.forgotPassword} textStyle={styles.text}>
                <Text style={styles.text}>Forgot Password?</Text>
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
    forgotPassword: {
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
