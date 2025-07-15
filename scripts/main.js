import { buttonEvent, getPokemons } from './modules/pokemon.js';
import { searchPokemon } from './modules/search.js';

(() => {
  getPokemons();
  buttonEvent();
  searchPokemon();
})();