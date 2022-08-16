import styles from '../../../styles/211.module.css';
import Image from 'next/image';
import Navbar, { MBFooter, Footer } from '../navbar';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import FeedbackModal from '../../../components/FeedbackModal';
import { DotButton } from '../../../components/EmblaCarouselButtons';
import EmblaStyles from '../../../styles/embla.module.css';
import { useRouter } from 'next/router';
import api from '../../api';
import { HotelID } from '../../../common/constant';

const data = [
  {
    id: 1,
    url: '/images/spa_dummy_thumbnail/spa_thumbnail1.png',
    title: 'Evening Tension Relief Ritual',
    content: 'Lorem ipsum dolor sit amet.',
  },
  {
    id: 2,
    url: '/images/spa_dummy_thumbnail/spa_thumbnail2.png',
    title: 'Relaxing bath',
    content: 'Lorem ipsum dolor sit amet.',
  },
  {
    id: 3,
    url: '/images/spa_dummy_thumbnail/spa_thumbnail3.png',
    title: 'Qi-moving full body massage',
    content: 'Lorem ipsum dolor sit amet.',
  },
];

const EmblaCarousel = ({ slides, imgurls }) => {
  const router = useRouter();
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

  return (
    <>
      <div className={EmblaStyles.embla}>
        <div
          className="embla__viewport"
          ref={viewportRef}
          style={{ overflow: 'unset' }}
        >
          <div className={EmblaStyles.embla__container2}>
            {imgurls.map((data, index) => (
              <div className={EmblaStyles.embla__slide1} key={index}>
                <div
                  className="h-96 relative"
                  onClick={() =>
                    embla.clickAllowed() &&
                    router.push({
                      pathname: '/' + router.query.hotel + `/spa/${data.id}`,
                      query: router.query,
                    })
                  }
                >
                  <div
                    className="flex flex-col w-40 md:w-full"
                    style={{ height: '100% !important' }}
                  >
                    <div
                      className="w-full block h-56 md:h-96 relative"
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100% !important',
                      }}
                    >
                      <div className={styles.main__img}>
                        <Image
                          src={data.url}
                          alt=""
                          layout="fill"
                          objectFit="cover"
                          className="rounded-custom"
                        />
                      </div>
                      <div className={styles.itemcontent}>
                        <h1 className="font-tanpearl nearwhite text-2xl md:text-4xl p-4 md:leading-normal">
                          {data.title}
                        </h1>
                        <p className="nearwhite p-4 text-base md:text-xl">
                          {data.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
      </div>
      <div className="embla__dots float-left" style={{ marginTop: '98px' }}>
        <div className={`${EmblaStyles.embla__dots}`}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              style={{
                height: 10,
                width: 30,
                margin: 5,
              }}
              selected={index === selectedIndex}
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
      <div className="grid grid-flow-row gap-4">
        {alldata.map((data, index) => (
          <div key={index}>
            <div
              className="overflow-hidden relative"
              onClick={() =>
                router.push({
                  pathname: '/' + router.query.hotel + `/spa/${data.id}`,
                  query: router.query,
                })
              }
            >
              <div className={styles.main__img}>
                <img src={data.url} alt="" />
              </div>
              <div className={styles.itemcontent}>
                <h1 className={`font-tanpearl text-2xl ${styles.title}`}>
                  {data.title}
                </h1>
                <p className={styles.subtitle}>{data.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

function MainContent21({ Mantra, spaData }) {
  const router = useRouter();
  return (
    <>
      <div className={styles.bg}>
        <Navbar />
        <div className={`container ${styles.container}`}>
          <div className={styles.heading}>
            <div className="bg-milk bg-opacity-50 rounded-full flex items-center justify-center w-[140px] h-[140px] mobile:w-[100px] mobile:h-[100px]">
              <img
                src={'/images/icon/' + Mantra + '.png'}
                alt="logo-18"
                className="object-contain max-w-[56%] max-h-[56%]"
              />
            </div>
            <div className={styles.heading__text}>
              <div className="max-w-sm mx-2">
                <span className="text-white text-3xl md:leading-normal">
                  Spa treatments best suited for{' '}
                </span>
                <span className="font-tanpearl text-white text-2xl">
                  {Mantra}
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <EmblaCarousel slides={[0, 1, 2]} imgurls={spaData} />
          </div>
          <div className="md:hidden" style={{ marginTop: '50px' }}>
            <MBContent21 alldata={spaData} />
          </div>

          <div className="float-root pb-4">
            <div className="md:flex md:justify-end">
              <div className={styles.groupButton}>
                <Link
                  href={
                    '/' + router.query.hotel + `/recommend?Mantra=${Mantra}`
                  }
                >
                  <a
                    className={`w-[330px] ${styles.btnitem}`}
                    style={{ background: '#073E0D' }}
                  >
                    ALL RECOMMENDATIONS
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <FeedbackModal
          onSubmit={() => {
            console.log('submit');
          }}
        />
        <MBFooter />
        <Footer />
      </div>
    </>
  );
}

export default function Spa() {
  const [mantra, setMantra] = useState('');
  const [spaData, setSpaData] = useState([]);
  const getSpaData = async (mantra, hotel) => {
    const mantraDetail = await api.mantra.obtainMantraDetails(mantra);
    if (mantraDetail.data == null) {
      return;
    }
    const res = await api.gymAndSpa.pagingToQueryActivityOfMantra({
      asc: false,
      hotelId: hotel,
      mantraId: mantraDetail.data.id,
      pageNumber: 1,
      pageSize: 20,
      placeType: '4',
      sort: 'create_time',
    });
    setSpaData(
      res.data.list.map((item, i) => ({
        id: item.id,
        url: item.image,
        title: item.title,
        content: item.subtitle,
      }))
    );
    return res;
  };
  useEffect(() => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const Mantra = params.get('Mantra');
    const hotel = params.get(HotelID) || localStorage.getItem(HotelID);
    setMantra(Mantra);
    getSpaData(Mantra, hotel);
  }, []);

  if (!mantra) {
    return null;
  }
  return <MainContent21 Mantra={mantra} spaData={spaData} />;
}
