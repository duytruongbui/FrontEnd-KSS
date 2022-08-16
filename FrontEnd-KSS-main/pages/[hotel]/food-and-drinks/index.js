import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
/* Change Fetch API */
import api from '../../api';
import styles from '../../../styles/18.module.css';
import Navbar, { Footer, MBFooter } from '../navbar';
import { HotelID } from '../../../common/constant';
import { setHotelId, getHotelId } from './../../../common/utils';

const NUMBER_LOAD = 9;

export default function () {
  const [list_res, setListRes] = useState([]);
  const [list_dis, setListDis] = useState([]);
  const [mantraId, setMantraId] = useState(0);
  const [placeId, setPlaceId] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [currentTab, setCurrentTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    let defaultDish = {
      mantraId: mantraId,
      hotelId: hotel,
      placeId: placeId,
      pageNumber: nextPage,
    };
    onFetchDish(defaultDish);
  };

  const router = useRouter();
  const Mantra = router.query.Mantra;
  const placeRouteId = router.query.placeId;
  const placeRouteName = router.query.placeName;

  useEffect(() => {
    const hotel = getHotelId();
    setPlaceId(placeRouteId);
    setHotel(hotel);
    setCurrentTab(placeRouteName);
    console.log("placeName",placeRouteName??"All");
    onFetch(hotel,placeRouteId);
  }, [Mantra, placeRouteId]);

  const onFetch = (hotel,placeId) => {
    onFetchRestaurant(hotel,placeId);
  };

  const onFetchRestaurant = async (hotel, placeId = null) => {
    let params = { hotelId: hotel };
    const mantraData = await api.mantra.obtainMantraDetails(Mantra);
    if (mantraData.code === 0) {
      const detailMantra = mantraData.data;
      params.mantraId = detailMantra.id;
      setMantraId(detailMantra.id);
    }

    const result = await api.foodAndDrinks.queryPlaceList(params);
    if (result.code === 0) {
      setListRes(result.data);
    }

    let defaultDish = {
      ...params,
      placeId: placeId || '',
      pageNumber: 1,
    };
    onFetchDish(defaultDish);
  };

  const onFetchDish = async (data) => {
    const paramsDis = {
      hotelId: data.hotelId,
      mantraId: data.mantraId,
      placeId: data.placeId,
      pageSize: NUMBER_LOAD,
      pageNumber: data.pageNumber,
    };
    const resultDis = await api.foodAndDrinks.queryFoodAndDrinksPage(paramsDis);

    if (resultDis.code === 0) {
      setCurrentPage(data.pageNumber);
      setTotalPage(resultDis.data.totalPage);
      setListDis((list_dis) => [...list_dis, ...resultDis.data.list]);
    }
  };

  const ChangePlace = async (item) => {
    // if(item){
    setPlaceId(item?.id ?? null);
    setCurrentTab(item?.placeName ?? 'All');
    setCurrentPage(1);
    setListDis([]);
    onFetchRestaurant(hotel, item?.id ?? null);

    // }
    // const resultDrinkFood = await api.foodAndDrinks.queryFoodAndDrinksPage()
  };

  return (
    <>
      <div className={styles.containbox}>
        <Navbar />
        <div className="container mt-3">
          <div className="items-center mb-[42px] mobile:mb-4 md:flex md:flex-row ">
            <div className="bg-milk bg-opacity-50 rounded-full flex items-center justify-center w-[140px] h-[140px] mobile:w-[100px] mobile:h-[100px] mobile:mb-3">
              <img
                src={'/images/icon/' + Mantra + '.png'}
                alt="logo-18"
                className="object-contain max-w-[56%] max-h-[56%]"
              />
            </div>
            <div className="max-w-sm md:mx-4">
              <span className="text-white text-3xl mobile:text-[28px] md:leading-normal mobile:leading-[32px]">
                Food & drinks best suited for{' '}
              </span>
              <span className="font-tanpearl text-white text-2xl mobile:text-[28px] mobile:leading-[38px]">
                {Mantra}
              </span>
            </div>
          </div>
          <div className="md:flex">
            <div className={`flex mobile:block white-space-nowrap sm:flex-row md:flex-col mobile:overflow-x-scroll mobile:mb-2 mobile:-mr-5 ${styles.customScroll}`}>
              <button
                className={
                  currentTab === 'All'
                    ? 'bg-green px-4 mobile:mr-2 md:px-8 rounded-full mb-3 h-[30px] w-[190px] mobile:w-[190px]'
                    : 'bg-main px-4 mobile:mr-2 md:px-8 rounded-full border border-white mb-3 h-[30px] w-[190px] mobile:w-[190px]'
                }
                onClick={() => {
                  ChangePlace(null);
                }}
              >
                <span className="font-tenor text-base text-white">All</span>
              </button>
              {list_res.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={
                      currentTab === item.placeName
                        ? 'bg-green px-4 mobile:mr-2 sm:mr-2 md:px-8 rounded-full mb-3 h-[30px] w-[190px] mobile:w-[190px]'
                        : 'bg-main px-4 mobile:mr-2 md:px-8 rounded-full border h-[30px] border-white mb-3 w-[190px] mobile:w-[190px]'
                    }
                    onClick={() => {
                      ChangePlace(item);
                    }}
                  >
                    <span className="font-tenor text-base text-white">
                      {item.placeName}
                    </span>
                  </button>
                );
              })}
            </div>
            {isMobile ? (
              <>
                <div className="flex mobile:block mobile:float-left flex-wrap md:ml-3 w-full mb-10">
                  <div
                    className="w-full mobile:float-left mobile:w-1/2 md:w-1/3 lg:w-1/3 px-[5px]">
                    {list_dis.map((item, index) => (
                      (index % 2 == 0 && item.goodsLabel) && (
                        <div
                          className={
                            index % 2 === 0
                              ? 'py-3 rounded-lg rounded-bl-box mb-[10px] mobile:mb-[20px] mr-[5px] px-6 bg-milk min-h-box flex flex-col'
                              : 'py-3 rounded-lg rounded-bl-box mb-[10px] mobile:mb-[20px] ml-[5px] px-6 bg-milk min-h-box flex flex-col'
                          }
                          onClick={() =>
                            router.push({
                              pathname:
                                '/' +
                                router.query.hotel +
                                `/food-and-drinks/${item.id}`,
                              query: router.query,
                            })
                          }
                        >
                          <div className="flex-1">
                            <h3 className="font-tenor md:text-xl mobile:text-sm text-brown border-b border-b-brown max-w-3/4">{`${item.placeName}`}</h3>
                            <h3 className="font-tenor md:text-xl mobile:text-[16px] text font-normal text-footer my-4 mobile:mb-[10px]">
                              {item.goodsName}
                            </h3>
                            <h3 className="font-tenor md:text-base mobile:text-[10px] text-brown">
                              <div className="">{`${item.goodsLabel}`}</div>
                            </h3>
                          </div>
                          <h3 className="font-tenor md:text-xl mobile:text-base text-brown text-right">{`S$ ${item.goodsPrice}`}</h3>
                        </div>
                      )

                    ))}
                  </div>
                  <div
                    className="w-full mobile:float-left mobile:w-1/2 md:w-1/3 lg:w-1/3 px-[5px]">
                    {list_dis.map((item, index) => (
                      (index % 2 == 1 && item.goodsLabel)  && (
                        <div
                          className={
                            index % 2 === 0
                              ? 'py-3 rounded-lg rounded-bl-box mb-[10px] mobile:mb-[20px] mr-[5px] px-6 bg-milk min-h-box flex flex-col'
                              : 'py-3 rounded-lg rounded-bl-box mb-[10px] mobile:mb-[20px] ml-[5px] px-6 bg-milk min-h-box flex flex-col'
                          }
                          onClick={() =>
                            router.push({
                              pathname:
                                '/' +
                                router.query.hotel +
                                `/food-and-drinks/${item.id}`,
                              query: router.query,
                            })
                          }
                        >
                          <div className="flex-1">
                            <h3 className="font-tenor md:text-xl mobile:text-sm text-brown border-b border-b-brown max-w-3/4">{`${item.placeName}`}</h3>
                            <h3 className="font-tenor md:text-xl mobile:text-[16px] text font-normal text-footer my-4 mobile:mb-[10px]">
                              {item.goodsName}
                            </h3>
                            <h3 className="font-tenor md:text-base mobile:text-[10px] text-brown">
                              <div className="">{`${item.goodsLabel}`}</div>
                            </h3>
                          </div>
                          <h3 className="font-tenor md:text-xl mobile:text-base text-brown text-right">{`S$ ${item.goodsPrice}`}</h3>
                        </div>
                      )

                    ))}
                  </div>
                  {currentPage < totalPage && (
                    <button className="px-5 mx-auto mb-10" onClick={handleLoadMore}>
                      <a className="font-tenor text-base text-white text-center">
                        Load More
                    </a>
                    </button>
                  )}        
                </div>
              </>
            ) : (
              <div className="flex mobile:block mobile:float-left flex-wrap md:ml-3 w-full mb-10">

                {list_dis.map((item, index) => (

                  (item.goodsLabel) && (
                    <div
                      key={index}
                      className="w-full mobile:float-left mobile:w-1/2 md:w-1/3 lg:w-1/3 px-[5px]"
                    >

                      <div
                        className="py-3 rounded-lg rounded-bl-box shadow-lg md:mx-2 mb-4 mobile:mb-[10px] px-6 bg-milk min-h-box flex flex-col"
                        onClick={() =>
                          router.push({
                            pathname:
                              '/' +
                              router.query.hotel +
                              `/food-and-drinks/${item.id}`,
                            query: router.query,
                          })
                        }
                      >
                        <div className="flex-1">
                          <h3 className="font-tenor text-xl text-brown border-b border-b-brown max-w-3/4">{`${item.placeName}`}</h3>
                          <h3 className="font-tenor text-xl text font-normal text-footer my-4 mobile:mb-[10px]">
                            {item.goodsName}
                          </h3>
                          <h3 className="font-tenor text-base text-brown">
                            {item.goodsLabel}
                          </h3>
                        </div>
                        <h3 className="font-tenor text-xl text-brown text-right">{`$ ${item.goodsPrice}`}</h3>
                      </div>

                    </div>
                  )))}
                {currentPage < totalPage && (
                  <button className="px-5 mx-auto mb-10" onClick={handleLoadMore}>
                    <a className="font-tenor text-base text-white text-center">
                      Load More
                  </a>
                  </button>
                )}
              </div>

            )}
          </div>
        </div>
        <MBFooter />
        <div className="relative">
          <Footer />
        </div>
      </div>
    </>
  );
}
