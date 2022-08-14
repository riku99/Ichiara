import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { theme } from 'src/styles';

type Props = {
  children: JSX.Element;
};

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: theme.black,
    text: theme.black,
  },
};

export const NavigaitonProvider = ({ children }: Props) => {
  return (
    <NavigationContainer theme={navigationTheme}>
      {children}
    </NavigationContainer>
  );
};
