import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

import HomeScreen from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';

export type RootStackParams = {
    HomeScreen: undefined;
    PokemonScreen: { simplePokemon: SimplePokemon, color: string };
};

const HomeStack = createStackNavigator<RootStackParams>();

const HomeStackNavigator = () => { 
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <HomeStack.Screen name="HomeScreen" component={ HomeScreen } />
            <HomeStack.Screen name="PokemonScreen" component={ PokemonScreen } />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;