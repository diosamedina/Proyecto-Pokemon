import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import Cards from "../../components/cards/cards";
import { getPokemons, filterCards, orderCards } from '../../redux/actions';
import './home.css';

function Home() {
  const dispatch = useDispatch()
  const allPokemons = useSelector((state) => state.allPokemons);  // Hook que permite a los componentes funcionales extraer y acceder la data desde el store de Redux  
  const [ searchName, setSearchName ] = useState("");  // Hook que permite manejar el estado en los componentes funcionales
  const [ selectedPokemon, setSelectedPokemon] = useState(null);  // Pokemon seleccionado

  const handleBack = () => {
    setSelectedPokemon(null);  // Para volver a la lista completa
  }

  function handleChange(event) {
    event.preventDefault();
    setSearchName(event.target.value);
  }

  function getPokemonByName(nombre) {
    axios(`http://localhost:3001/pokemons?nombre=${nombre}`).then(
      ({ data }) => {
        if (data.pokeAPI.nombre) {
          setSelectedPokemon(data.pokeAPI);
        } else {
          window.alert('¡No hay pokemones con ese nombre!');
        }
      }
    )
  }

  function handleSubmit(event) {
    event.preventDefault();  
    getPokemonByName(searchName);
    setSearchName("")
  }

  function handleFilter(event) {
    dispatch(filterCards(event.target.value))
  }

  function handleOrder(event) {
    dispatch(orderCards(event.target.value))
  }

  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch]);

  return (
    <div className="home">
      <h2 className="home-title">Home</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <div>
        <select name='filter' onChange={handleFilter}>
          <option value="All">All</option>
          <option value="API">Origen API</option>
          <option value="BD">Origen BD</option>
        </select>
        <select name='order' onChange={handleOrder}>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
          <option value="C">Ataque</option>
        </select>
      </div>
      { selectedPokemon ? (
        <Cards allPokemons={selectedPokemon} onBack={handleBack} />
      ) : (
        <Cards allPokemons={allPokemons} onBack={handleBack} />
      )}
    </div>
  );
}

export default Home;