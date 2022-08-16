import Navbar, { Footer } from '../navbar';
import Content9 from './9';
import React, { useState } from 'react';
import styles from '../../../styles/11.module.css';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import { DEMO_GRAPHIC, StorageName } from '../../../common/constant';
import { validateTimeExpired } from '../../../common/utils';
import api from '../../api';

const Content10 = ({
  Mantra,
  Q1CheckBoxInit,
  Q2CheckBoxInit,
  Q3CheckBoxInit,
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();

  const onShowDisclaim = (show) => {
    router.push({
      pathname: '/' + router.query.hotel + '/disclaimer',
    });
  };

  const info = router.query.info === 'true';

  const onGetInfo = async (dataUpdateDemoGraphic) => {
    const tokenStorage = localStorage.getItem(StorageName);
    if (
      tokenStorage !== null &&
      !validateTimeExpired(JSON.parse(tokenStorage).expired)
    ) {
      try {
        const res = await api.userProblem.submitAnswers(dataUpdateDemoGraphic);
      } catch (error) {
        alert(error);
        return;
      }
      router.push({
        pathname: '/' + router.query.hotel + '/home',
        query: { ...router.query },
      });
    } else {
      localStorage.setItem(DEMO_GRAPHIC, JSON.stringify(dataUpdateDemoGraphic));
      router.push({
        pathname: router.pathname,
        query: { ...router.query, info: 'false' },
      });
    }
  };

  const onClickSignUp = () => {
    router.push({
      pathname: '/' + router.query.hotel + '/signup',
      query: { Mantra: router.query.Mantra, uuid: router.query.uuid },
    });
  };

  return (
    <>
      {!info ? (
        <>
          <div className={`${styles.container} ${styles.customContainer}`}>
            <div className={styles.mainContainer}>
              <Navbar
                title="Body Constitution"
                onShowMenu={(value) => setIsShow(value)}
              />
              <div className={`${styles.content} ${styles.customContent}`}>
                <div className={`${styles.box} ${styles.customBox}`}>
                  <div className={`${styles.icontop} ${styles.iconTopCustom}`}>
                    <img
                      src={'/images/icon/' + Mantra + '.svg'}
                      style={{ width: '75%', height: '75%' }}
                    />
                  </div>
                  <div className={styles.CenterBoxLg}>
                    <div className={`mt-12 text-xl mb-4 ${styles.commonText}`}>
                      Your body needs
                    </div>
                    <h1
                      className={`text-3xl ${styles.commonText} ${styles.mantraTitle}`}
                    >
                      {Mantra}
                    </h1>
                    <p className={`text-center p-10 ${styles.commonText}`}>
                      Sign up to learn more about your unique body type. Get
                      personalized wellness tips and recommendations!
                    </p>
                  </div>
                  <div
                    className={`greenbtn ${styles.lastSignupBtn} cursor-pointer`}
                    style={{ opacity: isShow ? 0.4 : 1 }}
                    onClick={onClickSignUp}
                  >
                    Sign up
                  </div>
                </div>
              </div>
              <div className={styles.bottomBtn}>
                {isMobile && (
                  <button
                    onClick={() => onShowDisclaim(true)}
                    className="nearwhite text-center w-full"
                  >
                    Disclaimer
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Content9
          onChange={onGetInfo}
          Q1CheckBoxInit={Q1CheckBoxInit}
          Q2CheckBoxInit={Q2CheckBoxInit}
          Q3CheckBoxInit={Q3CheckBoxInit}
        />
      )}
      {/* <MBFooter /> */}
      <Footer />
    </>
  );
};

export default Content10;
