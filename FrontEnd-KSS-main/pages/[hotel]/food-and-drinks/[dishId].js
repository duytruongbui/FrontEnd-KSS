import Navbar, { MBFooter, Footer } from '../navbar';
import { useEffect, useState } from 'react';
import styles from '../../../styles/19.module.css';
import { useRouter } from 'next/router';
import LoadPageModal from '../../../components/LoadPageModal';
import api from '../../api';
import { getHotelId } from '../../../common/utils';

const DishDetail = () => {
  const router = useRouter();
  const { dishId } = router.query;
  const Mantra = router.query.Mantra;
  const [loading, setLoading] = useState(true);
  const [mantraId, setMantraId] = useState(0);
  const [detailFDrinks, setFDrinks] = useState({});

  useEffect(() => {
    // console.log("DisHiD",dishId);
    setLoading(true);
    onFetch();
  }, [dishId, Mantra]);

  const onFetch = () => {
    onFetchDetail();
  };

  const onFetchDetail = async () => {
    if (dishId && Mantra) {
      let params = { placeGoodsId: dishId };

      const mantraData = await api.mantra.obtainMantraDetails(Mantra);
      if (mantraData.code === 0) {
        const detailMantra = mantraData.data;
        params.mantraId = detailMantra.id;
        setMantraId(detailMantra.id);
      }

      //console.log("ParamsFetchDetail",params);
      const resultDetail = await api.foodAndDrinks.getFoodAndDrinksDetail(
        params
      );
      if (resultDetail.code === 0) {
        setFDrinks(resultDetail.data);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar showBackButton />
      <div className={`container ${styles.contain}`}>
        <div className={styles.box1}>
          {detailFDrinks && (
            <>
              <div className={styles.container1}>
                <div
                  className={`hidden tablet:block text-[28px] leading-[33px] mb-4 text-white w-full text-left`}
                >
                  {detailFDrinks?.goodsName}
                </div>
                <div className={styles.img1}>
                  <img src={detailFDrinks?.goodsImage} width="100%" />
                </div>
                <div
                  className={`${styles.content1} tablet:w-full tablet:text-left tablet:text-base tablet:leading-5`}
                >
                  <h1 className={`tablet:hidden ${styles.header1}`}>
                    {detailFDrinks.goodsName || ''}
                  </h1>
                  <h3 className={styles.text1}>
                    <div
                      className="break-words marker:text-green"
                      dangerouslySetInnerHTML={{
                        __html: detailFDrinks?.goodsDesc?.replace(/&nbsp;/g, ' ') || '',
                      }}
                    />
                    {/* {detailFDrinks?.goodsDesc || ""} */}
                  </h3>
                  {/* <ul
                    className={`${styles.ul} list-disc marker:text-green pl-1 marker:text-xs`}
                  >
                    <li className="tablet:leading-5">
                      Provi des immune support
                    </li>
                    <li className="tablet:leading-5">Clear phlegm</li>
                    <li className="tablet:leading-5">Stabilizes blood sugar</li>
                    <li className="tablet:leading-5">Prevents liver damage</li>
                  </ul> */}
                </div>
              </div>
              <div className={styles.container2}>
                <div className={styles.content2}>
                  <h1 className={styles.header2}>
                    Enjoy it at {detailFDrinks?.placeName}
                    <span className="ml-3 font-tanpearl leading-[44px]">
                      {/* {detailFDrinks?.placeDescription} */}
                    </span>
                  </h1>
                  <div
                    className={`hidden tablet:block mt-[14px] ${styles.img2}`}
                  >
                    <img src={detailFDrinks?.placeImage} width="100%" />
                  </div>
                  <h3 className={`${styles.text2} tablet:mb-5`}>
                    {detailFDrinks?.placeDescription}
                  </h3>
                  {Object.keys(detailFDrinks).length !== 0 && (
                    <button className={`tablet:hidden ${styles.book}`}>
                      BOOK A TABLE
                    </button>
                  )}
                  {Object.keys(detailFDrinks).length !== 0 && (
                    <button className={`hidden tablet:block ${styles.book}`}>
                      RESERVE A TABLE
                    </button>
                  )}
                </div>
                <div className={`tablet:hidden ${styles.img2}`}>
                  <img src={detailFDrinks?.placeImage} width="100%" />
                </div>
              </div>
            </>
          )}
        </div>
        <hr className={styles.HrWhite} />
        <div className={styles.box2}>
          <div className={styles.container3}>
            <h1 className={styles.header3}>Other recommended dishes</h1>
            {detailFDrinks?.recommendationsFoodAndDrinksList &&
              detailFDrinks?.recommendationsFoodAndDrinksList.length > 0 && (
                <div className={styles.content3}>
                  {detailFDrinks?.recommendationsFoodAndDrinksList.map(
                    (item, index) => (
                      <div
                        key={index}
                        className={styles.block}
                        onClick={() =>
                          router.push({
                            pathname:
                            '/' +
                              getHotelId() +
                              `/food-and-drinks/${item.id}`,
                              query: router.query,
                            })
                        }
                      >
                        <div>
                          <h3 className={styles.heading}>{item.placeName}</h3>
                          <h3 className={`${styles.text} short-description`}>
                            {item.goodsName}
                          </h3>
                          {/* <h3 className={styles.note}>{item.degoodsNamescription}</h3> */}
                          <h3 className="font-tenor md:text-base mobile:text-[10px] text-brown">
                            <div className="">{`${item.goodsLabel}`}</div>
                          </h3>
                        </div>
                        <div className="flow-root">
                          <h3 className="float-right">{`S$ ${item.goodsPrice}`}</h3>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
          <div className={styles.container4}>
            <h1 className={styles.header4}>Other restaurants to explore </h1>
            {detailFDrinks?.recommendationsRestaurantAndBarList &&
              detailFDrinks?.recommendationsRestaurantAndBarList.length > 0 && (
                <div className={styles.content4}>
                  {detailFDrinks?.recommendationsRestaurantAndBarList.map(
                    (item, index) => (
                      <div className={`${styles.card} restaurant-card`}
                        onClick={() =>
                          router.push({
                            pathname:'/' + getHotelId() + `/food-and-drinks`,
                            query: {...router.query,placeId:item.id,placeName:item.placeName}
                            })
                        }
                      >
                        <img
                          className={styles.RestaurantImg}
                          src={item?.placeImage}
                        />
                        <div
                          className={`${styles.RestaurantName} font-tanpearl`}
                        >
                          {item?.placeName}
                        </div>
                        {/* <Image
                      src={item?.placeImage}
                      layout="fill"
                      objectFit="contain"
                      alt=""
                      className={styles.card}
                    /> */}
                      </div>
                    )
                  )}
                </div>
              )}
            {/* 
            <div className={styles.content4}>

              <div className={styles.card}>
                <Image
                  src="/images/19/Card4.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  className={styles.card}
                />
              </div>
              <div className={styles.card}>
                <Image
                  src="/images/19/Card3.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                />
              </div>
            </div>
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
           */}
          </div>
        </div>
        <div className=" tablet:-mt-[35px]">
          <MBFooter />
        </div>
      </div>
      <LoadPageModal isOpen={true} closeModal={() => setLoading(false)} />
      <Footer />
    </>
  );
};

export default DishDetail;
