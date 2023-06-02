import { useEffect, useState } from 'react';

import PokemonAPI from '../api/PokemonAPI';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

const usePokemonSearch = () => {

    const [ isFetching, setIsFetching ] = useState(true);
    const [ simplePokemonList, setSimplePokemonList ] = useState<SimplePokemon[]>([]);

    const loadPokemons = async () => {
        const response = await PokemonAPI.get<PokemonPaginatedResponse>( 'https://pokeapi.co/api/v2/pokemon?limit=1300' );

        mapPokemonList( response.data.results );
    };

    const mapPokemonList = ( pokemonList: Result[] ) => { 

        const newPokemonList: SimplePokemon[] = pokemonList.map( ({ name, url }) => {
            
            const urlParts = url.split('/');
            const id = urlParts[ urlParts.length - 2 ];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return {
                id, name, picture
            };

        } );

        setSimplePokemonList(newPokemonList);
        setIsFetching(false);
    };

    useEffect(() => {
        loadPokemons(); 
    }, []);


    return {
        isFetching,
        simplePokemonList
    };
};

export default usePokemonSearch;