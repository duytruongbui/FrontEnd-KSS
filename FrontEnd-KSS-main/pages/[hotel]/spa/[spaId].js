import Navbar, { MBFooter, Footer } from '../navbar';
import { useState, useEffect } from 'react';
import styles from '../../../styles/19.module.css';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import api from '../../api';

const SpaDetail = ({}) => {
  const router = useRouter();
  const [spaDetail, setSpaDetail] = useState({});
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const getSpaDetailData = async (mantra, spaId) => {
    const mantraDetail = await api.mantra.obtainMantraDetails(mantra);
    if (mantraDetail.data == null) {
      return;
    }
    const res = await api.gymAndSpa.inquireAboutActivityDetails(
      mantraDetail.data.id,
      spaId
    );
    setSpaDetail(res.data);
    return res;
  };
  useEffect(() => {
    if (!router.query.spaId) {
      return;
    }
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const mantra = params.get('Mantra');
    getSpaDetailData(mantra, router.query.spaId);
  }, [router.query.spaId]);

  return (
    <>
      <Navbar showBackButton />
      <div className={`container ${styles.contain}`}>
        <div className={styles.box1}>
          <div className={styles.container1}>
            <div
              className={`hidden tablet:block text-[28px] leading-[33px] mb-4 text-white w-full text-left`}
            >
              {spaDetail.title}
            </div>
            <div className={styles.img1}>
              <img
                src={spaDetail.image}
                width="100%"
                style={
                  isTabletOrMobile ? {} : { height: 280, objectFit: 'fill' }
                }
              />
            </div>
            <div
              className={`${styles.content1} tablet:w-full tablet:text-left tablet:text-base tablet:leading-5`}
            >
              <h1 className={`tablet:hidden ${styles.header1}`}>
                {spaDetail.title}
              </h1>

              <div
                className={`${styles.text1} marker:text-green marker:text-xs tablet:text-[12px] tablet:leading-4`}
                style={
                  isTabletOrMobile ? { fontSize: 12, lineHeight: '16px' } : {}
                }
                dangerouslySetInnerHTML={{
                  __html: spaDetail.introduction?.replace(/&nbsp;/g, ' '),
                }}
              ></div>
            </div>
          </div>
          <div className={styles.container2}>
            <div className={styles.content2}>
              <h1
                className={styles.header2}
                style={isTabletOrMobile ? { fontSize: 26 } : {}}
              >
                Enjoy it at{' '}
                <span className="ml-3 font-tanpearl leading-[44px]">
                  {spaDetail.placeName}
                </span>
              </h1>
              <div className={`hidden tablet:block mt-[14px] ${styles.img2}`}>
                <img src={spaDetail.placeImage} width="100%" />
              </div>
              <h3
                className={`${styles.text2} tablet:mb-5`}
                style={
                  isTabletOrMobile ? { fontSize: 12, lineHeight: '120%' } : {}
                }
              >
                {spaDetail.placeDescription}
              </h3>
              <button
                onClick={() =>
                  router.push(
                    '/' + router.query.hotel + spaDetail.placeBookingLink
                  )
                }
                className={styles.book}
              >
                BOOK TREATMENT
              </button>
            </div>
            <div className={`tablet:hidden ${styles.img2}`}>
              <img
                src={spaDetail.placeImage}
                width="100%"
                style={
                  isTabletOrMobile ? {} : { height: 280, objectFit: 'fill' }
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" tablet:-mt-10">
        <MBFooter />
      </div>
      <Footer />
    </>
  );
};

export default SpaDetail;
