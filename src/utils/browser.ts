export const { language = 'en-US', userAgent } = navigator;

export const isIOS = (): boolean =>
  /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

export const isMobile = (): boolean =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
