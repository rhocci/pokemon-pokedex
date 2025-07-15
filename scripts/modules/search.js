import { allPokemons, getPokemons, renderPokemons } from "./pokemon.js";
import { getElements } from '../utils/getElement.js';

const { cardContainer } = getElements();

/** 검색 기능 */
export const searchPokemon = () => {
  const searchInput = document.querySelector('input[name="pokemon"]');

  searchInput.addEventListener('input', (e) => {
    const searchText = searchInput.value;
    
    cardContainer.innerHTML = '';
    allPokemons
      .filter(item => item.name.includes(searchText))
      .map(pokemon => renderPokemons(pokemon));
  })
};