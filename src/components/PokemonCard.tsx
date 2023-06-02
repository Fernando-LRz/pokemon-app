import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/native';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useEffect } from 'react';

const windowWIdth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
};

const PokemonCard = ( { pokemon }: Props ) => {

    const navigation = useNavigation<any>();

    const [ bgColor, setBgColor ] = useState('grey');
    const isMounted = useRef(true);

    useEffect(() => {
        ImageColors.getColors( pokemon.picture, { fallback: 'grey' } )
            .then( colors => {
                // ( colors.platform === 'android' ) 
                //     ? setBgColor( colors.dominant || 'grey' )
                //     : setBgColor( colors.background || 'grey');

                if( !isMounted ) return;

                if( colors.platform === 'android' ) {
                    setBgColor( colors.dominant || 'grey' );
                }
            });
    
        return () => {
            isMounted.current = false;
        }

    }, []);

    return (
        <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ 
                () => navigation.navigate('PokemonScreen', { 
                    simplePokemon: pokemon,
                    color: bgColor
                }) 
            }
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWIdth * 0.4,
                backgroundColor: bgColor
            }}>
                {/* Pokemon ID and name */}
                <View>
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>

                <View style={ styles.pokeballContainer }>
                    {/* Pokeball */}
                    <Image
                        source={ require('../assets/white-pokeball.png') }
                        style={ styles.pokeball }
                    /> 
                </View>

                <FadeInImage 
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 150,
        marginBottom: 25,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        top: 20, 
        left: 10
    },
    pokeballContainer: {
        height: 100,
        width: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.5,
        overflow: 'hidden'
    },
    pokeball: {
        height: 100,
        width: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage: {
        height: 120,
        width: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
});

export default PokemonCard;