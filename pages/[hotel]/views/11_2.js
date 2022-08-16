import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../Menu';
import styles from '../../../styles/11.module.css';
import SocialLogin from '../../../components/socialLogin';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import api from '../../api';
import {
  ApplicationLogin,
  DEMO_GRAPHIC,
  EXPIRED_LOGIN_TIME,
  StorageName,
  UserDataKey,
} from '../../../common/constant';

const Content11_2 = ({ Mantra }) => {
  const [remember, onChangeRemember] = useState(true);
  const [wrong, onWrongLogin] = useState('');
  const [isShowPass, setIsShowPass] = useState(false);
  const [logoWidth, setLogoWidth] = useState(234);
  const [logoHeight, setLogoHeight] = useState(51);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const router = useRouter();
  const [isFormValid, setFormValid] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const logoWidth = isMobile ? 234 : 316;
    const logoHeight = isMobile ? 51 : 69;
    setLogoWidth(logoWidth);
    setLogoHeight(logoHeight);
  }, [isMobile]);

  const handleValidate = (e) => {
    setFormValid(!!emailRef?.current?.value && !!passwordRef?.current?.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataLogin = {
      application: ApplicationLogin,
      username: event.target.first.value.toLowerCase(),
      password: event.target.last.value,
    };
    try {
      const res = await api.auth.login(dataLogin);
      if (res.code === 0 && res.data !== null) {
        localStorage.setItem(
          StorageName,
          JSON.stringify({
            token: res.data.token,
            user: res.data.sysUserDto,
            expired: Date.now() + EXPIRED_LOGIN_TIME,
          })
        );
        localStorage.setItem(UserDataKey, JSON.stringify(res.data.sysUserDto));
        if (Mantra) {
          if (router.query.uuid) {
            try {
              const dataUpdateDemoGraphicStr =
                localStorage.getItem(DEMO_GRAPHIC);
              const res = await api.quiz.saveResult({
                uuid: router.query.uuid,
              });
              if (dataUpdateDemoGraphicStr) {
                const resCheckProblem = await api.userProblem.checkProblem();
                if (
                  resCheckProblem.messages === 'success' &&
                  resCheckProblem.data === false
                ) {
                  const resDemoGraphic = await api.userProblem.submitAnswers(
                    JSON.parse(dataUpdateDemoGraphicStr)
                  );
                  if (resDemoGraphic.messages === 'success') {
                    localStorage.removeItem(DEMO_GRAPHIC);
                  }
                }
              }
            } catch (error) {
              alert(error);
            }
            router.push({
              pathname: '/' + router.query.hotel + '/home',
              query: { Mantra },
            });
          } else {
            router.push({
              pathname: '/' + router.query.hotel + '/home',
              query: { Mantra },
            });
          }
        } else {
          router.push('/' + router.query.hotel + `?step=welcomeHome`);
        }
      } else {
        alert(res.messages);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleRemember = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    onChangeRemember(value);
  };

  const handleShowPass = () => {
    setIsShowPass(!isShowPass);
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
                <h1 className={styles.TextHello}>Welcome Back!</h1>
                <div className={`mobile:mb-[11px] md:mb-4 ${styles.inputBox}`}>
                  <div className={styles.Icon}>
                    <img
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
                <div className={`${styles.inputBox} ${styles.inputPass}`}>
                  <div className={styles.Icon}>
                    <img
                      src="/images/11/Password.svg"
                      alt=""
                      width={18}
                      height={20}
                    />
                  </div>
                  <input
                    type={isShowPass ? 'text' : 'password'}
                    placeholder="Password"
                    ref={passwordRef}
                    id="last"
                    name="last"
                    className={styles.password}
                    onChange={handleValidate}
                  />
                  <div className={styles.Icon}>
                    <Image
                      src={
                        isShowPass
                          ? '/images/11/ViewPass.svg'
                          : '/images/11/HidePass.svg'
                      }
                      alt=""
                      onClick={handleShowPass}
                      width={18}
                      height={20}
                    />
                  </div>
                </div>
                <div className={`${styles.rowText}`}>
                  <div className="text-left darkred">
                    {wrong ? <div>{wrong}</div> : null}
                  </div>
                  <div className="flow-root">
                    <div className="float-right nearblack text-sm">
                      <Link
                        href={
                          '/' + router.query.hotel + '/forgot?Mantra=' + Mantra
                        }
                      >
                        Forget Password
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.checking}>
                  <div>
                    <label className="scheckbox text-xs -ml-5">
                      <input
                        className={styles.checkboxs}
                        type="checkbox"
                        checked={remember}
                        onChange={handleRemember}
                      />
                      <span className="scheckmark"></span>
                      <span className="pl-6 text-sm nearblack">
                        Keep me signed in for 7 days
                      </span>
                    </label>
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
                  Sign in
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

export default Content11_2;
