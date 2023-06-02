import { useEffect, useRef, useState } from 'react';

import PokemonAPI from '../api/PokemonAPI';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

const usePokemons = () => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ simplePokemonList, setSimplePokemonList ] = useState<SimplePokemon[]>([]);

    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemons = async () => {
        setIsLoading(true);

        const response = await PokemonAPI.get<PokemonPaginatedResponse>( nextPageUrl.current );
        nextPageUrl.current = response.data.next;

        mapPokemonList( response.data.results );
    };

    const mapPokemonList = ( pokemonList: Result[] ) => { 

        const newPokemonList: SimplePokemon[] = pokemonList.map( ({ name, url }) => {
            
            const urlParts = url.split('/');
            const id = urlParts[ urlParts.length - 2 ];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return {
                id, name, picture
            }

        } );

        setSimplePokemonList( [ ...simplePokemonList, ...newPokemonList ] );
        setIsLoading(false);
    };

    useEffect(() => {
        loadPokemons(); 
    }, []);


    return {
        isLoading,
        simplePokemonList, 
        loadPokemons
    }
};

export default usePokemons;