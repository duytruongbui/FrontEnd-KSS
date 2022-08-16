import React, { useEffect, useState } from 'react';
import Navbar, { MBFooter, Footer } from '../navbar';
import { useMediaQuery } from 'react-responsive';

import styles from '../../../styles/14.module.css';
import Popup from 'reactjs-popup';

const midiumContentKeys = ['Nourishment'];
const longContentKeys = ['Ease', 'Boost', 'Balance', 'Rejuvenation'];
const exLongContentKeys = ['Calm'];
import { useRouter } from 'next/router';

const Content14 = ({ Mantra, onNext }) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [classname, setClassname] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState(null);
  const [isShow, setIsShow] = useState(false);

  const getMantraInd = () => {
    switch (Mantra) {
      case 'Harmony':
        return (
          <div>
            <p className={styles.customParagraph}>
              You have a fit physique, lustrous complexion and hair. You are
              energetic, optimistic in nature with the ability to manage your
              mental and emotional stress. You have a healthy appetite and are
              adaptable to environmental changes.
            </p>
            <p className={styles.customParagraph}>
              Your&nbsp;
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => setOpenModal(true)}
                >
                  Yin and Yang
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => setOpenModal(true)}
                >
                  Yin and Yang
                </span>
              )}
              &nbsp;are well balanced and your vital energy, Qi, is flowing
              harmoniously throughout your body! In TCM, your body type is
              called Neutral.
            </p>
            <p className={styles.customParagraph}>
              However, Yin and Yang are in constant flux and can be affected by
              your changing lifestyle and external environment.
            </p>
            <p className={styles.customParagraph}>
              Click on our wellness tips and recommendations to help you
              maintain your good health and the harmony in your body!
            </p>
          </div>
        );
      case 'Energy':
        return (
          <div>
            <p className={styles.customParagraph}>
              You are introverted and soft spoken. You often find it hard to
              shed extra weight or build muscles. You tend to experience
              fatigue, shortness of breath and sweating and are prone to
              catching cold or flu.
            </p>
            <p className={styles.customParagraph}>
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => setOpenModal(true)}
                >
                  Qi
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => setOpenModal(true)}
                >
                  Qi
                </span>
              )}
              &nbsp;is the life force or vital energy that pulses through
              everything in the universe.
            </p>
            <p className={styles.customParagraph}>
              In TCM, your body type is called Qi Deficiency. When Qi is
              deficient, your immune system is weak, therefore you are more
              likely to be extra sensitive to environmental changes and also
              take longer time to recover from illnesses.
            </p>
            <p className={styles.customParagraph}>
              Click on our wellness tips and recommendations to help you get
              more energy!
            </p>
          </div>
        );
      case 'Ease':
        return (
          <div>
            <p className={styles.customParagraph}>
              You have a Type A personality and a multi-tasker. You often bottle
              up emotions, and feel worrisome or frustration. You find yourself
              often sighing and frowning. You tend to experience burping and
              bloating issues and frequently have stuffiness in the chest.
            </p>
            <p className={styles.customParagraph}>
              The free-flowing of Qi is the fundamental to good physical and
              mental health. This ebb and flow of Qi is mainly controlled by
              the&nbsp;
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => setOpenModal(true)}
                >
                  Liver
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => setOpenModal(true)}
                >
                  Liver
                </span>
              )}
              &nbsp;organ system.
            </p>
            <p className={styles.customParagraph}>
              In TCM, your body type is called Qi Stagnation. When Liver Qi is
              blocked or sluggish, your body is less resilient against stressful
              situations. Exposure to a prolonged period of unmanaged stress may
              lead to anxiety and depression. For women, Qi stagnation often
              attributes to irregular period, PMS and even fertility issues.
            </p>
            <p className={styles.customParagraph}>
              Click on our wellness tips and recommendations to help you move Qi
              freely and ease into your hectic lifestyle!
            </p>
          </div>
        );
      case 'Boost':
        return (
          <div>
            <p className={styles.customParagraph}>
              You tend to be quiet and soft spoken. You often have sallow
              complexion and have dizzy spells especially when standing up. You
              tend to have pale lips, dry hair and skin.
            </p>
            <p className={styles.customParagraph}>
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => setOpenModal(true)}
                >
                  Blood
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => setOpenModal(true)}
                >
                  Blood
                </span>
              )}
              &nbsp;is a dense and nutritive substance of the body. It is not
              just confined to the blood vessels, nor does it contain only red
              and white blood cells.
            </p>
            <p className={styles.customParagraph}>
              In TCM, your body type is called Blood Deficiency. It means that
              there is not enough blood volume in circulation and/or the quality
              of your blood lack nourishment so it cannot carry out important
              bodily functions. Blood deficiency is often associated with
              undernourishment, emotional stress, a weak Spleen and blood loss.
            </p>
            <p className={styles.customParagraph}>
              If blood is deficient for a prolonged period of time, you may be
              susceptible to anemia which can cause hair loss, fatigue,
              dizziness, cold intolerance and menstrual issues (in women).
            </p>
            <p className={styles.customParagraph}>
              Click on our wellness tips and recommendations to help you boost
              your blood!
            </p>
          </div>
        );
      case 'Flow':
        return (
          <div>
            <p className={styles.customParagraph}>
              You tend to be impatient, short-tempered or forgetful. You likely
              lack physical movement and feel uncomfortable in cold
              environments. Your complexion is dull and lusterless and are more
              prone to scarring and varicose veins.
            </p>
            <p className={styles.customParagraph}>
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => setOpenModal(true)}
                >
                  Blood
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => setOpenModal(true)}
                >
                  Blood
                </span>
              )}
              &nbsp;is a dense and nutritive substance of the body. It is not
              just confined to the blood vessels, nor does it contain only red
              and white blood cells.
            </p>
            <p className={styles.customParagraph}>
              In TCM, your body type is called Blood Stagnation. When blood is
              stagnant, you may be susceptible to pain, bodyache and bleeding
              problems, due to blockage in the energy channels. Long term bood
              stagnation can often lead to Qi stagnation which may affect your
              emotional health.
            </p>
            <p className={styles.customParagraph}>
              Click on our wellness tips and recommendations to help you improve
              your blood flow!
            </p>
          </div>
        );
      case 'Warmth':
        return (
          <div>
            <p className={styles.customParagraph}>
              You tend to be quiet and introvert. You often complain about cold
              hands and feet, and being sensitive to cold environments. You are
              always sleepy and tired and are prone to loose stools or diarrhea.
            </p>
            <p className={styles.customParagraph}>
              When your body lack&nbsp;
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => {
                    setOpenModal(true);
                    setType('Yin');
                  }}
                >
                  Yin
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => {
                    setOpenModal(true);
                    setType('Yin');
                  }}
                >
                  Yin
                </span>
              )}
              &nbsp;energy is depleted, or your&nbsp;
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => {
                    setOpenModal(true);
                    setType('Yang');
                  }}
                >
                  Yang
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => {
                    setOpenModal(true);
                    setType('Yang');
                  }}
                >
                  Yang
                </span>
              )}
              &nbsp; is relatively in excess, you tend to experience heat and
              dry symptoms such as dry eyes, dry mouth, hot flushes, red tongue
              with thin layer of coating.
            </p>
            <p className={styles.customParagraph}>
              In TCM, your body type is called Yin Deficiency. When your Yin is
              deficient, you are susceptible to health problems such as dry
              skin, night sweats, hot flushes and chronic fatigue.
            </p>
            <p className={styles.customParagraph}>
              Click on our wellness tips and recommendations to help you nourish
              your Yin!
            </p>
          </div>
        );
      case 'Rejuvenation':
        return (
          <div>
            <p className={styles.customParagraph}>
              You have a mild temper and patient personality. You tend to get
              puffy eyes and feel sluggish and heavy especially during rainy
              days. You may have also noticed a sticky coating on your tongue.
              These symptoms are likely due to overconsumption of oily and sweet
              foods. You also lack the motivation to exercise regularly.
            </p>
            <p className={styles.customParagraph}>
              In TCM, your body type is called Phlegm Damp. Internal&nbsp;
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => setOpenModal(true)}
                >
                  dampness
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => setOpenModal(true)}
                >
                  dampness
                </span>
              )}
              &nbsp;is directly due to the impaired Spleen function in
              transporting fluids. Whereas external dampness is due to humid
              weather, damp living conditions or damp-producing foods such as
              cheese, milk and sugar.
            </p>
            <p className={styles.customParagraph}>
              Dampness is considered to be the cause or contributing factor for
              illnesses like high cholesterol, metabolic disorders, brain fog
              and fibromyalgia.
            </p>
            <p className={styles.customParagraph}>
              Click on our wellness tips and recommendations to help you
              rejuvenate and clear out the dampness!
            </p>
          </div>
        );
      case 'Nourishment':
        return (
          <div>
            <p className={styles.customParagraph}>
              You are outgoing and impatient. You like to stay up late and lack
              hydration. You often complain about warm palms and soles of the
              feet especially towards the end of the day and often experience
              dry eyes and mouth. The symptoms usually worsens when you are
              under extreme stress or when you overconsume spicy food or
              alcohol.
            </p>
            <p className={styles.customParagraph}>
              When the body's&nbsp;
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => {
                    setOpenModal(true);
                    setType('Yin');
                  }}
                >
                  Yin
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => {
                    setOpenModal(true);
                    setType('Yin');
                  }}
                >
                  Yin
                </span>
              )}
              &nbsp;energy is depleted, or your&nbsp;
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => {
                    setOpenModal(true);
                    setType('Yang');
                  }}
                >
                  Yang
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => {
                    setOpenModal(true);
                    setType('Yang');
                  }}
                >
                  Yang
                </span>
              )}
              &nbsp; is relatively in excess, you tend to experience heat and
              dry symptoms such as dry eyes, dry mouth, hot flushes, red tongue
              with thin layer of coating.
            </p>
            <p className={styles.customParagraph}>
              In TCM, your body type is called Yin Deficiency. When your Yin is
              deficient, you are susceptible to health problems such as dry
              skin, night sweats, hot flushes and chronic fatigue.
            </p>
            <p className={styles.customParagraph}>
              Click on our wellness tips and recommendations to help you nourish
              your Yin!
            </p>
          </div>
        );
      case 'Calm':
        return (
          <div>
            <p className={styles.customParagraph}>
              You are easily irritated and have a short temper. You often feel
              hot, have oily skin which is prone to acne and have bitter sticky
              taste in your mouth. You may have also noticed a layer of yellow
              coating on your tongue. You likely lack physical movement. Your
              symptoms tend to worsen when you eat too much fried food, dairy
              and alcohol.
            </p>
            <p className={styles.customParagraph}>
              In TCM, your body type is called Damp Heat. Internal dampness is
              directly due to the impaired spleen function in transporting
              fluids. Whereas external dampness is due to humid weather, damp
              living conditions or damp-producing foods such as cheese, milk and
              sugar.
            </p>
            <p className={styles.customParagraph}>
              When dampness is not cleared out, it turns into damp&nbsp;
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => setOpenModal(true)}
                >
                  heat
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => setOpenModal(true)}
                >
                  heat
                </span>
              )}
              &nbsp;which can impair the Yin (body fluids), leading to even more
              complex clinical manifestations. Damp heat is often toxic,
              commonly characterized by swelling, pain and even pus. Your body
              type may also be more susceptible to skin problems, ulcers and
              urinary difficulties.
            </p>
            <p className={styles.customParagraph}>
              Click on our wellness tips and recommendations to help you clear
              out the dampness and calm down the heat!
            </p>
          </div>
        );
      case 'Balance':
        return (
          <div>
            <p className={styles.customParagraph}>
              You are self conscious and may have low self-esteem. You are very
              sensitive to the environment such as food, scents and pollen which
              cause sensitive skin, nasal and respiratory issues. You also have
              tendency to have dairy and gluten intolerance and are prone to
              autoimmune conditions.
            </p>
            <p className={styles.customParagraph}>
              In TCM, your body type is called Sensitive. This is caused by a
              weakness in&nbsp;
              {isMobile ? (
                <span
                  className={styles.spText}
                  onClick={() => setOpenModal(true)}
                >
                  defensive Qi
                </span>
              ) : (
                <span
                  className={styles.spText}
                  onMouseOver={() => setOpenModal(true)}
                >
                  defensive Qi
                </span>
              )}
              &nbsp;and body’s inability to deal with pathogens due to
              imbalances. You are prone to heightened immune reactions that
              creates ineffective response to external triggers. Your body is
              easily affected by allergens, climate and seasonal changes.
            </p>
            <p className={styles.customParagraph}>
              By healing and strengthening the defensive Qi through diet and
              lifestyle changes, you can avoid further aggravation of common
              ailments such as nasal congestion, running nose, eczema and
              asthma.
            </p>
            <p className={styles.customParagraph}>
              Click on our wellness tips and recommendations to help you
              modulate your defensive Qi!
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    if (isMobile) {
      if (exLongContentKeys.includes(Mantra)) {
        setClassname(styles.xlMobile);
      } else if (longContentKeys.includes(Mantra)) {
        setClassname(styles.lgMobile);
      } else if (midiumContentKeys.includes(Mantra)) {
        setClassname(styles.mdMobile);
      } else {
        setClassname(styles.smMobile);
      }
    } else {
      if (exLongContentKeys.includes(Mantra)) {
        setClassname(styles.xlDesktop);
      } else if (longContentKeys.includes(Mantra)) {
        setClassname(styles.lgDesktop);
      } else if (midiumContentKeys.includes(Mantra)) {
        setClassname(styles.mdDesktop);
      } else {
        setClassname(styles.smDesktop);
      }
    }
  }, [isMobile, Mantra]);

  const closeModal = () => setOpenModal(false);

  const renderModalContent = () => {
    switch (Mantra) {
      case 'Harmony':
        return (
          <>
            <p className={styles.tooltips}>
              According to TCM, our body is a microcosm of the universe, where
              all phenomena are composed of two opposite, but mutually
              interconnected Yin and Yang’s energies that exist in harmony.
            </p>
            <p className={styles.tooltips}>
              Yin refers to the cold, damp, passive, material, and formational
              aspects of Qi. Yin is associated with the lower parts and front of
              the body.
            </p>
            <p className={styles.tooltips}>
              Yang refers to the hot, warm, active, immaterial, and functional
              aspects of Qi. Yang is associated with the upper body and back.
            </p>
            <p className={styles.tooltips}>
              Given Yin and Yang’s interconnectivity, the state of health is
              understood as states of balance or imbalance of Yin and Yang.
            </p>
          </>
        );
      case 'Energy':
        return (
          <>
            <p className={styles.tooltips}>
              According to TCM, Qi provides the active, life force (or vital
              energy) necessary for the growth and development of the body.
            </p>
            <p className={styles.tooltips}>
              Qi also promotes the formation and circulation of blood, supports
              metabolism and defends the body from external pathogens.
            </p>
          </>
        );
      case 'Ease':
        return (
          <>
            <p className={styles.tooltips}>
              Unlike Western Medicine, organs in TCM do not only refer to their
              anatomy but refer to their function as a system and in relations
              to the body as a whole.
            </p>
            <p className={styles.tooltips}>
              Liver is known as the "Commanding General" of the body and its
              function can be easily affected by anger.
            </p>
            <p className={styles.tooltips}>
              Liver Qi stagnation means that the energy is not moving smoothly
              and it manifests in various physical and mental symptoms.
            </p>
          </>
        );
      case 'Boost':
        return (
          <>
            <p className={styles.tooltips}>
              According to TCM, the spleen transforms and transports the
              digested food into Qi and blood. Blood is formed by the
              nourishment from food.
            </p>
            <p className={styles.tooltips}>
              It circulates ceaselessly through the vessels along with Qi (vital
              energy), which carries it into organs internally and to the skin,
              muscles, tendons and bones, nourishing and moistening along the
              way.
            </p>
          </>
        );
      case 'Flow':
        return (
          <>
            <p className={styles.tooltips}>
              According to TCM, the spleen transforms and transports the
              digested food into Qi and blood. Blood is formed by the
              nourishment from food.
            </p>
            <p className={styles.tooltips}>
              It circulates ceaselessly through the vessels along with Qi (vital
              energy), which carries it into organs internally and to the skin,
              muscles, tendons and bones, nourishing and moistening along the
              way.
            </p>
          </>
        );
      case 'Warmth':
        if (type === 'Yin') {
          return (
            <>
              <p className={styles.tooltips}>
                Yin refers to the cold, damp, passive, material, and formational
                aspects of Qi (vital energy). It is the nutritive source that
                nourishes and keeps the body cool. Yin is associated with the
                lower parts and front of the body.
              </p>
            </>
          );
        }
        return (
          <>
            <p className={styles.tooltips}>
              Yang is the life force or the energy source that shines
              <br />
              like the sun. It represents the warmth, power, action
              <br />
              and movement in your body. Yang energy is also associated with
              <br /> the upper body and back.
            </p>
          </>
        );
      case 'Rejuvenation':
        return (
          <>
            <p className={styles.tooltips}>
              Dampness is a concept in TCM described as "high humidity" inside
              the body. It is a condition of viscosity and stagnation caused by
              the spleen's incapability to transport and transform bodily
              fluids, leading to an accumulation of moisture within the body.
            </p>
            <p className={styles.tooltips}>
              You may experience heaviness in the body, especially in the lower
              body, and swelling in the ankles.
            </p>
          </>
        );
      case 'Nourishment':
        if (type === 'Yin') {
          return (
            <>
              <p className={styles.tooltips}>
                Yin refers to the cold, damp, passive, material, and formational
                aspects of Qi (vital energy).
                <br />
                It is the nutritive source that nourishes and keeps the body
                cool.
                <br /> Yin is associated with the lower parts and front of the
                body.
              </p>
            </>
          );
        }
        return (
          <>
            <p className={styles.tooltips}>
              Yang is the life force or the energy source that shines like the
              sun.
              <br />
              It represents the warmth, power, action and movement in your body.
              <br /> Yang energy is also associated with the upper body and
              back.
            </p>
          </>
        );
      case 'Calm':
        return (
          <>
            <p className={styles.tooltips}>
              Dampness is a concept in TCM described as "high humidity" inside
              the body. It is a condition of viscosity and stagnation caused by
              the spleen's incapability to transporting and transform bodily
              fluids, leading to an accumulation of moisture within the body.
            </p>
            <p className={styles.tooltips}>
              You may experience heaviness in the body, especially in the lower
              body, and swelling in the ankles.
            </p>
            <p className={styles.tooltips}>
              In TCM, heat refers to both body temperature (like fever) or
              hyperactivity, manifested through rapid pulse, thirst for cold
              drinks or facial redness.
            </p>
          </>
        );
      case 'Balance':
        return (
          <>
            <p className={styles.tooltips}>
              In TCM, the body treated as a microcosm with its own defense
              mechanism. Defensive Qi is an innate armor or protective barrier
              that lives just under the skin. Pathogens are prevented from
              entering with this intuitive self-defense network.
            </p>
          </>
        );
    }
  };

  return (
    <>
      <Popup
        open={openModal}
        onClose={closeModal}
        modal
        className="custom-modal"
      >
        {renderModalContent()}
        <div className={styles.modalBtnContainer}>
          <img src="/images/14/Group 113.svg" onClick={closeModal} />
        </div>
      </Popup>
      <div className={styles.container}>
        <Navbar
          title="Body Constitution"
          onShowMenu={(value) => setIsShow(value)}
        />
        <div className={styles.content}>
          <div className={styles.box}>
            <h3
              className={styles.bodyNeed}
              style={{ opacity: isShow ? 0.3 : 1 }}
            >
              Your body needs
            </h3>
            <h1
              className={`text-3xl ${styles.mantraTitle}`}
              style={{ opacity: isShow ? 0.3 : 1 }}
            >
              {Mantra}
            </h1>
            <div
              className={`${styles.CenterBox} ${classname}`}
              style={{ opacity: isShow ? 0.3 : 1 }}
            >
              <div className={styles.icontop}>
                <img
                  src={'/images/icon/' + Mantra + '.svg'}
                  style={{ width: '75%', height: '75%' }}
                />
              </div>
              <div className={styles.textContent}>{getMantraInd()}</div>
              <button onClick={() => onNext(true)} className={styles.sign_btn1}>
                WELLNESS TIPS
              </button>
            </div>
            <button
              className={styles.sign_btn2}
              onClick={() => {
                router.push({
                  pathname: '/' + router.query.hotel + '/recommend',
                  query: {
                    Mantra: Mantra,
                  },
                });
              }}
              style={{ opacity: isShow ? 0.3 : 1 }}
            >
              GET RECOMMENDATIONS
            </button>
          </div>
        </div>
        <MBFooter text="Disclaimer" linkTo="disclaimer" />
      </div>

      <Footer />
    </>
  );
};
const Mantra = 'Mantra';
export default Content14;
