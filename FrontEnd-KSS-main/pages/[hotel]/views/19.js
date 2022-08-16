import Image from "next/image";
import Navbar, { MBFooter, Footer } from "../navbar";

import styles from "../../../styles/19.module.css";

const Content19 = ({ RestaurantName = "{Restaurant Name}" }) => {
  return (
    <>
      <Navbar showBackButton />
      <div className={styles.contain}>
        <div className={styles.box1}>
          <div className={styles.container1}>
            <div className="md:w-full grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className="w-5/6 h-56 hidden md:block">
                <img src="/images/19/image 7.png" alt="" />
              </div>
              <div className="">
                <h2 className="text-white md:w-[30rem] text-[1.75rem] leading-8 md:text-[2rem] md:leading-9 text-left">
                  Braised Supreme Dried 15 Head Australian Xu Rong Abalone{" "}
                </h2>
                <div className="mt-4 w-full h-[11.25rem] md:h-56 md:hidden block">
                  <img src="/images/19/image 7.png" alt="" />
                </div>
                <h3 className={styles.text1}>Why we curated this for you</h3>
                <ul className="font-tenor text-white text-base list-disc ml-5 marker:text-black">
                  <li>Provides immune support</li>
                  <li>Clear phlegm</li>
                  <li>Stabilizes blood sugar</li>
                  <li>Prevents liver damage</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.container2}>
            <div className="md:w-full grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className={styles.content2}>
                <h1 className={styles.header2}>
                  Enjoy it at{" "}
                  <span className="hidden md:block font-tanpearl ml-2 leading-9">
                    {RestaurantName}
                  </span>
                </h1>
                <h1 className="block md:hidden text-white text-[1.75rem] mt-1 font-tanpearl leading-8">
                  {RestaurantName}
                </h1>
                <div className="mt-3.5 w-full h-[11.25rem] md:hidden block">
                  <img src="/images/19/image 8.png" alt="" />
                </div>
                <h3 className={styles.text2}>
                  Discover a dining experience built on craft, service and
                  ambience. Madame Fan offers Cantonese cuisine in a
                  contemporary setting.
                </h3>
                <button className={styles.book}>BOOK A TABLE</button>
              </div>
              <div className={styles.img2}>
                <Image
                  src="/images/19/image 8.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.box2}>
          <div className={styles.container3}>
            <h1 className={styles.header3}>Other recommended dishes</h1>
            <div className={styles.content3}>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant A</h3>
                  <h3 className={styles.text}>
                    Crispy Duck Salad, watermelon, pomelo, cashew nut, macadamia
                    nut, shallot, spicy yuzu sauce.
                  </h3>
                  <h3 className={styles.note}>
                    Contains Gluten, Nuts or / and Peanuts
                  </h3>
                </div>
                <div className="flow-root">
                  <h3 className="float-right">S$ 22.00</h3>
                </div>
              </div>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant A</h3>
                  <h3 className={styles.text}>
                    Market Seasonal Chinese Greens, cooked any style
                  </h3>
                  <h3 className={styles.note}>Vegetarian</h3>
                </div>
                <div className="flow-root">
                  <h3 className="float-right">S$ 14.00</h3>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container4}>
            <h1 className={styles.header4}>Other restaurants to explore </h1>
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
          </div>
        </div> */}
        <br />
      </div>

      <MBFooter />
      <Footer />
    </>
  );
};

export default Content19;
