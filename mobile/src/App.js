import {useSelector} from 'react-redux';

import createRouter from './routes';

export default function App() {
  const signed = useSelector((state) => state.auth.signed);
  const acceped_regulation = useSelector((s) => s);

  return createRouter(signed, acceped_regulation);
}
