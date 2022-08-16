import styles from '../../../styles/28.module.css';
import Image from 'next/image';
import Navbar, { MBFooter, Footer } from '../navbar';
import { useState, useEffect, useCallback } from 'react';
import api from '../../api';
import useEmblaCarousel from 'embla-carousel-react';
import EmblaStyles from '../../../styles/embla.module.css';
import { DotButton } from '../../../components/EmblaCarouselButtons';

const ourPromises = [
  [
    'Curated for the unique you',
    "Our bodies are different so are our wellness journeys. Kanpobliss curates personalized recommendations catered to your body's unique needs and goals, helping you define your own path towards greater wellbeing.",
    '/images/28/promise1.png',
  ],
  [
    'Care for the holistic self',
    'Drawing from the wisdom of Traditional Chinese Medicine and knowledge of modern science, we care for your mind and body as whole, and appreciate their intricate connections with your surroundings.',
    '/images/28/promise2.png',
  ],
  [
    'Empower your innate ability to heal and grow',
    'Together with our multidisciplinary team of health and wellness experts, our goal is to impart you with insights and knowledge, to guide you in building habits that support personal healing and growth.',
    '/images/28/promise3.png',
  ],
];

const founder = [
  {
    url: '/images/28/fd1.png',
    name: 'Jun Negoro',
    sub: 'Co-founder',
    text: 'Jun is a registered TCM Physician in Singapore since 2013, specializing in women’s health, digestive health and stress related conditions. Trained in Biomedical Science and Traditional Chinese Medicine, Jun brings a holistic approach to health and wellbeing, advocating for preventative health and treating the root cause beyond managing the symptoms. Jun holds a joint-BA from NTU and Beijing University of Chinese Medicine. Besides her years of clinical experience, she also has the rare ability to translate complex TCM concepts into actionable recommendations relevant for the modern lifestyles.',
  },
  {
    url: '/images/28/fd2.png',
    name: 'Summer Song',
    sub: 'Co-founder',
    text: 'Summer brings over 10 years of experience in the people and culture space, across different industries from professional services to healthcare. Prior to creating wellness experiences and retreats, Summer was consulting Fortune 500 companies in people strategy and organizational transformations. She is passionate about sharing Asia’s time-tested wellness traditions to inspire a more conscious and holistic way of living. Summer holds a BA in Economics & International Relations from University of Toronto and MA in Social-Organizational Psychology from Columbia University. ',
  },
];

const tempExperts = [
  {
    url: '/images/28/teach1.png',
    name: 'Fraser Lau',
    role: 'Qigong Teacher',
  },
  {
    url: '/images/28/teach2.png',
    name: 'Dr. Cheryl Kam',
    role: 'Functional Medicine Coach',
  },
  {
    url: '/images/28/teach3.png',
    name: 'Amanda Ling',
    role: 'Sound Practitioner, Yoga Teacher',
  },
];

const tempExpertsMobile = [
  {
    url: '/images/28/teach1-mobile.png',
    name: 'Fraser Lau',
    role: 'Qigong Teacher',
  },
  {
    url: '/images/28/teach2-mobile.png',
    name: 'Dr. Cheryl Kam',
    role: 'Functional Medicine Coach',
  },
];

const FirstHeader = ({ data }) => {
  return (
    <>
      <h1 className="md:text-center md:text-[32px] tablet:text-2xl nearwhite leading-[45px] mobile:leading-[34px] font-tanpearl">
        {data}
      </h1>
    </>
  );
};

export default function Content28() {
  const [experts, setExperts] = useState(tempExperts);
  const [expertsMobile, setExpertsMobile] = useState(tempExpertsMobile);
  const [feedbackData, setFeedbackData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
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
  }, [embla, setScrollSnaps, onSelect, feedbackData]);

  const [viewportRef2, embla2] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [scrollSnaps2, setScrollSnaps2] = useState([]);
  const onSelect2 = useCallback(() => {
    if (!embla2) return;
    setSelectedIndex2(embla2.selectedScrollSnap());
  }, [embla2, setSelectedIndex2]);
  useEffect(() => {
    if (!embla2) return;
    onSelect2();
    setScrollSnaps2(embla2.scrollSnapList());
    embla2.on('select', onSelect2);
  }, [embla2, setScrollSnaps, onSelect2]);

  useEffect(() => {
    const getFeedback = async () => {
      const res = await api.feedback.queryFeedback();
      if (res.data == null) {
        return;
      }
      setFeedbackData(res.data);
    };
    const getTeachers = async () => {
      const queryPage = await api.guidePractice.queryPage({
        asc: false,
        pageNumber: 1,
        pageSize: 200,
        sort: 'create_time',
      });
      if (queryPage?.data == null) {
        return;
      }
      const teacherList = await Promise.all(
        (queryPage?.data?.list || []).map((item) =>
          api.guidePractice.getInfo(item.id)
        )
      );
      console.log('getTeachers', teacherList);
      setExperts(
        teacherList.map((teacher) => ({
          url: teacher.data.teacherAvatar,
          name: teacher.data.teacherFullName,
          role: teacher.data.typeName,
        }))
      );
      setExpertsMobile(
        teacherList.map((teacher) => ({
          url: teacher.data.teacherAvatar,
          name: teacher.data.teacherFullName,
          role: teacher.data.typeName,
        }))
      );
    };
    getFeedback();
    getTeachers();
  }, []);
  return (
    <div>
      <div>
        <div className={styles.coverimg}>
          <div className={styles.contentcover}>
            <Navbar showBackButton />
            <img
              src="/images/Logo.svg"
              className="hidden mobile:block w-[251px] h-16 mx-auto mt-[88px]"
            />
          </div>
          <Image
            src="/images/28/bg1.png"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        </div>
      </div>
      <div className={styles.container} style={{ background: '#A56C50' }}>
        <div className="container mx-auto py-8 tablet:pt-[25px] tablet:pb-[35px]">
          <div className="">
            <FirstHeader data="Our Story" />
            <p className="nearwhite md:text-center mt-[14px] tablet:py-0 md:text-base tablet:text-xs tablet:leading-[14px] md:leading-[19px] py-3">
              Kanpobliss started as a self-care blog back in 2019 by TCM
              physician Jun Negoro with a simple intention - to empower
              self-care through bite-size insights from TCM’s philosophy of life
              and living. Soon after, the blog turned into a mobile app, and
              over the course of two years Kanpobliss drew hundreds of thousands
              of downloads, readership and social media following.
              <br /> <br />
              As the ongoing pandemic accelerated the awareness of and the
              demand for holistic wellness, in 2021, Jun began partnering with
              Summer Song, an experience creator, to develop Singapore’s first
              holistic wellness retreats at high- end wellness-centric hotels.
              Anchored in the TCM holistic and personalized approach to health
              and wellbeing, the team pioneered personalized food and drinks
              menu and an array of wellness experiences catered to guests’
              different body constitutions and wellness goals.
              <br /> <br /> Today, Kanpobliss has evolved beyond a TCM
              educational platform. Through a deeper collaboration with hotel
              partners, Kanpobliss offers hotel guests a comprehensive wellness
              experience during their stay. Through in-depth analyses of guests’
              unique body constitution and/or current wellness goals, Kanpobliss
              curates personalized recommendations from dining and spa to
              fitness and self-care rituals. Just like a personal TCM wellness
              coach, Kanpobliss helps each guest deepen their wellness journey,
              and feel their best physically, emotionally and mentally.
            </p>
          </div>
        </div>
      </div>

      <div style={{ background: '#B99173' }}>
        <div className="container mx-auto pt-[45px] pb-20 tablet:pt-[19px] tablet:pb-9">
          <FirstHeader data="Our Promise" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mt-[29px] tablet:gap-3">
            {ourPromises.map((el, index) => (
              <div
                key={index}
                className={
                  index % 2 == 0
                    ? 'flex flex-row md:flex-col'
                    : 'flex flex-row-reverse md:flex-col'
                }
              >
                <div
                  className={`md:w-full w-96 relative h-[311px] tablet:h-[120px] tablet:min-w-[82px]  ${
                    index === 1 ? 'tablet:ml-3' : 'tablet:mr-3'
                  }`}
                >
                  <Image
                    src={el[2]}
                    layout="fill"
                    objectFit="cover"
                    className={'rounded-sm-bl'}
                    alt=""
                  />
                </div>
                <div className="nearwhite md:mt-[27px] tablet:flex tablet:flex-col tablet:justify-center ">
                  <h3 className="text-xl md:text-2xl md:leading-7 tablet:text-base tablet:leading-[19px]">
                    {el[0]}
                  </h3>
                  <p className="text-xs md:text-base mt-7 tablet:mt-3 tablet:leading-[14px]">
                    {el[1]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.coverimgpd}>
        <Image
          src="/images/28/bg2.png"
          alt=""
          layout="fill"
          objectFit="cover"
        />
        {feedbackData.length ? (
          <>
            <div className="embla">
              <div className="embla__viewport pb-10" ref={viewportRef}>
                <div className="flex">
                  {feedbackData.map((feedback, i) => (
                    <div
                      key={i}
                      className={`h-[400px] tablet:h-[220px] md:mt-0 relative z-10 min-w-[100vw] shrink-0`}
                    >
                      <div className="container mx-auto md:pt-[53px] px-[15px] tablet:pt-[26px]">
                        <div className="text-center text-base md:text-3xl md:leading-[35px] text-white md:py-[10px] tablet:text-sm tablet:leading-4">
                          {feedback.content}
                        </div>
                        <div className="relative h-[2px] w-full tablet:mt-4 md:mt-[30px] tablet:mb-[6px] md:mb-5 flex justify-center">
                          <div
                            className="w-[88px] tablet:w-[23px]"
                            style={{ background: '#A56C50' }}
                          />
                        </div>
                        <h1 className="text-center text-3xl text-white font-tanpearl tablet:text-sm">
                          {feedback.fullName}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="embla__dots -mt-[72px] pb-10 w-full ">
              <div
                className={`${EmblaStyles.embla__dots} w-full overflow-hidden`}
              >
                {scrollSnaps.slice(0, 6).map((_, index) => (
                  <DotButton
                    key={index}
                    style={{
                      height: 10,
                      width: 30,
                      margin: 5,
                    }}
                    selected={index === selectedIndex % 6}
                  />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div style={{ background: '#B99173' }}>
        <div className="container pt-[45px] pb-[38px] tablet:pb-[11px] px-0 tablet:px-[23px] tablet:pt-[26px]">
          <FirstHeader data="Our Founders" />
          <div className="flex flex-col mt-[37px] tablet:mt-[21px]">
            {founder.map((el, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:mb-[45px] "
              >
                <div className="hidden md:relative md:block w-[188px] h-[194px] md:mr-[26px] flex-shrink-0">
                  <Image src={el.url} alt="" layout="fill" objectFit="cover" />
                </div>
                <div className="nearwhite flex flex-col justify-center tablet:mb-5">
                  <div className="flex flex-row">
                    <div className="relative md:hidden w-[50px] h-[50px] mr-2">
                      <Image
                        src={el.url}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h1 className="text-base mt-1 md:text-2xl md:leading-[30px] font-tanpearl">
                        {el.name}
                      </h1>
                      <h3 className="text-xl leading-[17px] my-3 tablet:my-0 tablet:text-sm">
                        {el.sub}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <p className="pt-2 tablet:pt-3 pr-8 text-sm md:text-base md:leading-[18px] tablet:leading-[14px]">
                      {el.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: '#A56C50' }}>
        <div className="container mx-auto pb-[67px] pt-12 tablet:pt-6 tablet:p-6">
          <div className="md:text-center">
            <FirstHeader data="Our Experts" />
            <div className="embla">
              <div className="embla__viewport" ref={viewportRef2}>
                <div className="flex text-center md:mt-[37px] tablet:mt-[19px]">
                  {experts.map((expert, i) => (
                    <div key={i} className="p-x min-w-[34%] tablet:min-w-[50%]">
                      <div className="relative h-[235px] w-[235px] rounded-full overflow-hidden tablet:h-[100px] tablet:w-[100px] mx-auto tablet:rounded-t-[5px] tablet:rounded-br-[5px] tablet:rounded-bl-[20px]">
                        <Image
                          src={expert.url}
                          layout="fill"
                          objectFit="scale-down"
                          alt=""
                        />
                      </div>
                      <div className="pt-[26px] pb-4 nearwhite tablet:pt-[11px]">
                        <h1 className="text-sm md:text-2xl h-[23px] tablet:h-[19px] mb-3 font-tanpearl">
                          {expert.name}
                        </h1>

                        <p className="text-base leading-[18px] tablet:text-xs tablet:leading-[14px]">
                          {expert.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative h-2 tablet:h-1 w-full tablet:mt-[0px]">
              <div className={`${EmblaStyles.embla__dots}`}>
                {scrollSnaps2.map((_, index) => (
                  <DotButton
                    key={index}
                    className="h-[10px] w-[30px] m-[5px] tablet:h-[4px] tablet:w-[10px] tablet:mx-[5px] overflow-hidden rounded-full"
                    selected={index === selectedIndex2}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tablet:bg-mediumBrown">
        <MBFooter noDefaultColor />
      </div>
      <Footer />
    </div>
  );
}
