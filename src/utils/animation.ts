// Run a callback function after an animation transition is complete
// This is to prevent frame choppiness which happens if running too many things at once during the animation
// 300ms is the default animation in and out duration on drawers so it's also the default here
export const onAnimationComplete = (callback, animationInDuration = 300) =>
  setTimeout(callback, animationInDuration);
