import '../styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'reactjs-popup/dist/index.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setHotelId } from '../common/utils';

function MyApp({ Component, pageProps }) {
  const route = useRouter();
  useEffect(() => {
    if (route.query.hotel) {
      setHotelId(route.query.hotel);
    }
  }, [route.query]);
  return <Component {...pageProps} />;
}

export default MyApp;
