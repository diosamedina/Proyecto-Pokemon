const axios = require("axios");
const { Type } = require("../db");

const checkIfEmpty = async () => {
    const count = await Type.count();
    const empty = count === 0 ? true : false;
    return empty
};  // Verifica si la tabla está vacía

const populateTypes = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/type");  // Obtiene los tipos de pokemones de la pokeApi

    const pokemonTypes = response.data.results.map(pokemonType => ({nombre: pokemonType.name}));  // Extrae la información

    await Type.bulkCreate(pokemonTypes);  // Inserta en la tabla todos los tipos de pokemones en una sola operación
    console.log('Tipos de Pokemones guardados exitosamente');
};  // Puebla la tabla con los tipos de pokemones de la pokeApi para su posterior consumo

module.exports = { checkIfEmpty, populateTypes }