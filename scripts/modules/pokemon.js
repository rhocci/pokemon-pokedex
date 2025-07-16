import { el } from '../utils/createElement.js';
import { getElements } from '../utils/getElement.js';
import { searchPokemon } from './search.js';

const { cardContainer, cardDetail } = getElements();

export let allPokemons = [];
let currentPokemons = [];
let currentPage = 0;

const DATA_NUM_LIMIT = 20;

/** 포켓몬 데이터 받아오기(전체) */
export const getAllPokemons = async function () {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000');
    const data = await res.json();
    const pokemonList = data.results;
    const detailPromises = pokemonList.map(item => fetch(item.url).then(res => res.json()));

    allPokemons = await Promise.all(detailPromises);

    searchPokemon();
  }
  catch(error) {
    console.error(error);
  }
};

/** 포켓몬 데이터 받아오기(페이지) */
export const getPokemons = async function() {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentPage * 20}&limit=${DATA_NUM_LIMIT}`);
    const data = await res.json();
    const pokemonList = data.results;
    const detailPromises = pokemonList.map(item => fetch(item.url).then(res => res.json()));

    currentPokemons = await Promise.all(detailPromises);
    cardContainer.innerHTML = '';
    currentPokemons.map(pokemon => renderPokemons(pokemon));
  }
  catch(error) {
    console.log(error);
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
  card.setAttribute('data-pokemon-id', pokemon.id);

  cardContainer.append(card);
};

/** 버튼 이벤트리스너 */
export const buttonEvent = () => {
  const pageBtns = document.querySelector('.page-btns');
  const currentPageNum = document.querySelector('.current-page');

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

  // 페이지네이션
  pageBtns.addEventListener('click', (e) => {
    const pageBtn = e.target.closest('.page-btn');

    if (!pageBtn) {
      return;
    } else if (pageBtn.classList.contains('page-btn--prev')) {
      currentPage = currentPage > 0 ? currentPage - 1 : 49;
    } else if (pageBtn.classList.contains('page-btn--next')) {
      currentPage = currentPage > 48 ? 0 : currentPage + 1;
    }
    
    currentPageNum.textContent = `${currentPage + 1}페이지`;
    getPokemons(currentPage);
  });
};
