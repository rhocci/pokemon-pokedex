import { allPokemons, renderPokemons } from "./pokemon.js";
import { getElements } from '../utils/getElement.js';

const { cardContainer } = getElements();

/** 검색 기능 */
export const searchPokemon = () => {
  const searchInput = document.querySelector('input[name="pokemon"]');
  const noResult = document.querySelector('.no-result');

  searchInput.addEventListener('input', (e) => {
    const searchText = searchInput.value;
    
    cardContainer.innerHTML = '';
    const filteredPokemon  = allPokemons.filter(item => item.name.includes(searchText));
    
    if (filteredPokemon.length === 0) {
      noResult.classList.add('show');
    } else {
      noResult.classList.remove('show');
      filteredPokemon.map(pokemon => renderPokemons(pokemon));
    }
  })
};

/** 필터링 기능 */
export const filterPokemon = () => {
  // 검색이랑 비슷하게 구현하면 될듯
};