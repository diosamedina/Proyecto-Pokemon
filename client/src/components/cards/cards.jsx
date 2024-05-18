import React, { useState } from 'react';
import Card from "../card/card";
import "./cards.css";

function Cards({ allPokemons, onBack }) {
    let pokemons = allPokemons;
    let regresar = !Array.isArray(pokemons);

    if (regresar) {
        pokemons = [pokemons];  // Para que siempre trabaje con un array
    }

    const [ currentPage, setCurrentPage ] = useState(1);
    const pokemonsPerPage = 12;

    // Calcular el índice del primer y último pokemon en la página actual
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    
    const paginate = pageNumber => setCurrentPage(pageNumber);  // Función para cambiar de página

    return (
        <div>
            {regresar && (
                <button onClick={onBack} className="back-button">Regresar</button>
            )}
            <div className="card-list">
                {currentPokemons.map((pokemon, index) => (
                    <Card 
                        key={pokemon.id}
                        id={pokemon.id}
                        nombre={pokemon.nombre}
                        imagen={pokemon.imagen}
                        tipos={pokemon.tipos} 
                    />
                ))}
                {/* Controles de paginación */}
                <div>
                    {Array.from({ length: Math.ceil(allPokemons.length / pokemonsPerPage) }, (_, i) => (
                        <button key={i + 1} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Cards;
