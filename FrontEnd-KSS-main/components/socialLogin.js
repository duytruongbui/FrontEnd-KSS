import styles from '../styles/11.module.css';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SocialLogin({ Mantra, type }) {
  const [iconSize, setIconSize] = useState(30);
  const router = useRouter();
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  useEffect(() => setIconSize(isMobile ? 30 : 54), [isMobile]);
  const hotelID = router.query.hotel;

  const goToSignIn = () => {
    router.push({
      pathname: `/${hotelID}/signin`,
      query: {
        Mantra: Mantra,
        uuid: router.query.uuid,
      },
    });
  };

  const goToSignUp = () => {
    router.push({
      pathname: `/${hotelID}/signup`,
      query: {
        Mantra: Mantra,
        uuid: router.query.uuid,
      },
    });
  };

  return (
    <>
      <div
        className={`${styles.footer} ${
          type === 'signup' ? styles.signUpContainer : ''
        }`}
      >
        {/* <div className={styles.signUpUsing}>{`or ${type === 'signup' ? 'sign up' : 'sign in'} using`}</div>
                        <div className={styles.socialSpan}>
                            <span className={styles.spaceRight}>
                                <Image src="/images/11/Facebook.png" alt='' width={iconSize} height={iconSize} />
                            </span>
                            <span className={styles.spaceLeft}>
                                <Image src="/images/11/Gmail.png" alt='' width={iconSize} height={iconSize} />
                            </span>
                        </div> */}
        {type === 'signup' ? (
          <div className="nearwhite mt-6">
            Already have an account?{' '}
            <span onClick={goToSignIn} className={styles.a}>
              Sign In
            </span>
          </div>
        ) : (
          <div className="nearwhite mt-6">
            Don’t have an account?{' '}
            <span onClick={goToSignUp} className={styles.a}>
              Sign Up
            </span>
          </div>
        )}
      </div>
    </>
  );
}
