import { useRouter } from 'next/router';
import Term from './views/29';

export default function Main() {
  const router = useRouter();
  return (
    <Term
      noCountdown
      onNav={() => {
        router.push({
          pathname: '/' + router.query.hotel + '/',
          query: { step: 'welcomeHome' },
        });
      }}
    />
  );
}
