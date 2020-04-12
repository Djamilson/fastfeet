import {ToastAndroid} from 'react-native';

const Toast = (props) => {
  const {visible} = props;
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

export default Toast;
