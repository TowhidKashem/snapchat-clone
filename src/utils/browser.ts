export const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
export const stretchViewPortHeight = (elem = document.documentElement) => {
  const viewportHeight = window.innerHeight * 0.01;
  elem.style.setProperty('--vh', viewportHeight + 'px');
};

export const elemInView = (elem, fullyVisible?): boolean => {
  const position = elem.getBoundingClientRect();
  const elemTop = position.top;
  const elemBottom = position.bottom;
  const isVisible = fullyVisible
    ? elemTop >= 0 && elemBottom <= window.innerHeight
    : elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
};
