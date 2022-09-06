import { MenuAction, MenuView } from '@react-native-menu/menu';
import { Alert } from 'react-native';

const radiusMenuActions: MenuAction[] = [
  {
    id: 'custom',
    title: 'カスタム',
  },
  {
    id: '2000',
    title: '2km',
  },
  {
    id: '1000',
    title: '1km',
  },
  {
    id: '500',
    title: '500m',
  },
  {
    id: '300',
    title: '300m',
  },
];

type Props = {
  children: JSX.Element;
  onChangeRadius: (n: number) => void;
};

export const RadiusMenu = ({ children, onChangeRadius }: Props) => {
  const onRadiusMenuActionPress = (id: string) => {
    switch (id) {
      case '300':
        onChangeRadius(300);
        break;
      case '500':
        onChangeRadius(500);
        break;
      case '1000':
        onChangeRadius(1000);
        break;
      case '2000':
        onChangeRadius(2000);
        break;
      case 'custom':
        Alert.prompt(
          'お知らせする範囲をメートルで入力してください',
          '',
          [
            {
              text: 'キャンセル',
              style: 'cancel',
            },
            {
              text: '設定',
              onPress: (input) => {
                const r = Number(input);
                if (r) {
                  if (r < 300 || r > 3000) {
                    Alert.alert('設定できる範囲は300m以上3km以下です');
                    return;
                  }
                  onChangeRadius(r);
                } else {
                  Alert.alert('入力値が不正です');
                }
              },
            },
          ],
          'plain-text',
          '',
          'number-pad'
        );
    }
  };

  return (
    <>
      {/* @ts-ignore https://github.com/react-native-menu/menu/pull/416  */}
      <MenuView
        actions={radiusMenuActions}
        onPressAction={({ nativeEvent }) => {
          onRadiusMenuActionPress(nativeEvent.event);
        }}
      >
        {children}
      </MenuView>
    </>
  );
};
