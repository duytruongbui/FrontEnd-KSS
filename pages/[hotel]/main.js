import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { StorageName } from '../../common/constant';
import { validateTimeExpired } from '../../common/utils';
import MainStyles from '../../styles/Main.module.css';
import Navbar, { Footer, MBFooter } from './navbar';

const CardContent = ({ data, active }) => {
  const router = useRouter();
  return (
    <>
      <div
        className={`absolute ${
          active ? MainStyles.animationShow : MainStyles.animationHidden
        }`}
      >
        <div className="flex flex-col w-40 md:w-full">
          <Link href={'/' + router.query.hotel + data.link}>
            <a className={MainStyles.title}>
              <div
                className="mb-5 md:h-80 md:hidden"
                style={{ width: '130px' }}
              >
                <div
                  style={{
                    background: `url('${data.img}') no-repeat center`,
                  }}
                  className={MainStyles.customImgMobile}
                />
              </div>
              <div
                className={`${MainStyles.customImgContainer} hidden md:block h-56 md:h-full`}
                style={{
                  marginBottom: '20px',
                  background: `url('${data.img}') no-repeat center`,
                }}
              >
                <div style={{}} className={MainStyles.customImg} />
              </div>
              <div className="flex flex-column">
                <h1
                  className={`md:mt-4 md:mb-2 text-base font-tanpearl ${MainStyles['title-28']}`}
                  style={{ color: '#f8eee4' }}
                >
                  {data.title}
                </h1>
                <p className={`${MainStyles.content} font-tenor`}>
                  {data.content}
                </p>
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div
        className={`${
          active ? MainStyles.animationHidden : MainStyles.animationShow
        }`}
      >
        <div className="flex flex-col w-40 md:w-full $">
          <div className="w-full md:hidden">
            <Image
              src={data.img}
              alt="body-type"
              width={130}
              height={450}
              objectFit="cover"
              className={MainStyles.roundedcustomfull}
            />
          </div>
          <div
            className={`${MainStyles.customThumbNailContainer} relative hidden md:block`}
            style={{
              minHeight: '412px',
              background: `url('${data.img}')  no-repeat center`,
            }}
          >
            <div style={{}} className={MainStyles.customThumbNail} />
          </div>
          <div
            className={`absolute ${MainStyles.customThumbTitle} ${MainStyles.customFirstTitle}`}
          >
            <h1
              className="rotate-90 md:rotate-0 md:mt-40 md:ml-4 md:text-2xl md:w-full md:pt-14 font-tanpearl"
              style={{ color: '#f8eee4' }}
            >
              {data.title}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

// Button
const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot ${selected ? 'is-selected' : ''}`}
    type="button"
    onClick={onClick}
  />
);

const dataSource = [
  {
    img: '/images/4/Body Type.png',
    title: 'Body Constitution',
    content:
      'Discover your unique body through our assessment. Learn how to attend to its needs for greater wellbeing!',
    link: '/body-type',
  },
  {
    img: '/images/4/image 2.png',
    title: 'Body Recovery',
    content:
      'Feeling stressed or losing sleep? Activate self-healing and get lasting relief from common ailments.',
    link: '/body-recovery',
  },
  {
    img: '/images/4/image 4.png',
    title: 'Guided Practices',
    content:
      'Access expert-guided practices and get support for your physical, mental and emotional wellness journey.',
    link: '/guidedpractice',
  },
  {
    img: '/images/4/Body Type.png',
    title: 'Body Constitution',
    content:
      'Discover your unique body through our assessment. Learn how to attend to its needs for greater wellbeing!',
    link: '/body-type',
  },
  {
    img: '/images/4/image 2.png',
    title: 'Body Recovery',
    content:
      'Feeling stressed or losing sleep? Activate self-healing and get lasting relief from common ailments.',
    link: '/body-recovery',
  },
  {
    img: '/images/4/image 4.png',
    title: 'Guided Practices',
    content:
      'Access expert-guided practices and get support for your physical, mental and emotional wellness journey.',
    link: '/guidedpractice',
  },
];

function MainImageSlider() {
  const [viewportRef, embla] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <div className="embla mb-14 md:mb-16">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {dataSource.map((item, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <CardContent
                    data={item}
                    active={
                      selectedIndex === index ||
                      index === selectedIndex - 1 ||
                      (selectedIndex === 0 && index === dataSource.length - 1)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Content() {
  const checkLoggedIn = async () => {
    const tokenStorage = await localStorage.getItem(StorageName);
    if (
      tokenStorage !== null &&
      validateTimeExpired(JSON.parse(tokenStorage).expired)
    ) {
      localStorage.clear();
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <>
      <div className="mb-4 mt-6 container">
        <div className="md:flex md:flex-row mb-20 md:mb-28 -mt-10 md:mt-0">
          <span style={{ marginLeft: '-15px' }}>
            <div
              style={{
                background: `url('/images/4/14.png') no-repeat center`,
              }}
              width={80}
              alt=""
            />
          </span>
          <div className="md:ml-7">
            <h1 className={`${MainStyles.head1} font-tanpearl`}>Welcome!</h1>
            <div className={MainStyles.head2}>
              How would you like to get started?
            </div>
          </div>
        </div>
        <MainImageSlider />
      </div>
    </>
  );
}

export default function Main() {
  return (
    <>
      <div className={MainStyles.container}>
        <Navbar />
        <Content />
        <MBFooter />
        <Footer />
      </div>
    </>
  );
}
