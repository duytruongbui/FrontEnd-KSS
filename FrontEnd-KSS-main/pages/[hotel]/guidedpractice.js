import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import Navbar, { FooterAll } from './navbar';
import styles from '../../styles/guidedpractice.module.css';
import api from '../api';
import { UserDataKey } from '../../common/constant';

export default () => {
  const [isMobile, setIsMobile] = useState(true);
  const [selected, setSelected] = useState(-1);
  const [user, setUser] = useState({});

  const isMobileMediaQuery = useMediaQuery({ query: `(max-width: 768px)` });
  useEffect(() => {
    setIsMobile(isMobileMediaQuery);
  }, [isMobileMediaQuery]);
  useEffect(() => {
    const userData =
      JSON.parse(localStorage.getItem(UserDataKey) || '{}') || {};
    setUser(userData);
  }, []);

  return (
    <div className={styles.contain}>
      <div className={styles.content}>
        <Navbar />
        <div className={`container ${styles.container}`}>
          <div className="flex flex-row">
            <img
              src={'/images/guidedpractice/couple-icon.svg'}
              alt="couple-icon"
              className={'hidden sm:block'}
            />
            <div className="ml-8 hidden sm:block">
              <p
                className={`${styles.welcomeText} ${
                  isMobile ? 'font-tanpearl' : 'font-tenor'
                } `}
              >
                Welcome back
                <span className="font-tanpearl">
                  {user?.firstName ? `, ${user?.firstName}` : ''}!
                </span>
              </p>
              <p className={`${styles.welcomeText} font-tenor`}>
                Here're some guided practices to support your wellness journey!
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:hidden">
            <img
              src={'/images/guidedpractice/couple-icon.svg'}
              alt="couple-icon"
              className={'w-20 h-20'}
            />
            <div>
              <p className={`${styles.welcomeText} font-tanpearl mt-8`}>
                Welcome
                <span>{user?.firstName ? `, ${user?.firstName}` : ''}!</span>
              </p>
              <p className={`${styles.welcomeTextDetail} font-tenor`}>
                Here’re some guided practices to support your wellness journey!
              </p>
            </div>
          </div>
        </div>
        {isMobile && (
          <div
            className={`${styles.container} container mt-4 md:mt-16 md:flex pr-0`}
          >
            <ButtonLeft selected={selected} setSelected={setSelected} />
          </div>
        )}
        <div className={`${styles.container} container mt-0 md:mt-16 md:flex`}>
          {!isMobile && (
            <ButtonLeft selected={selected} setSelected={setSelected} />
          )}
          <CartItems selected={selected} />
        </div>
        <FooterAll />
      </div>
    </div>
  );
};

const buttonOptionInit = { id: -1, label: 'All' };

const ButtonLeft = ({ selected, setSelected }) => {
  const [buttonOptionList, setButtonOptionList] = useState([]);

  useEffect(() => {
    const init = async () => {
      const res = await api.guidePractice.getType();
      const _buttonOptionList = [
        buttonOptionInit,
        ...res?.data?.map((item) => ({
          id: item.id,
          label: item.name,
        })),
      ];
      setButtonOptionList(_buttonOptionList);
    };
    init();
  }, []);
  return (
    <div
      className={`flex flex-row md:flex-col pr-0 md:pr-9 overflow-scroll md:overflow-visible no-scrollbar`}
    >
      {buttonOptionList.map((item, index) => (
        <button
          key={index}
          onClick={() => setSelected(item.id)}
          className={`${item.id === selected ? 'greenbtn' : 'optionBtn'} ${
            styles.capitalize
          } ${styles.pt1} mb-4 pl-3 pr-3 mr-2 h-[30px] md:mr-0 max-w-[188px] `}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

const CartItems = ({ selected }) => {
  const pageSize = 9;
  const [cardData, setCardData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCountBE, setTotalCountBe] = useState(0);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);
  const isMobileMediaQuery = useMediaQuery({ query: `(max-width: 768px)` });

  const handleScroll = async (event) => {
    let _pageNumber = event?.reset ? 1 : pageNumber;
    const req = {
      asc: false,
      pageNumber: _pageNumber,
      pageSize: pageSize,
      sort: 'create_time',
    };
    if (selected && selected !== -1) {
      req.guidedPracticesTypeId = selected;
    }
    const res = await api.guidePractice.queryPage(req);
    console.log(res);
    if (_pageNumber === 1) {
      setCardData([
        ...res?.data?.list?.map((item) => ({
          id: item?.id,
          head: item?.teacherFullName,
          body: item?.guidedPracticesName,
          foot: item?.teacherFullName,
          bgImg: `url('${item?.guidedPracticesImage}')`,
        })),
      ]);
    } else {
      setCardData([
        ...cardData,
        ...res?.data?.list?.map((item) => ({
          id: item?.id,
          head: item?.teacherFullName,
          body: item?.guidedPracticesName,
          foot: item?.teacherFullName,
          bgImg: `url('${item?.guidedPracticesImage}')`,
        })),
      ]);
    }
    setTotalCountBe(parseInt(res?.data?.totalCount));
    setPageNumber(++_pageNumber);
  };

  useEffect(() => {
    setIsMobile(isMobileMediaQuery);
  }, [isMobileMediaQuery]);

  useEffect(() => {
    setTotalCountBe(0);
    setCardData([]);
    setPageNumber(1);
    handleScroll({ reset: true });
  }, [selected]);

  return (
    <div className="flex flex-wrap md:ml-3 w-full mb-10 mt-1">
      {cardData?.map((item, index) => (
        <div
          key={index}
          className="w-full mobile:w-1/2 md:w-1/3 lg:w-1/3 px-[5px]"
        >
          {isMobile ? (
            <div
              className={`py-3 rounded-lg rounded-bl-box shadow-lg mb-[10px] px-2 bg-milk min-h-box flex flex-col bg-cover ${
                index % 2 === 0 ? 'mr-[5px]' : 'ml-[5px]'
              }`}
              onClick={() =>
                router.push({
                  pathname: '/' + router.query.hotel + `/guidedpracticedetail`,
                  query: { ...router.query, guidedPracticeId: item?.id },
                })
              }
              style={{
                backgroundImage: item.bgImg,
              }}
            >
              <div className="flex-1">
                <div className={styles.headCard}>
                  <p className="font-tenor">{item.head}</p>
                </div>
                <div className={`${styles.bodyCard} text-xl mt-4`}>
                  <p className="font-tenor leading-[18.5px]">{item.body}</p>
                </div>
              </div>
              <div className={`${styles.footCard} text-right`}>
                <p className="font-tenor">{item.foot}</p>
              </div>
            </div>
          ) : (
            <div
              className="py-3 rounded-lg rounded-bl-box shadow-lg md:mx-2 mb-4 mobile:mb-[10px] px-6 bg-milk min-h-box flex flex-col bg-cover"
              onClick={() =>
                router.push({
                  pathname: '/' + router.query.hotel + `/guidedpracticedetail`,
                  query: { ...router.query, guidedPracticeId: item?.id },
                })
              }
              style={{
                backgroundImage: item.bgImg,
              }}
            >
              <div className="flex-1">
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
          )}
        </div>
      ))}
      {(pageNumber - 1) * pageSize < totalCountBE && (
        <div className="w-full flex justify-center">
          <button
            onClick={debounce(handleScroll, 500)}
            className={`greenbtn ${styles.capitalize} ${styles.pt1} mb-4 pl-3 pr-3 mr-2 h-[30px] md:mr-0 max-w-[188px] `}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};
