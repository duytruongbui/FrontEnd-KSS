import styles from '../../../styles/21.module.css';
import Image from 'next/image';
import Navbar, { MBFooter, Footer } from '../navbar';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { fetchAPI } from '../../../lib/api';
import { useRouter } from 'next/router';

const ThumbnailCarousel = ({ imgurls }) => {
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
      <div className={styles.list_spa_thumbnail}>
        {imgurls.map((data, index) => (
          <div style={{ marginRight: '22px' }} key={index}>
            <div className="flex flex-col w-40 md:w-full">
              <div
                className="w-full block h-56 md:h-96 relative"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  router.push('/' + router.query.hotel + `/spa/${data._id}`)
                }
              >
                <div className={styles.thumbnail_mantra_background}>
                  <Image
                    src={
                      data.images.length !== 0
                        ? data.images[0]
                        : `/images/spa_dummy_thumbnail/spa_thumbnail${
                            index + 1
                          }.png`
                    }
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className={styles.mantra_image_thumbnail}
                  />
                </div>
                <div className={styles.itemcontent}>
                  <h1 className="nearwhite text-2xl md:text-4xl p-4">
                    {data.name || 'Name'}
                  </h1>
                  <p className="nearwhite p-4 text-base md:text-xl">
                    {data.description || 'Description'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const MbContent = ({ alldata }) => {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-flow-row gap-4 m-2">
        {alldata.map((data, index) => (
          <div key={index}>
            <div
              className="overflow-hidden relative"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                router.push('/' + router.query.hotel + `/spa/${data._id}`)
              }
            >
              <div className={styles.main__img}>
                <img
                  src={
                    data.images.length !== 0
                      ? data.images[0]
                      : '/images/21/spa_bg.jpg'
                  }
                  alt=""
                />
              </div>
              <div className={styles.itemcontent}>
                <h1 className="nearwhite text-2xl md:text-4xl md:p-4">
                  {data.name || 'Name'}
                </h1>
                <p className="nearwhite md:p-4 text-base md:text-xl">
                  {data.description || 'Description'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default function Spa({ listSpaDetails }) {
  const router = useRouter();

  let Mantra = 'Mantra';

  return (
    <div className={styles.bg}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.heading__imgfluid}>
            <div className={styles.mantra_background}>
              <img
                src="/images/mantra_icon/Chill.svg"
                alt="triangle with all three sides equal"
                className={styles.mantra_icon}
              />
            </div>
          </div>
          <div className={styles.heading__text}>
            <div className="text-3xl pt-4">
              Spa treatments best suited for{' '}
              <span className="tanpearl">{Mantra}</span>
            </div>
          </div>
        </div>
        <div className={styles.gap_between_header_vs_content} />
        <div className="hidden md:block">
          <ThumbnailCarousel imgurls={listSpaDetails} />
        </div>
        <div className="md:hidden">
          <MbContent alldata={listSpaDetails} />
        </div>
        <div className={styles.gap_between_content_vs_bottom_button} />
        <div className={styles.group_button}>
          <Link href="#">
            <a
              className={styles.mantra_button}
              style={{ background: '#073E0D' }}
            >
              CHECK SPA AVAILABILITY
            </a>
          </Link>
          <Link href={'/recommend'}>
            <a className={styles.mantra_button}>ALL RECOMMENDATIONS</a>
          </Link>
        </div>
        <div className={styles.gap_footer} />
      </div>
      <MBFooter />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const allDishes = await fetchAPI('Spa/getAll');
  const allRes = await fetchAPI('Partner/getAll');

  if (allDishes.result.statusCode !== 200 || allRes.result.statusCode !== 200) {
    return {
      notFound: true,
    };
  }

  let _listRes = [...allRes.result.partners];
  let _listDishes = [...allDishes.result.restaurants];

  let listRes = _listRes.filter((item) => item.type === 'Spa');

  let listDishes = _listDishes.map((item, index) => {
    const findIdx = listRes.filter(
      (element) => element._id === item.idResOrSpa
    );
    if (findIdx.length > 0) {
      return {
        ...item,
        nameResOrSpa: findIdx[0].name,
      };
    } else {
      return {
        ...item,
      };
    }
  });

  return {
    props: {
      listSpa: [...listRes],
      listSpaDetails: [...listDishes],
    },
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
