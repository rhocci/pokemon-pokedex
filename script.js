(() => {

  // 포켓몬 데이터 받아오기
  const getPokemons = async function() {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100');
      const data = await res.json();
      // pokemonList : name, url 담은 객체 배열
      const pokemonList = data.results;
      const detailPromises = pokemonList.map(item => fetch(item.url).then(res => res.json()));

      // Promise.all: 배열로 된 프라미스객체 모음을 병렬적으로 처리 
      Promise.all(detailPromises).then(data => data.map(pokemon => renderPokemons(pokemon)));
    } catch(error) {
      console.log(error);
      return;
    }
  };

  // 데이터 카드에 바인딩하기
  const renderPokemons = async function(pokemon) {
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

    // 카드 append
    const cardContainer = document.querySelector('.container');

    cardContainer.append(card);
  };

  // create, 프로퍼티 설정, 자식 append까지 해주는 함수
  function el(tag, props = {}, ...children) {
    const element = document.createElement(tag);
    Object.assign(element, props);

    children.forEach(child => element.append(child));

    return element;
  }

  getPokemons();

  // 버튼 핸들러
  const buttonEvent = () => {
    const cardContainer = document.querySelector('.container');
    const cardDetail = document.querySelector('.detail-wrapper');

    cardContainer.addEventListener('click', (e) => {
      const cardBtn = e.target.closest('.card__desc');
      if (!cardBtn) return;

      cardDetail.classList.add('show');
    })

    document.addEventListener('click', (e) => {
      const detailWrapper = document.querySelector('.detail-wrapper');
      if (e.target !== detailWrapper) return;

      detailWrapper.classList.remove('show');
    })
  };

  buttonEvent();

})();