const { Router } = require('express');
const { getPokemonsHandler, getDetailHandler, createPokemonsHandler } = require('../handlers/pokemonsHandlers');

const pokemonsRouter = Router();

pokemonsRouter.get('/', getPokemonsHandler);
pokemonsRouter.get('/:id', getDetailHandler);
pokemonsRouter.post('/', createPokemonsHandler);

module.exports = pokemonsRouter;