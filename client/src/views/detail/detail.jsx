import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar'

// import './detail.css';

function Detail(props) {
  const { id } = useParams();
  const [ pokemon, setPokemon ] = useState({});
  
  useEffect(() => {
    axios(`http://localhost:3001/pokemons/${id}`).then(
      ({ data }) => {
        if (data.nombre) {
          setPokemon(data);
        } else {
          window.alert('¡No hay pokemones con este ID!');
        }
      }
    )
    return setPokemon({});
  }, [id]);

  return (
    <div>
      <Navbar />
      <h1>Detail</h1>
      <h2>{pokemon.nombre}</h2>
      <img src={pokemon.imagen} alt={pokemon.nombre} />
      <h3>Vida: {pokemon.vida}</h3>
      <h3>Ataque: {pokemon.ataque}</h3>
      <h3>Defensa: {pokemon.defensa}</h3>
      <h3>Velocidad: {pokemon.velocidad}</h3>
      <h3>Altura: {pokemon.altura}</h3>
      <h3>Peso: {pokemon.peso}</h3>
      <h3>Tipos: {pokemon.tipos}</h3>
    </div>
  );
}

export default Detail;