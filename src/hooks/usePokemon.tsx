import { useState, useEffect } from 'react';
import { FullPokemon } from '../interfaces/pokemonInterfaces';
import PokemonAPI from '../api/PokemonAPI';


const usePokemon = ( id: string ) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ pokemon, setPokemon ] = useState<FullPokemon>({} as FullPokemon);

    const loadPokemon = async() => {
        const resp = await PokemonAPI.get<FullPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(resp.data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadPokemon();
    }, []);

    return {
        isLoading,
        pokemon
    };
};

export default usePokemon;