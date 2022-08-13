import { NavigationContainer } from '@react-navigation/native';

type Props = {
  children: JSX.Element;
};

export const NavigaitonProvider = ({ children }: Props) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};
