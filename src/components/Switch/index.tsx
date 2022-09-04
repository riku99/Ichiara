import { ComponentProps } from 'react';
import { Switch as OriginalSwitch } from 'react-native';
import { theme } from 'src/styles';

type Props = ComponentProps<typeof OriginalSwitch>;

export const Switch = (props: Props) => {
  return (
    <OriginalSwitch
      trackColor={{
        true: theme.blue,
      }}
      {...props}
    />
  );
};
