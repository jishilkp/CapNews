import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewsList from '../components/NewsList';
import NewsDetails from '../components/NewsDetails';

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="NewsList" component={NewsList} options={{ headerShown: false }} />
                <Stack.Screen name="NewsDetails" component={NewsDetails} options={{ title: 'Details' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default StackNavigator;