import { GET_POKEMONS, FILTER, ORDER, CREATE_POKEMON } from "../actions/action-types"

let initialState = { 
    allPokemons: [], 
    allPokemonsCopy: [], 
    errors: {} };

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                allPokemonsCopy: action.payload
            }
        case FILTER:
            if (action.payload === "All") return {
                ...state, 
                allPokemons: state.allPokemonsCopy
            }
            const filteredPokemons = state.allPokemons.filter(
                pokemon => pokemon.origen === action.payload
            )
            return {
                ...state,
                allPokemons: filteredPokemons
            }
        case ORDER:
            const orderCopy = [ ...state.allPokemons ];
            
            if (action.payload === "A")
                orderCopy.sort((a,b) => a.id - b.id);
            if (action.payload === "D")
            orderCopy.sort((a,b) => b.id - a.id);
            if (action.payload === "C")
                orderCopy.sort((a,b) => a.ataque - b.ataque);
            
            return {
                ...state,
                allPokemons: orderCopy
            }
        case CREATE_POKEMON:
            return {
                ...state,
                allPokemons: action.payload,
                allPokemonsCopy: action.payload
            }            
        default:
            return state;
    }
}

export default rootReducer;