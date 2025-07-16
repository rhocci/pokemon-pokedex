import { allPokemons, getPokemons, renderPokemons } from "./pokemon.js";
import { getElements } from '../utils/getElement.js';

const { controlBar, cardContainer } = getElements();

  const filterBtn = document.querySelector('.filter-btn');
  const pageBtns = document.querySelector('.page-btns');
  const filterText = filterBtn.querySelector('div');

/** 검색 기능 */
export const searchPokemon = () => {
  const searchInput = document.querySelector('input[name="pokemon"]');
  const noResult = document.querySelector('.no-result');

  searchInput.addEventListener('input', (e) => {
    const searchText = searchInput.value;
    
    controlBar.classList.add('hide');
    cardContainer.innerHTML = '';

    const searchedPokemon  = allPokemons.filter(item => item.name.includes(searchText));
    
    if (searchedPokemon.length === 0) {
      noResult.classList.add('show');
    } else {
      noResult.classList.remove('show');
      searchedPokemon.forEach(pokemon => renderPokemons(pokemon));
    }

    if (searchText.length === 0) {
      controlBar.classList.remove('hide');
      pageBtns.classList.remove('hide');
      filterText.textContent = '필터';
      getPokemons(0);
    };
  })
};

/** 필터링 기능 */
export const filterPokemon = () => {
  filterBtn.addEventListener('click', (e) => {
    const typeBtn = e.target.closest('.type');
    if (!typeBtn) return;

    filterText.textContent = typeBtn.textContent;
    pageBtns.classList.add('hide');

    let clickedType = typeBtn.classList[1].split('-')[1];

    const filteredPokemon = allPokemons.filter(pokemon => {
      return pokemon.types.some(types => types.type.name == clickedType);
    });

    cardContainer.innerHTML = '';
    filteredPokemon.forEach(pokemon => renderPokemons(pokemon));
  });
};