import React from 'react';
import { Text, Image, FlatList, ActivityIndicator, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import usePokemons from '../hooks/usePokemons';
import PokemonCard from '../components/PokemonCard';
import styles from '../theme/appTheme';

const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemons();

    return (
        <>
            <Image 
                source={ require('../assets/pokeball.png') }
                style={ styles.pokeballBG }
            />

            <View style={{ alignItems: 'center' }}>
                <FlatList 
                    data={ simplePokemonList }
                    keyExtractor={ ( pokemon, index ) => pokemon.id + index }
                    showsVerticalScrollIndicator={ false }
                    numColumns={ 2 }
                    renderItem={ ({ item }) => <PokemonCard pokemon={ item }/> }

                    // Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 10
                        }}>
                            Pokedex
                        </Text>
                    )}

                    //  Infinite scroll
                    onEndReached={ loadPokemons }
                    onEndReachedThreshold={ 0.4 }

                    ListFooterComponent={( 
                        <ActivityIndicator 
                            style={{ height: 100 }}
                            size={ 20 }
                            color="grey"
                        /> 
                    )}
                />
            </View>
        </>
    );
};

export default HomeScreen;