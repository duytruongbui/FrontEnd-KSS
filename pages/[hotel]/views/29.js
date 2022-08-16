import Navbar, { MBFooter, Footer } from '../navbar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from '../../../styles/29.module.css';
import { useMediaQuery } from 'react-responsive';

const Content29 = ({ onNav, noCountdown = false }) => {
  const router = useRouter();
  const [agree, onShowAgree] = useState(false);
  const [second, onChangeSecond] = useState(10);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  useEffect(() => {
    if (!noCountdown) {
      const intervalId = setTimeout(function () {
        if (second > 0) {
          onChangeSecond(second - 1);
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
      setTimeout(function () {
        onShowAgree(true);
      }, 10000);
    } else {
      onShowAgree(true);
    }
  });
  return (
    <>
      {isMobile ? <></> : <Navbar />}
      {isMobile ? (
        <img src="/images/Logo.svg" className="w-[251px] h-16 mx-auto mt-16" />
      ) : (
        <></>
      )}
      <div className={styles.contain}>
        <div className={`${styles.box} container mx-auto`}>
          <div className={styles.selection}>
            <h3 className={styles.selected}>Terms & Conditions</h3>
            <h3
              onClick={() => {
                router.push('/' + router.query.hotel + '/privacy');
              }}
            >
              Privacy Agreement
            </h3>
            <h3
              onClick={() => {
                router.push('/' + router.query.hotel + '/disclaimer');
              }}
            >
              Disclaimer
            </h3>
          </div>
          <div className={styles.content}>
            <h1 className={styles.header_text}>Terms & Conditions</h1>
            <div className={styles.paragraph}>
              <div className={styles.part}>
                <p className={styles.text}>
                  Last updated at 02 February 2022
                  <br></br>Please read these terms and conditions ("terms and
                  conditions", "terms") carefully before using kanpobliss.com
                  website (“website”, "service") operated by Kanpobliss ("us",
                  'we", "our").
                </p>
              </div>
              <div className={styles.part}>
                <h1 className={styles.title}>1. Conditions of use</h1>
                <p className={styles.text}>
                  By using this website, you certify that you have read and
                  reviewed this Agreement and that you agree to comply with its
                  terms. If you do not want to be bound by the terms of this
                  Agreement, you are advised to leave the website accordingly.
                  Kanpobliss only grants use and access of this website, its
                  products, and its services to those who have accepted its
                  terms.
                </p>
              </div>
              <div className={styles.part}>
                <h1 className={styles.title}>2. Privacy policy</h1>
                <p className={styles.text}>
                  Before you continue using our website, we advise you to read
                  our
                  <span className={styles.policy}> privacy policy </span>
                  regarding our user data collection. It will help you better
                  understand our practices.
                </p>
              </div>
              <div className={styles.part}>
                <h1 className={styles.title}>3. Age restriction</h1>
                <p className={styles.text}>
                  You must be at least 18 (eighteen) years of age before you can
                  use this website. By using this website, you warrant that you
                  are at least 18 years of age and you may legally adhere to
                  this Agreement. Kanpobliss assumes no responsibility for
                  liabilities related to age misrepresentation.
                </p>
              </div>
              <div className={styles.part}>
                <h1 className={styles.title}>4. Intellectual property</h1>
                <p className={styles.text}>
                  You agree that all materials, products, and services provided
                  on this website are the property of [name], its affiliates,
                  directors, officers, employees, agents, suppliers, or
                  licensors including all copyrights, trade secrets, trademarks,
                  patents, and other intellectual property. You also agree that
                  you will not reproduce or redistribute the [name]’s
                  intellectual property in any way, including electronic,
                  digital, or new trademark registrations.
                  <br></br>You grant Kanpobliss a royalty-free and non-exclusive
                  license to display, use, copy, transmit, and broadcast the
                  content you upload and publish. For issues regarding
                  intellectual property claims, you should contact the company
                  in order to come to an agreement.
                </p>
              </div>
              <div className={styles.part}>
                <h1 className={styles.title}>5. User accounts</h1>
                <p className={styles.text}>
                  As a user of this website, you may be asked to register with
                  us and provide private information. You are responsible for
                  ensuring the accuracy of this information, and you are
                  responsible for maintaining the safety and security of your
                  identifying information. You are also responsible for all
                  activities that occur under your account or password.
                  <br></br>If you think there are any possible issues regarding
                  the security of your account on the website, inform us
                  immediately so we may address them accordingly.
                  <br></br> We reserve all rights to terminate accounts, edit or
                  remove content and cancel orders at our sole discretion.
                </p>
              </div>
              <div className={styles.part}>
                <h1 className={styles.title}>6. Applicable law</h1>
                <p className={styles.text}>
                  By visiting this website, you agree that the laws of the
                  [location], without regard to principles of conflict laws,
                  will govern these terms and conditions, or any dispute of any
                  sort that might come between Kanpobliss and you, or its
                  business partners and associates.
                </p>
              </div>
              <div className={styles.part}>
                <h1 className={styles.title}>7. Disputes</h1>
                <p className={styles.text}>
                  Any dispute related in any way to your visit to this website
                  or to products you purchase from us shall be arbitrated by
                  state or federal court [location] and you consent to exclusive
                  jurisdiction and venue of such courts.
                </p>
              </div>
              <div className={styles.part}>
                <h1 className={styles.title}>8. Indemnification </h1>
                <p className={styles.text}>
                  You agree to indemnify Kanpobliss and its affiliates and hold
                  Kanpobliss harmless against legal claims and demands that may
                  arise from your use or misuse of our services. We reserve the
                  right to select our own legal counsel.{' '}
                </p>
              </div>
              <div className={styles.part}>
                <h1 className={styles.title}>9. Limitation on liability</h1>
                <p className={styles.text}>
                  Kanpobliss is not liable for any damages that may occur to you
                  as a result of your misuse of our website.
                  <br></br>Kanpobliss reserves the right to edit, modify, and
                  change this Agreement at any time. We shall let our users know
                  of these changes through electronic mail. This Agreement is an
                  understanding between Kanpobliss and the user, and this
                  supersedes and replaces all prior agreements regarding the use
                  of this website.
                </p>
              </div>
            </div>
            {agree ? (
              <button onClick={() => onNav(false)} className={styles.agree_btn}>
                Agree
              </button>
            ) : (
              <button className={styles.agree_btn}>
                Agree (Wait {second > 0 ? second : null}s)
              </button>
            )}
            {isMobile && (
              <div className="text-center text-xs text-white/[0.5] mb-[11px]">
                ©2022 Copyright all reserved by Kanpobliss
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Content29;
