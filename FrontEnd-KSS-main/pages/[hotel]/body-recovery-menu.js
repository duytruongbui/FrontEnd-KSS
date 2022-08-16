import Navbar, { MBFooter, Footer } from './navbar';
import { useRouter } from 'next/router';
import styles from '../../styles/body-recovery-menu.module.css';
import { DotButton } from '../../components/EmblaCarouselButtons';
import EmblaStyles from '../../styles/embla.module.css';
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useCallback, useEffect } from 'react';
import { UserDataKey } from '../../common/constant';

const defaultContents = [
  {
    img: '/images/17/stress.png',
    text1: 'Relief',
    text2: 'Stress',
    url: '/relief-stress',
    style: {
      borderRadius: '10px 10px 40px 10px',
    },
  },
  {
    img: '/images/17/Sleep.png',
    text1: 'Improve',
    text2: 'Sleep',
    url: '/improve-sleep',
    style: {
      borderRadius: '10px 10px 10px 40px',
    },
  },
  {
    img: '/images/17/headache.png',
    text1: 'Alleviate',
    text2: 'Headache',
    url: '/alleviate-headache',
    style: {
      borderRadius: '10px 40px 10px 10px',
    },
  },
  {
    img: '/images/17/movement.png',
    text1: 'Ease Bowel',
    text2: 'Movement',
    url: '/ease-bowel-movement',
    style: {
      borderRadius: '40px 10px 10px 10px',
    },
  },
];

const EmblaCarousel = ({ imgurls }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onSelect]);
  const router = useRouter();

  return (
    <>
      <div className={EmblaStyles.embla}>
        <div
          className={EmblaStyles.embla__viewport}
          ref={viewportRef}
          style={{ overflow: 'unset' }}
        >
          <div className={EmblaStyles.embla__container1}>
            {imgurls.map((data, index) => (
              <div className={EmblaStyles.embla__slide1} key={index}>
                <div className="h-96 relative">
                  <div className="flex flex-col w-40 md:w-full">
                    <div className="w-full block h-56 md:h-96 relative">
                      <div className={styles.container}>
                        <div
                          className={styles.block}
                          onClick={() =>
                            embla.clickAllowed() &&
                            router.push({
                              pathname: '/' + router.query.hotel + data.url,
                              query: router.query,
                            })
                          }
                        >
                          <div className={styles.imageBg}>
                            <img
                              src={data.img}
                              alt=""
                              className={styles.imageBg}
                            />
                          </div>
                          <div
                            className="font-tanpearl"
                            style={{
                              position: 'relative',
                              textAlign: 'center',
                            }}
                          >
                            <h3 className={styles.text}>{data.text1}</h3>
                            <h3 className={styles.text}>{data.text2}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="embla__dots float-left"
        style={{ width: '100%', paddingTop: 65, paddingBottom: 57 }}
      >
        <div className="bg-white flex rounded-lg" style={{ width: 200 }}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              style={{
                height: 10,
                width: 70,
                margin: 0,
              }}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const MBContent21 = ({ alldata }) => {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        {defaultContents.map((item, index) => (
          <div
            key={index}
            className={styles.block}
            onClick={() =>
              router.push({
                pathname: '/' + router.query.hotel + item.url,
                query: router.query,
              })
            }
          >
            <img
              src={item.img}
              alt=""
              className={styles.imageBg}
              style={item.style}
            />
            <div
              style={{
                ...item.style,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: 0.3,
              }}
            ></div>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <h3 className={styles.text}>{item.text1}</h3>
              <h3 className={styles.text}>{item.text2}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const BodyRecoveryMenu = ({ Name }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData =
      JSON.parse(localStorage.getItem(UserDataKey) || '{}') || {};
    setUser(userData);
  }, []);

  return (
    <>
      <Navbar />
      <div className={`container ${styles.contain}`}>
        <div className={styles.box}>
          <div className={styles.heading}>
            <div
              className={`bg-milk bg-opacity-50 rounded-full flex justify-center items-center tablet:object-cover flex-shrink-0 ${styles.logo}`}
            >
              <img
                src={'/images/icon/' + router.query.Mantra + '.png'}
                className="object-contain max-w-[56%] max-h-[56%]"
              />
            </div>
            <div className={styles.infor}>
              <h1 className={`${styles.hello} md:h-[69px]`}>
                Hello,
                <span className="ml-2 font-tanpearl">
                  {user.lastName || Name}
                </span>
                !
              </h1>
              <h1 className={styles.bio}>
                Looking for a little relief from the common stresses of life? Let us help you get back to feeling your best!
              </h1>
            </div>
          </div>
          <div className={styles.choose}>Choose from one of the following</div>

          <div className="hidden md:block">
            <EmblaCarousel imgurls={defaultContents} />
          </div>
          <div className="md:hidden">
            <MBContent21 alldata={defaultContents} />
          </div>
        </div>
      </div>
      <MBFooter />
      <Footer />
    </>
  );
};

export default BodyRecoveryMenu;
