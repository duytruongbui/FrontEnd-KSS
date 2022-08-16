import styles from '../../../styles/2245.module.css';
import Image from 'next/image';
import Navbar, { MBFooter, Footer } from '../navbar';
import Link from 'next/link';
import React, { useState, useEffect, Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import FeedbackModal from '../../../components/FeedbackModal';
import api from '../../api';
import { getMantraFromQueryString } from '../../../common/utils';

export default function Content22() {
  const router = useRouter();
  const Mantra = router.query.Mantra;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [selfCareData, setSelfCareData] = useState([]);
  const getSelfCareData = async (mantra) => {
    const mantraDetail = await api.mantra.obtainMantraDetails(mantra);
    if (mantraDetail.data == null) {
      return;
    }
    const res = await api.mantraSelfCare.pagingToQuerySelfCareOfCertain({
      asc: false,
      mantraId: mantraDetail.data.id,
      pageNumber: 1,
      pageSize: 100,
      sort: 'create_time',
    });
    setSelfCareData(res.data.list);
    return res;
  };
  useEffect(() => {
    const mantra = getMantraFromQueryString();
    getSelfCareData(mantra);
  }, [router.query]);
  return (
    <div>
      <div>
        <div className={styles.coverimg}>
          <div className={styles.contentcover}>
            <Navbar isNoPadding showBackButton={isTabletOrMobile} />
            <div className="container px-0 mx-auto md:mt-[170px] mt-[67px] flex justify-between">
              <div className="px-4 h-10 text-[28px] md:text-[40px] text-white font-tenor leading-10 tablet:leading-[32px] tablet:mt-[5px]">
                Self care ritual for{' '}
                <span className="font-tanpearl tablet:leading-[60px]">
                  {Mantra}
                </span>
              </div>
              {/* <img
                src="/images/22/heart.svg"
                className="hidden tablet:block mr-10"
                width={38}
                height={33}
              /> */}
            </div>
          </div>
          <Image
            src={
              !isTabletOrMobile
                ? '/images/22/IMG_0442 1.png'
                : '/images/22/IMG_0442 2.png'
            }
            alt=""
            layout="fill"
            objectFit="fill"
            objectPosition="top"
            style={{
              marginTop: 38,
              mixBlendMode: 'multiply',
              height: 528,
            }}
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className="container mx-auto md:pt-20 pt-7 p-[18px]">
          {selfCareData.map((item, i) => (
            <Fragment key={i}>
              <div className="text-[32px] text-white pb-[22px] tablet:pb-[15px] leading-7 flex justify-between items-end tablet:text-base">
                {item.title}
              </div>
              <div className="flex md:flex-row gap-[87px] tablet:gap-[11px] tablet:items-center">
                <div className="relative flex-shrink-0 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt=""
                    width={576}
                    height={336}
                    style={
                      !isTabletOrMobile
                        ? { width: 576, height: 336 }
                        : { width: 131, height: 66, borderRadius: 10 }
                    }
                  />
                </div>
                <div className="text-white text-xs leading-[14px] hidden tablet:block break-words ">
                  {item.imageIntroduction}
                </div>

                <div className="text-white text-base pt-[35px] leading-[19px] tablet:hidden">
                  {item.imageIntroduction} <br /> <br />
                  <div
                    className="break-words marker:text-green"
                    dangerouslySetInnerHTML={{
                      __html: item.functionPoints?.replace(/&nbsp;/g, ' '),
                    }}
                  />
                  <br />
                  {item.videoIntroduction}
                  <Link
                    href={
                      '/' + router.query.hotel + `/recommend?Mantra=${Mantra}`
                    }
                  >
                    <div
                      className={`greenbtn mt-[29px] h-10 flex justify-center items-center ${
                        i != selfCareData.length - 1 ? 'hidden' : ''
                      }`}
                      style={{ fontSize: 14, width: 330 }}
                    >
                      All Recommendations
                    </div>
                  </Link>
                </div>
              </div>
              <div
                className="pr-0 list-disc marker:text-green marker:text-base text-xs mb-3 hidden tablet:block w-full text-white leading-[14px] break-words pt-1"
                dangerouslySetInnerHTML={{
                  __html: item.functionPoints?.replace(/&nbsp;/g, ' '),
                }}
              ></div>
              <div className="w-full h-[580px] tablet:h-[180px] relative mt-[43px] tablet:mt-0 mb-[68px] tablet:mb-3">
                <video
                  controls
                  src={item.videoUrl}
                  style={
                    !isTabletOrMobile
                      ? { height: 580, width: '100%' }
                      : { height: 180, width: '100%', borderRadius: 10 }
                  }
                />
              </div>
              <div className="hidden tablet:block text-xs text-white leading-[14px] mb-[26px]">
                {item.videoIntroduction}
              </div>
            </Fragment>
          ))}
          <Link href={`/${router.query.hotel}/recommend?Mantra=${Mantra}`}>
            <div className="hidden tablet:flex bg-green text-white rounded-full uppercase mt-[26px] w-full h-[30px] justify-center items-center text-sm">
              All Recommendations
            </div>
          </Link>
          {/* <div className="divider"></div>
          <div className="nearwhite">Other Recommendations</div>
          <div className="relative">
            <div className={styles.content5}>
              <div className={styles.card}>
                <Image
                  src="/images/19/Card5.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  className={styles.card}
                />
              </div>
              <div className={styles.card}>
                <Image
                  src="/images/19/Card6.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  className={styles.card}
                />
              </div>
            </div>
          </div> */}
        </div>
        <FeedbackModal
          onSubmit={() => {
            console.log('submit');
          }}
        />
        <MBFooter isNoPadding />
        <Footer isNoPadding />
      </div>
    </div>
  );
}
