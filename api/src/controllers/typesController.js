const axios = require("axios");
const { Sequelize } = require("sequelize");
// const { DataTypes } = require("sequelize");
// const { Type } = require("../db");

const checkIfEmpty = async () => {
    await Sequelize.sync();
    const count = await Type.count();
    console.log('hola1');
    const empty = count === 0 ? true : false;
    return empty
};

const populateTypes = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    // const pokemonTypes = response.data.results.map(pokemonType => ({name: pokemonType.name}));
    // return await types.bulkCreate(pokemonTypes);
};

module.exports = { checkIfEmpty, populateTypes }