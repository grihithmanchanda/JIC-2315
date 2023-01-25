import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import UserHome from './src/screens/UserHome';

const navigationStack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <navigationStack.Navigator initialRouteName="Login">
        <navigationStack.Screen name="Login" component={Login} />
        <navigationStack.Screen name="UserHome" component={UserHome} />
      </navigationStack.Navigator>
    </NavigationContainer>
  );
}

export default App;