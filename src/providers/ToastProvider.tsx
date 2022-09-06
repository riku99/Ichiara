import { Dimensions } from 'react-native';
import { ToastProvider as TProvider } from 'react-native-toast-notifications';

type Props = {
  children: JSX.Element;
};

export const ToastProvider = ({ children }: Props) => {
  return (
    <TProvider
      placement="bottom"
      offset={TOAST_OFFSET}
      style={{ width: TOAST_WIDTH }}
      duration={1500}
    >
      {children}
    </TProvider>
  );
};

const { width, height } = Dimensions.get('screen');
const TOAST_WIDTH = width * 0.9;
const TOAST_OFFSET = height * 0.1;
