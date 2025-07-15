import { el } from '../utils/createElement.js';
import { getElements } from '../utils/getElement.js';
import { searchPokemon } from './search.js';

const { cardContainer, cardDetail } = getElements();
export let allPokemons = [];

/** 포켓몬 데이터 받아오기 */
export const getPokemons = async function() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100');
    const data = await res.json();
    const pokemonList = data.results;
    const detailPromises = pokemonList.map(item => fetch(item.url).then(res => res.json()));

    allPokemons = await Promise.all(detailPromises);
    allPokemons.map(pokemon => renderPokemons(pokemon));
    
    searchPokemon();
  } catch(error) {
    console.log(error);
    return;
  }
};

/** 데이터 카드 바인딩 */
export const renderPokemons = (pokemon) => {
  // 카드 header
  const spanNo = el('span', {textContent: `No.${pokemon.id}`});
  const cardTitle = el('h2', {className: 'card__title', textContent: pokemon.species.name});
  const cardHeader = el('header', {className: 'card__header'}, spanNo, cardTitle);

  // 카드 body
  const img = el('img', {src: pokemon.sprites.front_default, alt: ''});
  const imgWrapper = el('div', {className: 'card__img'}, img);
  const btn = el('button', {className: 'card__desc', type: 'button', textContent: '상세정보'})
  const cardBody = el('div', {className: 'card__body'}, imgWrapper, btn);

  // 카드 footer
  const typeLi = pokemon.types.map((item, index) => el('li', {textContent: item.type.name, className: `type-${item.type.name}`}));
  const typeUl = el('span', {className: 'card__type'}, ...typeLi);
  const cardFooter = el('footer', {className: 'card__footer'}, typeUl);

  // 카드 합체
  const card = el('div', {className: 'card'}, cardHeader, cardBody, cardFooter);

  cardContainer.append(card);
};

/** 버튼 이벤트리스너 */
export const buttonEvent = () => {

  // 상세정보 이벤트
  cardContainer.addEventListener('click', (e) => {
    const cardBtn = e.target.closest('.card__desc');
    if (!cardBtn) return;

    cardDetail.classList.add('show');
  })

  // 모달 닫기
  document.addEventListener('click', (e) => {
    const detailWrapper = document.querySelector('.detail-wrapper');
    if (e.target !== detailWrapper) return;

    detailWrapper.classList.remove('show');
  })
};