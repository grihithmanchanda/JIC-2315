import React, {useRef} from "react";
import {ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";
import Stopwatch from "../components/Stopwatch";
function Workout({navigation}) {
    return (
        <ScrollView style={styles.outer}>
            <Button //Logout button. TODO: format button style
                title="Logout"
                onPress={() => //call method to log out user
                    logout({navigation})
                }
            />
            <View style={styles.container}>
                <Stopwatch/>
            </View>
        </ScrollView>
    );
}

//Method to sign out of firebase, returns user to login screen
function logout({navigation}) {
    const auth = getAuth();
    // Signs out user
    signOut(auth).then(() => {
        navigation.navigate('Login');
    });
}

export default Workout;
