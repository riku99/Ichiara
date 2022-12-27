import Sound from 'react-native-sound';

Sound.setCategory('Playback', true);
Sound.setMode('Default');

export const alarm = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
