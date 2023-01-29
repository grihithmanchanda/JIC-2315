import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import UserHome from './src/screens/UserHome';
import ManagerHome from "./src/screens/ManagerHome";
import RegisterUser from "./src/screens/RegisterUser";

const navigationStack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <navigationStack.Navigator initialRouteName="Login">
                <navigationStack.Screen name="Login" component={Login}/>
                <navigationStack.Screen name="UserHome" component={UserHome}/>
                <navigationStack.Screen name="ManagerHome" component={ManagerHome}/>
                <navigationStack.Screen name="RegisterUser" component={RegisterUser}/>
            </navigationStack.Navigator>
        </NavigationContainer>
    );
}

export default App;