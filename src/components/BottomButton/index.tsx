import { ComponentProps } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import { theme } from 'src/styles';

type Props = {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
} & ComponentProps<typeof Pressable>;

export const BottomButton = ({
  title,
  titleStyle,
  ...pressableProps
}: Props) => {
  return (
    <View style={styles.container}>
      <Pressable {...pressableProps} style={styles.defaultButton}>
        <Text style={titleStyle ?? styles.defaultTitle}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
  defaultTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  defaultButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: theme.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
