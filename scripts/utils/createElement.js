// create, 프로퍼티 설정, 자식 append까지 해주는 함수
export function el(tag, props = {}, ...children) {
  const element = document.createElement(tag);
  Object.assign(element, props);

  children.forEach(child => element.append(child));

  return element;
}