export const getElements = () => {
  const cardContainer = document.querySelector('.card-container');
  const controlBar = document.querySelector('.control-bar');
  const cardDetail = document.querySelector('.detail-wrapper');

  return { cardContainer, controlBar, cardDetail };
};