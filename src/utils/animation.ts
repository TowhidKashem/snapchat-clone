// Runs a callback function after an animation transition is complete
// This is to prevent animation choppiness which happens if running too many things (API requests, etc)
// at once while the animation is still running
// 300ms is the default value of `animationInDuration` for drawers so it's also the default here
export const onAnimationComplete = (callback, animationInDuration = 300) =>
  setTimeout(callback, animationInDuration);
