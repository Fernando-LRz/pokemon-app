import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/HomeStackNavigator';

import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';
import usePokemon from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

const PokemonScreen = ( { route, navigation }: Props ) => {

    const { top } = useSafeAreaInsets();

    const { simplePokemon, color } = route.params;
    const { id, name, picture } = simplePokemon;

    const { isLoading, pokemon: fullPokemon } = usePokemon( id );

    return (
        <View style={{ flex: 1 }}>
            {/* Header container */}
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color
            }}>
                {/* Back buttton */}
                <TouchableOpacity
                    style={{ 
                        ...styles.backButton,
                        top: top + 10
                    }}
                    activeOpacity={ 0.8 }
                    onPress={ () => navigation.pop() }
                >
                    <Icon name="arrow-back-outline" color="white" size={ 35 }/>
                </TouchableOpacity>

                {/* Pokemon name */}
                <Text style={{
                    ...styles.pokemonName,
                    top: top + 45
                }}>
                    { name + '\n' }#{ id }
                </Text>

                {/* White pokeball */}
                <Image 
                    source={ require('../assets/white-pokeball.png') }
                    style={ styles.pokeball }
                />

                {/* Pokemon image */}
                <FadeInImage 
                    uri={ picture }
                    style={ styles.pokemonImage }
                />
            </View>

            {/* Pokemon information */}
            {
                isLoading 
                ? (
                    <View style={ styles.activityIndicator }>
                        <ActivityIndicator 
                            color={ color }
                            size={ 50 }
                        />
                    </View>
                )
                : <PokemonDetails pokemon={ fullPokemon }/>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7
    },
    pokemonImage: {
        position: 'absolute',
        width: 250,
        height: 250,
        bottom: -15
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default PokemonScreen;