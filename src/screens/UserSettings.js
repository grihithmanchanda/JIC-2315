import React, {useState, useEffect} from "react";
import {Pressable, ScrollView, Text, View, TextInput, Switch} from 'react-native';
import {Button} from "react-native-elements";
import {getAuth, signOut} from "firebase/auth";
import styles from "../styles/styles";
import login_service from "../services/login_service";

// Essentially entire manager home page, including welcome,
//   user num, equipment, and buttons for settings
function UserSettings({navigation}) {
    const [streak, setStreak] = useState(false); // todo: use user's setting as initial state
    const toggleStreak = () => setStreak(previousState => !previousState);
    const [notifs, setNotifs] = useState(false); // todo: use user's setting as initial state
    const toggleNotifs = () => setNotifs(previousState => !previousState);

    const handleSettings = async () => {
        await login_service.addUserSettings(streak, notifs);
        navigation.navigate('UserHome')
    }

    const getSettings = async () => {
        let settings = await login_service.getUserSettings()
        if (settings !== null) {
            setNotifs(settings['notifications'])
            setStreak(settings['streaks'])
        }
    }

    // get user's settings upon startup
    useEffect(() => {
        getSettings()
    }, []);

    return (
        <ScrollView style={styles.outer}>
            <Button //Logout button. TODO: format button style
                title="Logout"
                onPress={() => //call method to log out user
                    logout({navigation})
                }
            />
            <View style={styles.container}>
                <Text style={styles.header}>User Settings</Text>
                <Text style={styles.subheader}>Toggle Community Streak</Text>
                <Text style={styles.lightText}>View your gym's average workout streak?</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#c2ccff'}}
                    thumbColor={streak ? '#293571' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleStreak}
                    value={streak}
                    style={styles.switch}
                />
                <Text style={styles.subheader}>Allow Notifications</Text>
                <Text style={styles.lightText}>Reminders, motivational prompts, & more!</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#c2ccff'}}
                    thumbColor={notifs ? '#293571' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotifs}
                    value={notifs}
                    style={styles.switch}
                />
                <Pressable style={styles.deleteButton} textStyle={styles.deleteText}>
                    <Text style={styles.text}>Delete Account</Text>
                </Pressable>
                <Pressable style={styles.button} textStyle={styles.text} onPress={handleSettings}>
                    <Text style={styles.text}>Confirm Changes</Text>
                </Pressable>
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

export default UserSettings;
