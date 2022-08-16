import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar, { FooterAll } from './navbar';
import styles from '../../styles/guidedpracticedetail.module.css';
import { useMediaQuery } from 'react-responsive';
import api from '../api';

const bgGrass = `url('/images/guidedpracticedetail/grass.png')`;

export default () => {
  const [isShowAuthor, setShowAuthor] = useState(false);
  const router = useRouter();
  const [data, setData] = useState();
  useEffect(() => {
    const init = async () => {
      if (router?.query?.guidedPracticeId) {
        const res = await api.guidePractice.getInfo(
          router.query.guidedPracticeId
        );
        setData(res?.data);
      }
    };
    init();
  }, [router?.query?.guidedPracticeId]);
  return (
    <div className="">
      <div
        className={`${styles.contain} bg-black`}
        style={{
          backgroundImage: bgGrass,
        }}
      >
        <div className={styles.content}>
          <Navbar />
          <PlayVideoArea isShowAuthor={isShowAuthor} />
          <div className={`${styles.bodyContent} pt-5 md:pt-20`}>
            <div className="container">
              <AuthorArea
                isShowAuthor={isShowAuthor}
                setShowAuthor={setShowAuthor}
                data={data}
              />
              <CartItems data={data} />
            </div>
          </div>
          <FooterAll />
        </div>
      </div>
    </div>
  );
};

const PlayVideoArea = ({ isShowAuthor }) => {
  const router = useRouter();
  return (
    <div
      className={`${styles.playContainer} h-32 md:h-80 w-full flex items-center justify-center`}
    >
      {!isShowAuthor && (
        <img
          onClick={() =>
            router.push({
              pathname: '/' + router.query.hotel + `/soundGuided`,
              query: { ...router.query },
            })
          }
          src={'/images/guidedpracticedetail/play-btn.svg'}
          alt="play-btn"
          className="cursor-pointer h-10 w-10 md:h-20 md:w-20"
        />
      )}
    </div>
  );
};

const AuthorArea = ({ isShowAuthor, setShowAuthor, data }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [isMobileAndContent, setIsMobileAndContent] = useState(false);
  const [authorAreaData, setAuthorAreaData] = useState({});
  useEffect(() => {
    setIsMobileAndContent(isMobile && !isShowAuthor);
  }, [isShowAuthor]);

  useEffect(() => {
    console.log(data);
    if (data) {
      setAuthorAreaData({
        tutorialName: data.guidedPracticesName,
        authorName: data.teacherFullName,
        tutorialDetail: data.guidedPracticesDescription,
        authorDetail: data.guidedPracticesDescription,
        authorInsta: data.instagramUrl,
        authorFb: data.facebookUrl,
        authorWebsite: data.homepageUrl,
        authorAvatar: data.teacherAvatar,
      });
    }
  }, [data]);
  console.log(authorAreaData);
  return (
    <>
      <div className="flex justify-between">
        {!isShowAuthor && (
          <p className={`font-tanpearl text-2xl md:text-3xl text-white`}>
            {authorAreaData.tutorialName}
          </p>
        )}
        {/* <img
          className="hidden md:block"
          src={'/images/guidedpracticedetail/heart.svg'}
          alt="play-btn"
        /> */}
      </div>

      <div
        className={`flex items-center mt-8 cursor-pointer`}
        onClick={() => setShowAuthor(!isShowAuthor)}
      >
        <div
          className={`md:h-20 md:w-20 ${
            isMobileAndContent ? 'h-8 w-8' : 'h-16 w-16'
          } rounded-full flex justify-center items-center ${
            styles.authorAvatar
          }`}
          style={{
            backgroundImage: `url('${authorAreaData?.authorAvatar}')`,
          }}
        >
          {/* <span
            className={`${
              isMobileAndContent ? styles.textXxs : ''
            } font-tenor md:text-xl text-white`}
          >
            {authorAreaData.authorName}
          </span> */}
        </div>
        {isShowAuthor ? (
          <div className="ml-4">
            <p className={`${styles.authorName} font-tanpearl`}>
              {authorAreaData.authorName}
            </p>
            <div className="flex">
              <img
                src={'/images/guidedpracticedetail/insta.svg'}
                alt="insta"
                className="mr-2"
              />
              <img
                src={'/images/guidedpracticedetail/fb.svg'}
                alt="fb"
                className="mr-2"
              />
              <img src={'/images/guidedpracticedetail/site.svg'} alt="site" />
            </div>
          </div>
        ) : (
          <p className={`${styles.authorName} ml-2 md:ml-4`}>
            {authorAreaData.authorName}
          </p>
        )}
      </div>
      <div className="mt-7 pb-6 border-b-2 border-white font-tenor md:text-[20px]">
        <p className={styles.tutorialDetail}>
          {isShowAuthor
            ? authorAreaData.authorDetail
            : authorAreaData.tutorialDetail}
        </p>
      </div>
    </>
  );
};

const CartItems = ({ data }) => {
  const router = useRouter();
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    setCardData(
      data?.recommendGuidedPracticesList?.map((item) => ({
        id: item.id,
        head: item.typeName,
        body: item.guidedPracticesName,
        foot: item.teacherFullName,
        bgImg: `url('${item.guidedPracticesImage}')`,
      }))
    );
  }, [data]);
  return (
    <div className="pt-5 pb-10 md:pb-24">
      <p className={`${styles.cardTitle} font-tenor mb-5`}>
        Other guided practices by {data?.teacherFullName}
      </p>
      <div className="flex">
        {cardData?.map((item, index) => (
          <div
            onClick={() =>
              router.push({
                pathname: '/' + router.query.hotel + `/guidedpracticedetail`,
                query: { ...router.query, guidedPracticeId: item?.id },
              })
            }
            key={index}
            className={`rounded overflow-hidden mb-3 ${
              index % 2 === 0 ? 'mr-4' : 'mr-0'
            } ${styles.card}`}
            style={{
              backgroundImage: item.bgImg,
            }}
          >
            <div
              className={`${styles.opacityCard} p-3 md:px-6 md:py-4 flex flex-col justify-between`}
            >
              <div>
                <div className={styles.headCard}>
                  <p className="font-tenor">{item.head}</p>
                </div>
                <div className={`${styles.bodyCard} font-bold text-xl mt-4`}>
                  <p className="font-tenor">{item.body}</p>
                </div>
              </div>
              <div className={`${styles.footCard} text-right`}>
                <p className="font-tenor">{item.foot}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
