import { useLayoutEffect, useRef } from 'react';
import Swiper from 'react-native-swiper';
import { LocationSetting } from './LocationSetting';
import { Notification } from './Notification';

type Props = RootNavigationScreenProp<'Intro'>;

export const IntroScreen = ({ navigation }: Props) => {
  const swiperRef = useRef<Swiper>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const goToScoundPage = () => {
    swiperRef.current?.scrollBy(1);
  };

  return (
    <Swiper scrollEnabled={false} ref={swiperRef}>
      <Notification goToScoundPage={goToScoundPage} />
      <LocationSetting />
    </Swiper>
  );
};
