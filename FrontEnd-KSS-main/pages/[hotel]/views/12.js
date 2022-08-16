import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../../../styles/12.module.css';
import SocialLogin from '../../../components/socialLogin';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import api from '../../api';
import { ApplicationLogin, StorageName } from '../../../common/constant';
import React from 'react';
import Navbar from '../Menu';

const Content12 = () => {
  const router = useRouter();
  const [logoWidth, setLogoWidth] = useState(234);
  const [logoHeight, setLogoHeight] = useState(51);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [isFormValid, setFormValid] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    const logoWidth = isMobile ? 234 : 316;
    const logoHeight = isMobile ? 51 : 69;
    setLogoWidth(logoWidth);
    setLogoHeight(logoHeight);
  }, [isMobile]);

  const [errorMessage, setErrorMessage] = React.useState('');
  const alert = () => {
    setErrorMessage('Email is not existed!');
  };

  const handleValidate = (e) => {
    setFormValid(!!emailRef?.current?.value);
  };

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    const dataCheck = {
      application: ApplicationLogin,
      username: event.target.first.value,
    };
    try {
      const res = await api.auth.checkAccount(dataCheck);
      if (res.code === 0) {
        localStorage.setItem(
          StorageName,
          JSON.stringify({
            token: res.token,
          })
        );
        router.push({
          pathname: '/' + router.query.hotel + `/reset`,
          query: { Mantra: dataCheck.username },
        });
      } else {
        alert();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
        <Navbar />
          <form onSubmit={handleSubmit}>
            <div className={styles.box}>
              <div className={styles.TextBox}>
                <Image
                  src="/images/11/Bigtext.png"
                  alt=""
                  width={logoWidth}
                  height={logoHeight}
                />
              </div>
              <div className="CenterBox">
                <h1 className={styles.TextHello}>Reset password</h1>
                <div className={styles.note}>
                  Enter the email address associated with your account and
                  we&apos;ll verify your profile to reset your password
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.form}>
                    <div className={styles.formBox}>
                      <div className={styles.Icon}>
                        <Image
                          src="/images/11/Group 50.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Email"
                        ref={emailRef}
                        id="first"
                        name="first"
                        className="md:mb-8"
                        onChange={handleValidate}
                      />
                    </div>
                    {errorMessage && (
                      <div className={styles.error}> {errorMessage} </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className={`${
                    isFormValid
                      ? 'greenbtn cursor-pointer'
                      : 'graybtn cursor-not-allowed'
                  }  -mt-7 ${styles.signBtn}`}
                  disabled={!isFormValid}
                >
                  <a>continue</a>
                </button>
              </div>
              <SocialLogin />
              <div className={styles.copyright}>
                ©2022 Copyright all reserved by Kanpobliss
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Content12;
