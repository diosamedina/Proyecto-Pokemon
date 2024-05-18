const { getAllPokemons, getPokemonById, getPokemonByName, createPokemonDB } = require("../controllers/pokemonsControllers");

const getPokemonsHandler = async (req, res) => {
    const { nombre } = req.query;
    console.log('handler', nombre);
    try {
        if (nombre) {
            const pokemonByName = await getPokemonByName(nombre.toLowerCase());
            res.status(200).json(pokemonByName);
        } else {
            const response = await getAllPokemons()
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    console.log(source);
    try {
        const response = await getPokemonById(id, source);
        res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({ error: error.message })
    } 
};

const createPokemonsHandler = async (req, res) => {
    const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, typeId1, typeId2 } = req.body;
    console.log(nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, typeId1, typeId2)
    try {
        const newPokemon = await createPokemonDB(nombre.toLowerCase(), imagen, vida, ataque, defensa, velocidad, altura, peso, typeId1, typeId2);
        res.status(200).json(newPokemon);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    getPokemonsHandler,
    getDetailHandler,
    createPokemonsHandler
}