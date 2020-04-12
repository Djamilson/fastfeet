import {Platform} from 'react-native';

export default {
  padding_price: 7,
  padding: 15,
  border_radius: 5,
  padding_: 0,
  padding_20: 20,

  padding_30: 30,
  margin_top: -100,
  margin_top_1: -120,
  margin_top_2: -130,
  height_button: 50,
  ...Platform.select({
    ios: {headerHeight: 64, headerPadding: 20},
    android: {headerHeight: 44, headerPadding: 0},
  }),
  tabBarHeight: 50,
};
