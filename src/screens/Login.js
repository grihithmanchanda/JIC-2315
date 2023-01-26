import React from "react";
import { Button, Text, View, StyleSheet, Pressable, TextInput } from 'react-native';

function Login({ navigation })  {
    return (
        <View>
            <View style={styles.Container}>
                <Text style={styles.headerText}>NextGym</Text>
                <Button
                    title="User Home"
                    onPress={() => navigation.navigate('UserHome')}
                />
                <Text style={styles.text}>Username:</Text>
                <TextInput style={styles.input}/>
                <Text style={styles.text}>Password:</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.loginButtonContainer}>
                <Pressable style={styles.userLogin} textStyle={styles.text}>
                    <Text style={styles.text}>Login as{'\n'}User</Text>
                </Pressable>
                <Text style={styles.blank}></Text>
                <Pressable style={styles.managerLogin} textStyle={styles.text}>
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
