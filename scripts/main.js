import { buttonEvent, getAllPokemons, getPokemons } from './modules/pokemon.js';

(() => {
  getAllPokemons();
  getPokemons();
  buttonEvent();
})();