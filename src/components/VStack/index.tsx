import { ComponentProps } from 'react';
import { View } from 'react-native';

type Props = {
  space?: number;
  children: JSX.Element | JSX.Element[];
} & ComponentProps<typeof View>;

export const VStack = ({ children, space = 0, ...props }: Props) => {
  return (
    <View {...props}>
      {Array.isArray(children)
        ? children.map((c, index) => (
            <View
              key={index}
              style={index === 0 ? undefined : { marginTop: space }}
            >
              {c}
            </View>
          ))
        : children}
    </View>
  );
};
