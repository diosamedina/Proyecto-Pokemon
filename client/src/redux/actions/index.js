import axios from "axios";
import { GET_POKEMONS, FILTER, ORDER, CREATE_POKEMON } from "./action-types";

export function getPokemons() {
    return async function(dispatch) {
        const response = await axios("http://localhost:3001/pokemons");
        return dispatch({
            type: GET_POKEMONS,
            payload: response.data.pokeAPI.concat(response.data.pokeBD),
        });
    };
}

export function filterCards(origen) {
    return {
        type: FILTER,
        payload: origen,
    }
}

export function orderCards(order) {
    return {
        type: ORDER,
        payload: order,
    }
}

export function createPokemon(pokemon) {
    console.log('pokemon: ', pokemon);
    return async function(dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/pokemons', pokemon, {
                headers: {
                    'Content-Type': 'application/json'
                }  // Este último argumento asegura que Axios está configurado correctamente, especialmente si alguna configuración global de Axios o un middleware del backend podría estar interfiriendo
            });
            console.log(response.data);
            return dispatch({
                type: CREATE_POKEMON,
                payload: response.data,
            });
        } catch (error) {
            console.error('Error creating pokemon:', error.response);
            alert(error.message);
        } 
    };
}