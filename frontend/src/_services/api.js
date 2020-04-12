import axios from 'axios';

import host from '~/_config/host';

const api = axios.create({
  baseURL: `http://${host.WEBHOST}:${host.PORT}`,
});

export default api;
