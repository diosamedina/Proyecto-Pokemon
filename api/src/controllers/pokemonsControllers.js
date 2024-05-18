const axios = require("axios");
const { Pokemon, Type } = require("../db");

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
        tipos: poke.types.map(typeInfo => typeInfo.type.name),
        origen: "API"
    };
};

const getAllPokemons = async () => {
    const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');

    const pokesApi = data.results.map( poke => {
      return poke
    });
    
    const pokemonsApi = await Promise.all(pokesApi.map( async pokeapi => {
        const {data} = await axios.get(pokeapi.url)
        return infoCleaner(data)
    }));

    const pokesDB = await Pokemon.findAll({
        include: Type  // Incluye los tipos asociados   
    });
    console.log('pokesDB: ', pokesDB);

    const pokemonsDB = pokesDB.map(poke => {
        const tipos = (poke.types).map(type => type.nombre);   // Obtiene solo los nombres de los tipos asociados
        return {
            id: poke.id,
            nombre: poke.nombre,
            imagen: poke.imagen,
            vida: poke.vida,
            ataque: poke.ataque,
            defensa: poke.defensa,
            velocidad: poke.velocidad,
            altura: poke.altura,
            peso: poke.peso,
            tipos: tipos,
            origen: poke.origen
        };  // Crea un nuevo objeto con las propiedades del Pokémon y los tipos asociados
    })  // Mapea los resultados para agregar los tipos asociados a cada Pokémon

    return { "pokeBD": pokemonsDB, "pokeAPI": pokemonsApi }
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

const getPokemonByName = async (nombre) => {
    const infoApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`)).data;
    const pokemonApi = infoCleaner(infoApi);
    console.log('controller', nombre);
    const pokemonDb = await Pokemon.findAll({where: {nombre: nombre}});
    
    return { "pokeBD": pokemonDb, "pokeAPI": pokemonApi }
};

const createPokemonDB = async (nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, typeId1, typeId2) => {
    const post = await Pokemon.create({nombre, imagen, vida, ataque, defensa, velocidad, altura, peso});
    
    if (typeId1) {
        const type1 = await Type.findByPk(typeId1);
        const pokemon1 = await Pokemon.findByPk(post.id);
        await type1.addPokemon(pokemon1);
    }
    
    if (typeId2) {
        const type2 = await Type.findByPk(typeId2);
        const pokemon2 = await Pokemon.findByPk(post.id);
        await type2.addPokemon(pokemon2);
    }
    
    console.log('Pokemon creado y tipos asociados con éxito');
    return post
};

module.exports = { getAllPokemons, getPokemonById, getPokemonByName, createPokemonDB }