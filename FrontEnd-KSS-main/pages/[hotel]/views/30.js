import Image from "next/image";
import Navbar, { MBFooter, Footer } from "../navbar";

import styles from "../../../styles/30.module.css";

const Content30 = ({ Name }) => {
  return (
    <>
      <Navbar />
      <div className={styles.contain}>
        <div className={styles.box}>
          <div className={styles.heading}>
            <div className={styles.infor}>
              <h1 className={styles.hello}>Hello, {Name}!</h1>{" "}
              <button className={styles.button}>EDIT PROFILE</button>
            </div>
            <div className={styles.bio}>
              Here you can access your past assessment results and save
              favorites
            </div>
          </div>

          <div className={styles.bodyItem}>
            <button className={styles.bodyLeft}>
              <Image
                src="/images/18/logo.png"
                width={30}
                height={30}
                objectFit="scale-down"
                alt=""
              />
            </button>
            <div className={styles.bodyCotent}>
              <h3 className={styles.bodyTitle}>Body Constitution</h3>
              <div className={styles.bodyRight}>
                <h3 className={styles.bodyDate}>2022.03.06</h3>
                <button className={styles.bodyBtn}>View Result</button>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className={styles.bodyItem}>
            <button className={styles.bodyLeft}>
              <Image
                src="/images/18/logo.png"
                width={30}
                height={30}
                objectFit="scale-down"
                alt=""
              />
            </button>
            <div className={styles.bodyCotent}>
              <h3 className={styles.bodyTitle}>Body Constitution</h3>
              <div className={styles.bodyRight}>
                <h3 className={styles.bodyDate}>2022.03.06</h3>
                <button className={styles.bodyBtn}>View Result</button>
              </div>
            </div>
          </div>
          <div className={styles.bodyItem}>
            <button className={styles.bodyLeft}>
              <Image
                src="/images/18/logo.png"
                width={30}
                height={30}
                objectFit="scale-down"
                alt=""
              />
            </button>
            <div className={styles.bodyCotent}>
              <h3 className={styles.bodyTitle}>Body Constitution</h3>
              <div className={styles.bodyRight}>
                <h3 className={styles.bodyDate}>2022.03.06</h3>
                <button className={styles.bodyBtn}>View Result</button>
              </div>
            </div>
          </div>
          <div className="divider"></div>

          <div className={styles.choose}>Saved Recommendations</div>
          <div className={styles.recommend}>
            <div className={styles.selection}>
              <button className={styles.buttonRe}>Restaurant</button>
              <button className={styles.buttonRe}>SPA</button>
              <button className={styles.buttonRe}>Gym</button>
            </div>

            <div className={styles.slider}>
              <i className="bi bi-geo-alt-fill"></i>
              <h2 className={styles.title}>Hotel Name 1</h2>
            </div>
            <div className={styles.container}>
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
            </div>


            <div className={styles.slider}>
              <i className="bi bi-geo-alt-fill"></i>
              <h2 className={styles.title}>Hotel Name 2</h2>
            </div>
            <div className={styles.container}>
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
            </div>

            <div className={styles.slider}>
              <h2 className={styles.title}>Saved Guided Practices</h2>
            </div>
            <div className={styles.container}>
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
            </div>

          </div>
        </div>
      </div>
      <MBFooter />
      <Footer />
    </>
  );
};

export default Content30;
