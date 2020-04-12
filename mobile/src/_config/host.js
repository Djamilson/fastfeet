import {Platform} from 'react-native';
import {NetworkInfo} from 'react-native-network-info';

let url = 'api.com.br';

if (__DEV__) {
  // Get Local IP
  const ip = NetworkInfo.getIPAddress();

  url = Platform.OS === 'android' ? '10.0.2.2' : ip;
  require('react-devtools');
}

export default {
  LOCALHOST: '192.168.0.125',
  PORT: 3000,
  WEBHOST: url,
};
