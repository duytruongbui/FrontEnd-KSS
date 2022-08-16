import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Main from './main';
import { useMediaQuery } from 'react-responsive';
import Head from 'next/head';
import { setHotelId } from '../../common/utils';

const LandingText = [
  'Expand your journey towards holistic wellbeing',
  "Discover your body's unique needs with our TCM wellness assessments",
  'Explore dining, spa, fitness & self-care rituals, curated for your needs & goals!',
];

const LandingURL = [
  '/images/landing1.png',
  '/images/landing2.png',
  '/images/landing3.png',
];

const delaySlide = 4;
const totalSlide = LandingURL.length;

const LANDING_MOBILE_URL = [
  '/images/landing1.png',
  '/images/landing2.png',
  '/images/landing3_mobile.png',
];

const Landing = React.memo(function LandingComponent({
  text,
  pos,
  imgUrl,
  opacity,
}) {
  let defaultImage = imgUrl;
  if (!imgUrl) {
    defaultImage = '/images/default.png';
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="../fonts/TAN-PEARL.otf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <div className="w-full h-full">
        <div className="nearwhite">
          <div
            style={{ width: 40 + pos * 10 + 'vw', opacity: opacity }}
            className={styles.textover}
          >
            {text}
          </div>
          <div
            style={{ width: 30 + pos * 10 + 'vw' }}
            className={styles.plaincover}
          ></div>
        </div>
        <div className={styles.bgover}></div>
        <div className={styles.cover} style={{ opacity: opacity }}>
          <Image
            src={defaultImage}
            alt=""
            layout="fill"
            className={`${opacity === 0 ? styles.bgEaseOut : styles.bg}`}
            style={{ opacity: opacity }}
            objectFit="cover"
          />
        </div>
        <div className={styles.navbar}>
          <div className={pos == 0 ? styles.activenav : styles.next}></div>
          <div className={pos == 1 ? styles.activenav : styles.next}></div>
          <div className={pos == 2 ? styles.activenav : styles.next}></div>
        </div>
      </div>
    </>
  );
});

export default function Home() {
  const [Mstate, setMstate] = useState(0);
  const [data, setData] = useState(['', 0, LANDING_MOBILE_URL[0]]);
  const [opa, setOpacity] = useState(0);
  const [hotelId, setHotel] = useState(0);
  const [load, onLoad] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  useEffect(() => {
    let slideInterval = setInterval(() => {
      if (Mstate < delaySlide * totalSlide + 1) {
        setMstate(Mstate + 1);
      }
    }, 1000);
    return () => clearInterval(slideInterval);
  });
  const router = useRouter();
  const hotel = router.query.hotel;
  useEffect(() => {
    if (hotel) {
      setHotelId(hotel);
      setHotel(hotel);
    }
  }, [hotel]);

  useEffect(() => {
    onLoad(true);
    if (isStepWelcomeHome()) {
      setMstate(delaySlide * totalSlide + 1);
      setData([
        LandingText[totalSlide - 1],
        2,
        isMobile
          ? LANDING_MOBILE_URL[totalSlide - 1]
          : LandingURL[totalSlide - 1],
      ]);
      onLoad(false);
      return;
    } else {
      let currentSlide = Math.floor((Mstate - 1) / delaySlide);
      if (currentSlide < 0) {
        currentSlide = 0;
      }
      if (currentSlide > totalSlide - 1) {
        currentSlide = totalSlide - 1;
      }
      if (isMobile) {
        if (Mstate % delaySlide === 0) {
          setOpacity(0);
          setData(['', currentSlide, '']);
        } else {
          setOpacity(1);
          setData([
            LandingText[currentSlide],
            currentSlide,
            isMobile
              ? LANDING_MOBILE_URL[currentSlide]
              : LandingURL[currentSlide],
          ]);
        }
      } else {
        setOpacity(Mstate % delaySlide === 0 ? 0 : 1);
        setData([
          LandingText[currentSlide],
          currentSlide,
          isMobile
            ? LANDING_MOBILE_URL[currentSlide]
            : LandingURL[currentSlide],
        ]);
      }
      if (Mstate === delaySlide * totalSlide + 1) {
        setOpacity(0);
        gotoStepWelcomeHome(hotelId);
      }
    }
  }, [Mstate, isMobile]);

  return (
    <>
      {load ? (
        <Landing text={data[0]} opacity={opa} pos={data[1]} imgUrl={data[2]} />
      ) : Mstate >= 12 ? (
        <Main />
      ) : null}
    </>
  );
}

const isStepWelcomeHome = () => {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const step = params.get('step');
  return step === 'welcomeHome';
};

const gotoStepWelcomeHome = (hotelId = 0) => {
  var newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    '?step=welcomeHome';
  if (hotelId !== 0) {
    const connectParams = '&hotel=' + hotelId;
    newUrl = newUrl + connectParams;
  }
  window.location.href = newUrl;
};
