import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { FullPokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: FullPokemon;
}

const PokemonDetails = ( { pokemon }: Props ) => {
    return (
        <ScrollView
            style={{ 
                ...StyleSheet.absoluteFillObject
            }}
            showsVerticalScrollIndicator={ false }
        >
            {/* Types and weight */}
            <View style={{
                ...styles.container,
                marginTop: 370
            }}>
                <Text style={ styles.title }>Types</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map(({ type }) => (
                            <Text 
                                style={{ 
                                    ...styles.regularText,
                                    marginRight: 10
                                }}
                                key={ type.name }
                            >
                                { type.name }
                            </Text>
                        ))
                    }
                </View>

                <Text style={ styles.title }>Weight</Text>
                <Text style={ styles.regularText }>{ (pokemon.weight) / 10 } kg</Text>
            </View>

            {/* Sprites */}
            <View style={ styles.container }>
                <Text style={ styles.title }>Sprites</Text>
            </View>

            <ScrollView
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
            >
                <FadeInImage 
                    uri={ pokemon.sprites.front_default }
                    style={ styles.basicSprite }
                />
                <FadeInImage 
                    uri={ pokemon.sprites.back_default }
                    style={ styles.basicSprite }
                />
                <FadeInImage 
                    uri={ pokemon.sprites.front_shiny }
                    style={ styles.basicSprite }
                />
                <FadeInImage 
                    uri={ pokemon.sprites.back_shiny }
                    style={ styles.basicSprite }
                />
            </ScrollView>

            {/* Abilities */}
            <View style={ styles.container }>
                <Text style={ styles.title }>Abilities</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.abilities.map(({ ability }) => (
                            <Text 
                                style={{ 
                                    ...styles.regularText,
                                    marginRight: 10
                                }}
                                key={ ability.name }
                            >
                                { ability.name }
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Moves */}
            <View style={ styles.container }>
                <Text style={ styles.title }>Moves</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        pokemon.moves.map(({ move }) => (
                            <Text 
                                style={{ 
                                    ...styles.regularText,
                                    marginRight: 10
                                }}
                                key={ move.name }
                            >
                                { move.name }
                            </Text>
                        ))
                    }
                </View>
            </View>

            
            {/* Stats y footer*/}
            <View style={ styles.container }>
                <Text style={ styles.title }>Stats</Text>
                <View>
                    {
                        pokemon.stats.map(( stat, index ) => (
                            <View
                                key={ stat.stat.name + index }
                                style={{ flexDirection: 'row' }}
                            >
                                <Text 
                                    style={{ 
                                        ...styles.regularText,
                                        width: 180,
                                        marginRight: 10
                                    }}
                                >
                                    { stat.stat.name }
                                </Text>

                                <Text 
                                    style={{ 
                                        ...styles.regularText,
                                    }}
                                >
                                    { stat.base_stat }
                                </Text>
                            </View>
                        ))
                    }
                </View>

                {/* Footer */}
                <View style={{
                    marginBottom: 55,
                    alignItems: 'center'
                }}>
                    <FadeInImage 
                        uri={ pokemon.sprites.front_default }
                        style={ styles.footerSprite }
                    />
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 20
    },
    regularText: {
        fontSize: 19
    },
    basicSprite: {
        width: 110,
        height: 110
    },
    footerSprite: {
        width: 100,
        height: 100
    }
});

export default PokemonDetails;