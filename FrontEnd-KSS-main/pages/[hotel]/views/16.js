import Image from 'next/image';
import Navbar, { MBFooter, Footer } from '../navbar';
import { MantraList } from '../../../components/quiz/quiz1data';
import { diet, lifestyle } from '../../../components/welltipsdata';
import { useRouter } from 'next/router';

import styles from '../../../styles/16.module.css';
import { StorageName } from '../../../common/constant';
import { validateTimeExpired } from '../../../common/utils';
import { useEffect } from 'react';

const Content16 = ({ Mantra }) => {
  const router = useRouter();

  const getMantraInd = () => {
    const getMantra = (Mantra ? Mantra : router.query.Mantra) || '';
    return MantraList.findIndex(
      (mantra) => mantra.toUpperCase() === getMantra.toUpperCase()
    );
  };

  const checkLoggedIn = async () => {
    const tokenStorage = localStorage.getItem(StorageName);
    if (
      tokenStorage !== null &&
      validateTimeExpired(JSON.parse(tokenStorage).expired)
    ) {
      router.push('/' + router.query.hotel + '/signin');
    } else if (tokenStorage === null) {
      router.push('/' + router.query.hotel + '/signin');
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={`mt-3 ${styles.logo}`}>
          <img
            src={
              '/images/icon/' + (Mantra ? Mantra : router.query.Mantra) + '.png'
            }
            layout="fill"
            objectFit="scale-down"
            alt=""
            width={70}
            height={70}
            style={{
              height: 70,
              objectFit: 'contain',
            }}
          />
        </div>

        <div className={`container ${styles.box}`}>
          <h1 className={styles.headerText}>
            Wellness Tips for
            <span className="mt-4 font-tanpearl">{` ${
              Mantra ? Mantra : router.query.Mantra
            }`}</span>
          </h1>
          <div className={`${styles.block}   ${styles.block1}`}>
            <div className={styles.heading}>
              <Image src="/images/16/Diet.png" width={25} height={28} alt="" />
              <h3 className={styles.header}>&nbsp; Diet & Nutrition</h3>
            </div>
            <p
              className={styles.paragraph}
              style={{ marginTop: 19 }}
              dangerouslySetInnerHTML={{
                __html: `${diet[getMantraInd()] || ''}`,
              }}
            ></p>
          </div>
          <div className={styles.block} style={{ marginBottom: 50 }}>
            <div className={styles.heading}>
              <Image
                src="/images/16/LifeStyle.png"
                width={20}
                height={28}
                alt=""
              />
              <h3 className={styles.header}>&nbsp; Lifestyle & habits</h3>
            </div>
            <p
              className={styles.paragraph}
              style={{ marginTop: 19 }}
              dangerouslySetInnerHTML={{
                __html: `${lifestyle[getMantraInd()] || ''}`,
              }}
            ></p>
          </div>
          <button
            className={styles.recommend}
            onClick={() => {
              router.push({
                pathname: '/' + router.query.hotel + '/recommend',
                query: {
                  Mantra: Mantra ? Mantra : router.query.Mantra,
                },
              });
            }}
          >
            Get Recommendations
          </button>
        </div>
        <MBFooter />
        <Footer />
      </div>
    </>
  );
};

export default Content16;
