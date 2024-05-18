import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPokemon } from '../../redux/actions';
import './form.css';

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const [ input, setInput ] = useState({
    nombre: "",
    imagen: "",
    vida: undefined,
    ataque: undefined,
    defensa: undefined,
    velocidad: undefined,
    altura: undefined,
    peso: undefined,
    typeId1: undefined,
    typeId2: undefined
  });

  const [ errors, setErrors ] = useState({
    nombre: "",
    imagen: "",
    vida: undefined,
    ataque: undefined,
    defensa: undefined,
    velocidad: undefined,
    altura: undefined,
    peso: undefined,
    typeId1: undefined,
    typeId2: undefined
  })

  const validate = (input) => {
    const errors = {};
    let regexName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/; // Permite nombres con espacios sin números
    let regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!input.nombre) errors.nombre = "Ingrese el nombre del pokemon";
    else if (!regexName.test(input.nombre)) errors.nombre = "Ingrese nombre válido";

    if (!input.imagen) errors.imagen = "Ingrese la URL de la imagen";
    else if (!regexUrl.test(input.imagen)) errors.imagen = "Ingrese una URL válida";

    if (!input.vida) errors.vida = "Ingrese el número de vidas";
    else if (isNaN(input.vida) || input.vida < 0) errors.vida = "Ingrese un número válido";

    if (!input.ataque) errors.ataque = "Ingrese el número de ataques";
    else if (isNaN(input.ataque) || input.ataque < 0) errors.ataque = "Ingrese un número válido";

    if (!input.defensa) errors.defensa = "Ingrese el número de defensas";
    else if (isNaN(input.defensa) || input.defensa < 0) errors.defensa = "Ingrese un número válido";

    if (isNaN(input.velocidad) || input.velocidad < 0) errors.velocidad = "Ingrese un número válido";

    if (isNaN(input.altura) || input.altura < 0) errors.altura = "Ingrese un número válido";

    if (isNaN(input.peso) || input.peso < 0) errors.peso = "Ingrese un número válido";

    return errors;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
        ...input,
        [name]: value
    });
    setErrors(validate({
        ...input,
        [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('input: ', input);
    dispatch(createPokemon(JSON.stringify(input)));  // Convierte un objeto JavaScript en un objeto JSON
    navigate('/home')
  }

  return (
    <div className="form">
      <form id="pokemonForm" className="pokemon-form" onSubmit={handleSubmit}>
        <h2>Crear un Pokemon</h2>
        <div className="input-group">
          <label>Nombre:</label>
          <input 
            id="nombre" 
            name="nombre" 
            type="text" 
            value={input.value} 
            placeholder='Ingrese el nombre del pokemon...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.nombre}</p>
        </div>

        <div className="input-group">
          <label>Imagen:</label>
          <input 
            id='imagen' 
            name='imagen' 
            type='text' 
            value={input.value} 
            placeholder='Ingrese la URL de la imagen...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.imagen}</p>
        </div>
        
        <div className="input-group">
          <label>Vida:</label>
          <input 
            id='vida' 
            name='vida' 
            type='number' 
            value={input.value} 
            placeholder='Ingrese el número de vidas...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.vida}</p>
        </div>

        <div className="input-group">
          <label>Ataque:</label>
          <input 
            id='ataque' 
            name='ataque' 
            type='number' 
            value={input.value} 
            placeholder='Ingrese el número de ataques...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.ataque}</p>
        </div>

        <div className="input-group">
          <label>Defensa:</label>
          <input 
            id='defensa' 
            name='defensa' 
            type='number' 
            value={input.value} 
            placeholder='Ingrese el número de defensas...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.defensa}</p>
        </div>      

        <div className="input-group">
          <label>Velocidad:</label>
          <input 
            id='velocidad'
            name='velocidad'
            type='number' 
            value={input.value} 
            placeholder='Ingrese la velocidad...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.velocidad}</p>
        </div>

        <div className="input-group">
          <label>Altura:</label>
          <input 
            id='altura' 
            name='altura' 
            type='number' 
            value={input.value} 
            placeholder='Ingrese la altura del pokemon...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.altura}</p>
        </div>

        <div className="input-group">
          <label>Peso:</label>
          <input 
            id='peso' 
            name='peso' 
            type='number' 
            value={input.value}
            placeholder='Ingrese el peso del pokemon...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.peso}</p>
        </div>

        <div className="input-group">
          <label>Tipo 1:</label>
          <select name='typeId1' value={input.typeId1} onChange={handleChange}>
            <option value='' >Ingrese un tipo...</option>
            <option value='1'>normal</option>
            <option value='2'>fighting</option>
            <option value='3'>flying</option>
            <option value='4'>poison</option>
            <option value='5'>ground</option>
            <option value='6'>rock</option>
            <option value='7'>bug</option>
            <option value='8'>ghost</option>
            <option value='9'>steel</option>
            <option value='10'>fire</option>
            <option value='11'>water</option>
            <option value='12'>grass</option>
            <option value='13'>electric</option>
            <option value='14'>psychic</option>
            <option value='15'>ice</option>
            <option value='16'>dragon</option>
            <option value='17'>dark</option>
            <option value='18'>fairy</option>
            <option value='19'>stellar</option>
            <option value='20'>unknown</option>
          </select>
        </div>      
         
        <div className="input-group">
          <label>Tipo 2:</label>
          <select name='typeId2' value={input.typeId2} onChange={handleChange}>
            <option value=''>Ingrese un tipo...</option>
            <option value='1'>normal</option>
            <option value='2'>fighting</option>
            <option value='3'>flying</option>
            <option value='4'>poison</option>
            <option value='5'>ground</option>
            <option value='6'>rock</option>
            <option value='7'>bug</option>
            <option value='8'>ghost</option>
            <option value='9'>steel</option>
            <option value='10'>fire</option>
            <option value='11'>water</option>
            <option value='12'>grass</option>
            <option value='13'>electric</option>
            <option value='14'>psychic</option>
            <option value='15'>ice</option>
            <option value='16'>dragon</option>
            <option value='17'>dark</option>
            <option value='18'>fairy</option>
            <option value='19'>stellar</option>
            <option value='20'>unknown</option>
          </select>
        </div>      
        
        <button type='submit' disabled={Object.keys(errors).length > 0}>Crear Pokemon</button> 
      </form>
    </div>
  );
}

export default Form;