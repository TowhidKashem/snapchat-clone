// Run a callback function after an animation transition is complete
// This is to prevent frame choppiness which happens if running too many things at once during the animation
export const onAnimationComplete = (callback, animationInDuration) =>
  setTimeout(callback, animationInDuration);
