import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import UserHome from './src/screens/UserHome';
import ManagerHome from "./src/screens/ManagerHome";
import RegisterUser from "./src/screens/RegisterUser";
import ManageEquipment from "./src/screens/ManageEquipment";
import EditEquipment from "./src/screens/EditEquipment";
import WOTD from "./src/screens/WOTD";
import ConfirmWorkout from "./src/screens/ConfirmWorkout";

const navigationStack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <navigationStack.Navigator initialRouteName="Login">
                <navigationStack.Screen name="Login" component={Login}/>
                <navigationStack.Screen name="UserHome" component={UserHome}/>
                <navigationStack.Screen name="ManagerHome" component={ManagerHome}/>
                <navigationStack.Screen name="RegisterUser" component={RegisterUser}/>
                <navigationStack.Screen name="ManageEquipment" component={ManageEquipment}/>
                <navigationStack.Screen name="EditEquipment" component={EditEquipment}/>
                <navigationStack.Screen name="WOTD" component={WOTD}/>
                <navigationStack.Screen name="ConfirmWorkout" component={ConfirmWorkout}/>
            </navigationStack.Navigator>
        </NavigationContainer>
    );
}

export default App;