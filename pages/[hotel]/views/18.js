import Image from 'next/image';
import Navbar, { MBFooter, Footer } from '../navbar';
import { useState } from 'react';

import styles from '../../../styles/18.module.css';

const Content18 = ({ Mantra }) => {
  const [listRestaurant, setListRestaurant] = useState(['All']);
  return (
    <>
      <div className={styles.containbox}>
        <Navbar />
        <div className={styles.contain}>
          <div className={styles.header}>
            <Image
              src="/images/18/logo.png"
              width={106}
              height={106}
              objectFit="scale-down"
              alt=""
            />
            <h1 className={styles.text}>
              Perfect Dishes & Drinks for{' '}
              <span className="font-tanpearl">{Mantra}</span>
            </h1>
          </div>

          <div className={styles.content}>
            <div className={styles.selection}>
              <button className={styles.button}>All</button>
              <button className={styles.button}>Madam Fan</button>
              <button className={styles.button}>Akira</button>
              <button className={styles.button}>Tonic Bar</button>
              <button className={styles.button}>Madam Fan</button>
              <button className={styles.button}>Akira</button>
              <button className={styles.button}>Tonic Bar</button>
            </div>
            <div className={styles.container}>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant A</h3>
                  <h3 className={styles.text}>
                    Braised Supreme Dried 15 Head Australian Xu Rong Abalone
                  </h3>
                  <h3 className={styles.note}>Contains Shellfish, Gluten</h3>
                </div>
                <h3 className={styles.price}>S$ 298.00</h3>
              </div>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant B</h3>
                  <h3 className={styles.text}>
                    Four Treasure Soup, sea cucumber, fish maw, dried Hokkaido
                    scallop, crab meat
                  </h3>
                  <h3 className={styles.note}>Contains Shellfish, Gluten</h3>
                </div>
                <h3 className={styles.price}>S$ 28.00</h3>
              </div>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant E</h3>
                  <h3 className={styles.text}>
                    Wat Tan Black Bean Beef Ho Fun
                  </h3>
                  <h3 className={styles.note}>Contains Gluten</h3>
                </div>
                <h3 className={styles.price}>S$ 32.00</h3>
              </div>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant C</h3>
                  <h3 className={styles.text}>
                    Crispy Duck <br />
                    Salad, watermelon, pomelo, cashew nut, macadamia nut,
                    shallot, spicy yuzu sauce.
                  </h3>
                  <h3 className={styles.note}>
                    Contains Gluten, Nuts or / and Peanuts
                  </h3>
                </div>
                <h3 className={styles.price}>S$ 22.00</h3>
              </div>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant D</h3>
                  <h3 className={styles.text}>
                    Market Seasonal Chinese Greens, cooked any style
                  </h3>
                  <h3 className={styles.note}>Vegetarian</h3>
                </div>
                <h3 className={styles.price}>S$ 14.00</h3>
              </div>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant G</h3>
                  <h3 className={styles.text}>Qi moving cocktail</h3>
                  <h3 className={styles.note}>Contains Gluten</h3>
                </div>
                <h3 className={styles.price}>S$ 36.00</h3>
              </div>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant A</h3>
                  <h3 className={styles.text}>
                    Braised Supreme Dried 15 Head Australian Xu Rong Abalone
                  </h3>
                  <h3 className={styles.note}>Contains Shellfish, Gluten</h3>
                </div>
                <h3 className={styles.price}>S$ 298.00</h3>
              </div>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant B</h3>
                  <h3 className={styles.text}>
                    Four Treasure Soup, sea cucumber, fish maw, dried Hokkaido
                    scallop, crab meat
                  </h3>
                  <h3 className={styles.note}>Contains Shellfish, Gluten</h3>
                </div>
                <h3 className={styles.price}>S$ 28.00</h3>
              </div>
              <div className={styles.block}>
                <div>
                  <h3 className={styles.heading}>Restaurant E</h3>
                  <h3 className={styles.text}>
                    Wat Tan Black Bean Beef Ho Fun
                  </h3>
                  <h3 className={styles.note}>Contains Gluten</h3>
                </div>
                <h3 className={styles.price}>S$ 32.00</h3>
              </div>
            </div>
          </div>

          <span className={styles.readmore}>
            <a className={styles.loadmore}>Load More</a>
          </span>
          <MBFooter />
        </div>

        <div className="relative">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Content18;
