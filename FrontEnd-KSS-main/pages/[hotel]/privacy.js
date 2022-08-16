import Image from 'next/image';
import Navbar, { MBFooter, Footer } from './navbar';
import Link from 'next/link';
import useInterval from '../../components/useInterval';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/13.module.css';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

const getMantraFromUrl = () => {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  return params.get('Mantra');
};

export default function Privacy({ Mantra }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [btn, onShowBtn] = useState(false);
  const [logoWidth, setLogoWidth] = useState(234);
  const [logoHeight, setLogoHeight] = useState(51);
  const [isShowAgree, setIsShowAgree] = useState(false);
  const [mantra, setMantra] = useState(Mantra);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  useInterval(() => {
    countdown > 0 ? setCountdown(countdown - 1) : onShowBtn(true);
  }, 1000);

  useEffect(() => {
    const _mantra = getMantraFromUrl();
    if (_mantra) {
      setMantra(_mantra);
      setIsShowAgree(!!_mantra);
    }
  });

  useEffect(() => {
    const logoWidth = isMobile ? 234 : 316;
    const logoHeight = isMobile ? 51 : 69;
    setLogoWidth(logoWidth);
    setLogoHeight(logoHeight);
  }, [isMobile]);

  return (
    <>
      <Navbar isNotShowMobile={true} />
      <div className={styles.container}>
        <div className={`${styles.box} container mx-auto`}>
          <div className={styles.selection}>
            <h3
              onClick={() => {
                router.push('/' + router.query.hotel + '/terms');
              }}
            >
              Term & Condition
            </h3>
            <h3 className={styles.selected}>Privacy Agreement</h3>
            <h3
              onClick={() => {
                router.push('/' + router.query.hotel + '/disclaimer');
              }}
            >
              Disclaimer
            </h3>
          </div>
          <div className={styles.content}>
            {isMobile && (
              <div className={styles.centerLogo}>
                <Image
                  src="/images/11/Bigtext.png"
                  alt=""
                  width={logoWidth}
                  height={logoHeight}
                />
              </div>
            )}
            <h1 className={styles.headertext}>Privacy Agreement</h1>
            <p className={styles.paragraph}>
              <div>
                THIS WEB APP DOES NOT PROVIDE MEDICAL ADVICE NOR PURPORTS TO DO
                SO. The contents of this website are meant purely for
                informational and educational purposes only. The website is not
                a substitute for medical advice, diagnosis, treatment or
                professional care. If you have or suspect you have a health
                problem, you should consult a doctor or a qualified healthcare
                provider. Do not disregard professional medical advice or delay
                in seeking it because of something you have read on this
                website.
              </div>
              <div className="mt-2">
                Any reliance by you on the information contained in this website
                shall be at your own risk. Kanpobliss makes no express or
                implied representation or warranty regarding the completeness,
                accuracy, reliability or currency of the information contained
                in the Materials. To the fullest extent permitted by law,
                Kanpobliss disclaims all express or implied warranties,
                including but not limited to, warranties of satisfactory
                quality, merchantability, and fitness for a particular purpose.
                Kanpobliss shall not be liable for any damage or loss of any
                kind directly or indirectly arising from or in connection with
                your use or inability to access www.website.com and/or use the
                Materials.
              </div>
              <div className="mt-2">
                The provision of access to other external websites is solely for
                your convenience and does not imply Kanpobliss&apos;s
                endorsement of, or affiliation or association to, the linked web
                sites or their operators. Kanpobliss is not responsible for the
                availability, accuracy or content of these external sites. Your
                access of any linked web site shall be at your sole risk.
                Kanpobliss shall not be responsible for any damage or loss to
                you arising from or in connection with your use of such web
                sites.
              </div>
            </p>
            {!isShowAgree ? null : btn ? (
              <Link
                href={'/' + router.query.hotel + '/home?Mantra=' + mantra}
                className={styles.resultbtn}
              >
                <button className={styles.resultGreenBtn}>SEE RESULT</button>
              </Link>
            ) : (
              <button className={styles.resultbtn}>
                SEE RESULT ({countdown}S)
              </button>
            )}
          </div>
        </div>
      </div>
      <MBFooter />
      <Footer />
    </>
  );
}
