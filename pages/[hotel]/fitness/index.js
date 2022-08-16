import styles from '../../../styles/21.module.css';
import Image from 'next/image';
import Navbar, { MBFooter, Footer } from '../navbar';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton } from '../../../components/EmblaCarouselButtons';
import EmblaStyles from '../../../styles/embla.module.css';
import { useRouter } from 'next/router';
import api from '../../api';
import { HotelID } from '../../../common/constant';
import { getHotelId } from '../../../common/utils';

const EmblaCarousel = ({ slides, imgurls }) => {
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
          className={EmblaStyles.embla__viewport}
          ref={viewportRef}
          style={{ overflow: 'unset' }}
        >
          <div className={EmblaStyles.embla__container2}>
            {(imgurls.list ?? []).map((data, index) => (
              <div className={EmblaStyles.embla__slide1} key={index}>
                <div className="h-96 relative">
                  <div
                    className="flex flex-col w-40 md:w-full"
                    style={{ height: '100% !important' }}
                  >
                    <div
                      className={`w-full block h-56 md:h-96 relative ${styles.mask_image}`}
                      style={{ height: '100% !important' }}
                    >
                      <div className={`${styles.main__img}`} style={{backgroundImage:`url(${data.image})`}}>
                        {/* <Image
                          src={data.image}
                          alt=""
                          layout="fill"
                          objectFit="cover"
                          className="rounded-custom"
                        /> */}
                      </div>
                      <div className={styles.itemcontent}>
                        <h1 className="font-tanpearl nearwhite text-2xl md:text-4xl p-4">
                          {data.title}
                        </h1>
                        <p className="nearwhite p-4 text-base md:text-xl">
                          {data.subtitle}
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
  return (
    <>
      <div className="grid grid-flow-row gap-4">
        {(alldata.list ?? []).map((data, index) => (
          <div key={index}>
            <div className={`overflow-hidden relative ${styles.maskImage}`}>
              <div className={styles.main__img} style={{background:`url(${data.image})`}}>
                {/* <img src={data.image} alt="" /> */}
              </div>
              <div className={styles.itemcontent}>
                <h1 className={`font-tanpearl text-3xl ${styles.title}`}>
                  {data.title}
                </h1>
                <p className={styles.subtitle}>{data.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const MainContent21 = ({ MantraId, Hotel, Mantra }) => {
  const router = useRouter();
  const [listGYM, setGYM] = useState([]);

  useEffect(() => {
    onInitialData(MantraId, Hotel);
  }, [MantraId, Hotel, Mantra]);

  const onInitialData = async (MantraId, Hotel) => {
    let params = {
      hotelId: Hotel,
      mantraId: MantraId,
      placeType: '3',
      pageSize: 20,
    };

    if (Hotel && MantraId) {
      const result = await api.gymAndSpa.pagingToQueryActivityOfMantra(params);
      console.log('GymSpa', result);
      if (result.code === 0) {
        setGYM(result.data);
      }
    }
  };

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
                  Fitness & workouts best suited for{' '}
                </span>
                <span className="font-tanpearl text-white text-2xl">
                  {Mantra}
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <EmblaCarousel slides={[0, 1, 2]} imgurls={listGYM} />
          </div>
          <div className="md:hidden" style={{ marginTop: '50px' }}>
            <MBContent21 alldata={listGYM} />
          </div>

          <div className="float-root pb-4">
            <div className="md:flex md:justify-end">
              <div className={styles.groupButton}>
                {/* <Link href="#">
                  <a
                    className={styles.btnitem}
                    style={{
                      marginRight: '22px',
                      background: '#073E0D',
                    }}
                  >
                    CHECK GYM AVAILABILITY
                  </a>
                </Link> */}
                <Link href={'/' + getHotelId() + `/recommend?Mantra=${Mantra}`}>
                  <a className={styles.btnitem}>ALL RECOMMENDATIONS</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <MBFooter />
        <Footer />
      </div>
    </>
  );
};

export default function Fitness() {
  const router = useRouter();
  const Mantra = router.query.Mantra;
  const [hotel, setHotel] = useState(null);
  const [mantraId, setMantraId] = useState(0);
  useEffect(() => {
    onInitialData();
  }, [Mantra]);

  const onInitialData = async () => {
    const hotelId = localStorage.getItem(HotelID);
    setHotel(hotelId);

    if (Mantra) {
      const mantraData = await api.mantra.obtainMantraDetails(Mantra);
      if (mantraData.code === 0) {
        const detailMantra = mantraData.data;
        setMantraId(detailMantra.id);
      }
    }
  };
  return <MainContent21 MantraId={mantraId} Hotel={hotel} Mantra={Mantra} />;
}
