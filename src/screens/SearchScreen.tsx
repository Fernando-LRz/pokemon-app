import React, { useEffect, useState } from 'react';
import { Platform, View, Text, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import usePokemonSearch from '../hooks/usePokemonSearch';
import SearchInput from '../components/SearchInput';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import styles from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();

    const [ pokemonsFiltered, setPokemonsFiltered ] = useState<SimplePokemon[]>([]);

    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
        if( searchTerm.length === 0 ) {
            return setPokemonsFiltered([]);
        }

        if( isNaN( Number(searchTerm) ) ) {
            setPokemonsFiltered(
                simplePokemonList.filter( 
                    pokemon => pokemon.name.toLowerCase().includes( searchTerm.toLowerCase() ) 
                )
            );

        } else {
            const pokemonById = simplePokemonList.find( pokemon => pokemon.id === searchTerm );
            
            setPokemonsFiltered(
                ( pokemonById ) ? [ pokemonById ] : []
            );
        }
        
    }, [ searchTerm ]);

    if(isFetching) {
        return (
            <Loading />
        );
    }
    
    return (
        <View style={{ 
            flex: 1, 
            ...styles.globalMargin
        }}>
            <SearchInput 
                onDebounce={ (value) => setSearchTerm( value ) }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: ( Platform.OS === 'ios' ) ? top : top + 15
                }}
            />

            <FlatList
                data={ pokemonsFiltered }
                keyExtractor={ ( pokemon, index ) => pokemon.id + index }
                showsVerticalScrollIndicator={ false }
                numColumns={ 2 }
                renderItem={ ({ item }) => <PokemonCard pokemon={ item }/> }

                // Header
                ListHeaderComponent={(
                    <Text style={{
                        ...styles.title,
                        ...styles.globalMargin,
                        paddingBottom: 10,
                        marginTop: ( Platform.OS === 'ios' ) ? top + 60 : top + 70
                    }}>
                        { searchTerm }
                    </Text>
                )}
            />
        </View>
    );
};

export default SearchScreen;