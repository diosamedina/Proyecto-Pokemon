const axios = require("axios");

const { Pokemon } = require("../db");

const infoCleaner = (poke) => { 
    return {
        id: poke.id,
        nombre: poke.name,
        imagen: poke.sprites.front_default,
        vida: poke.stats.find(stat => stat.stat.name === "hp").base_stat,
        ataque: poke.stats.find(stat => stat.stat.name === "attack").base_stat,
        defensa: poke.stats.find(stat => stat.stat.name === "defense").base_stat,
        velocidad: poke.stats.find(stat => stat.stat.name === "speed").base_stat,
        altura: poke.height,
        peso: poke.weight,
        creado: false  // Para saber si viene de la Api o de la base de datos
    };
};

const getAllPokemons = async () => {
    const pokemonsApi = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data;
    console.log(pokemonsApi);

    const pokemonsDB = await Pokemon.findAll();
    
    return { "Base de datos": pokemonsDB, "PokeApi": pokemonsApi }
}

const getPokemonById = async (id, source) => {
    const pokemon = source === "api"
        ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
        : await Pokemon.findByPk(id);
    
    if (source === "api") {
        return infoCleaner(pokemon) 
    } else {
        return pokemon
    }
}

const getPokemonByName = async (name) => {
    const infoApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
    const pokemonApi = infoCleaner(infoApi);
    console.log(pokemonApi);
    
    const pokemonDb = await Pokemon.findAll({where: {nombre: name}});
    
    return { "Base de datos": pokemonDb, "PokeApi": pokemonApi }
};

const createPokemonDB = async (nombre, imagen, vida, ataque, defensa, velocidad, altura, peso) => {
    return await Pokemon.create({nombre, imagen, vida, ataque, defensa, velocidad, altura, peso});
};

module.exports = { getAllPokemons, getPokemonById, getPokemonByName, createPokemonDB }