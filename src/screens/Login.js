import React from "react";
import { Button, Text, View } from 'react-native';

function Login({ navigation })  {
    return (
        <View>
            <Button
                title="User Home"
                onPress={() => navigation.navigate('UserHome')}
            />
        </View>
    );
}

export default Login;
