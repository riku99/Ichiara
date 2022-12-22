import Sound from 'react-native-sound';

Sound.setCategory('Playback', true);
Sound.setMode('Default');
Sound.setActive(true);

export const alarm = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }

  console.log('loaded successfully');
});
