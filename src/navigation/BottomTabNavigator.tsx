import React from 'react';
import { Platform } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeStackNavigator from './HomeStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#5856D6',
                tabBarLabelStyle: {
                    marginBottom: ( Platform.OS === 'ios' ) ? 0 : 10
                },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    height: ( Platform.OS === 'ios' ) ? 80 : 60,
                    borderWidth: 0,
                    elevation: 0, 
                }
            }}
        >
            <Tab.Screen 
                name="StackNavigator" 
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => 
                        <Icon 
                            name="list-outline" 
                            color={ color } 
                            size={ 25 }
                        />
                }}
                component={ HomeStackNavigator } 
            />
            <Tab.Screen 
                name="SearchScreen" 
                options={{
                    tabBarLabel: "Search",
                    tabBarIcon: ({ color }) => 
                        <Icon 
                            name="search-outline" 
                            color={ color } 
                            size={ 25 }
                        />
                }}
                component={ SearchStackNavigator } 
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;