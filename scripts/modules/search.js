import { allPokemons, getPokemons, renderPokemons } from "./pokemon.js";
import { getElements } from '../utils/getElement.js';
import { el } from '../utils/createElement.js';

const { cardContainer } = getElements();

/** 검색 기능 */
export const searchPokemon = () => {
  const searchInput = document.querySelector('input[name="pokemon"]');

  searchInput.addEventListener('input', (e) => {
    const searchText = searchInput.value;
    
    cardContainer.innerHTML = '';
    const filteredPokemon  = allPokemons.filter(item => item.name.includes(searchText));
    
    if (filteredPokemon.length === 0) {
      const noResult = el('span', {textContent: '검색 결과가 없습니다.', style: 'text-align: center'});
      cardContainer.append(noResult);
    } else {
      filteredPokemon.map(pokemon => renderPokemons(pokemon));
    }
  })
};