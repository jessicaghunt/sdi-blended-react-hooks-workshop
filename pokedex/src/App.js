import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
const API_URL = `https://pokeapi.co/api/v2/`


function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(()=>  {
    async function fetchAllPokemon() {
      let pokemons = [];

    for(let id = 1; id <= 151; id++){
      let pokemon = await getPokemon(id);
      pokemons.push(pokemon);
    }
    setPokemonList(pokemons);
    }
    fetchAllPokemon();
  },[]);

  return (
    <div className="App">
      {pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>#{pokemon.id} {pokemon.name}</p>
            </div>
          ))
        ) : (
          <p>Loading Pokémon...</p>
        )}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {pokemonList.length > 0 ? pokemonList : "Loading..."}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );

}

async function getPokemon(id) {
  let pokemon = await fetch(`${API_URL}/pokemon/${id}/`);
  pokemon = await pokemon.json();

  return pokemon;
}

export default App;
