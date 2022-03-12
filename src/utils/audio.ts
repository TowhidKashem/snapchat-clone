export const playSound = async (sound: string, audioElem: HTMLAudioElement) => {
  const soundMap: Record<string, string> = {
    newAppMessage: './audio/blip.mp3',
    cameraShutter: './audio/shutter.mp3'
  };
  // IOS no longer allows sounds to be played without a user action
  // passing an audio tag from the component and setting it's `src` attribute
  // and then paying it seems to bypass this restriction for now..
  audioElem.src = soundMap[sound];
  try {
    await audioElem.play();
  } catch (error) {}
};
