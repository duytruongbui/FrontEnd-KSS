import { useEffect, useState } from 'react';
import Navbar from '../Menu';
import Image from 'next/image';
import styles from '../../../styles/212.module.css';
import SocialLogin from '../../../components/socialLogin';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import api from '../../api';
import {
  ApplicationLogin,
  StorageName,
  UserDataKey,
} from '../../../common/constant';
import { useFormik } from 'formik';

const Content12_2 = ({ Mantra }) => {
  const router = useRouter();
  console.log(router.query.Mantra);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
  const [logoWidth, setLogoWidth] = useState(234);
  const [logoHeight, setLogoHeight] = useState(51);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [isValidForm, setValidForm] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    }
    if (
      typeof values.password !== 'undefined' &&
      typeof values.confirmPassword !== 'undefined'
    ) {
      if (values.password != values.confirmPassword) {
        errors['password'] = "Passwords don't match.";
      }
    }
    setValidForm(Object.keys(errors).length === 0);
    return errors;
  };

  useEffect(() => {
    const logoWidth = isMobile ? 234 : 316;
    const logoHeight = isMobile ? 51 : 69;
    setLogoWidth(logoWidth);
    setLogoHeight(logoHeight);
  }, [isMobile]);

  const handleShowPass = () => setIsShowPass(!isShowPass);
  const handleShowConfirmPass = () => setIsShowConfirmPass(!isShowConfirmPass);

  const formik = useFormik({
    initialValues: {
      email: router.query.Mantra,
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: async (data) => {
      try {
        const res = await api.auth.changePassword({
          application: ApplicationLogin,
          password: data.password,
          username: data.email,
        });
        if (res.code === 0) {
          localStorage.setItem(
            StorageName,
            JSON.stringify({
              token: res.token,
              user: res.user,
            })
          );
          localStorage.setItem(
            UserDataKey,
            JSON.stringify({ token: res.token })
          );
          router.push('/' + router.query.hotel + `/signin?Mantra`);
        } else {
          alert(res.messages);
        }
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Navbar />
          <form
            noValidate
            className={styles.coverBox}
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
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
                  To protect your account, please choose a password longer than
                  7 characters, containing both letter & number. Do not use your
                  email address.
                </div>
                {/* Input */}
                <div className={styles.inputBox}>
                  <div className={styles.Icon}>
                    <Image
                      src="/images/11/Password.svg"
                      alt=""
                      width={18}
                      height={20}
                    />
                  </div>
                  <input
                    type={isShowPass ? 'text' : 'password'}
                    placeholder="New Password"
                    name="password"
                    className={styles.password}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
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

                <div className={styles.inputBox2}>
                  <div className={styles.Icon2}>
                    <Image
                      src="/images/11/Password.svg"
                      alt=""
                      width={18}
                      height={20}
                    />
                  </div>
                  <input
                    type={isShowConfirmPass ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    className={styles.password}
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                  />
                  <div className={styles.Icon2}>
                    <Image
                      src={
                        isShowConfirmPass
                          ? '/images/11/ViewPass.svg'
                          : '/images/11/HidePass.svg'
                      }
                      alt=""
                      onClick={handleShowConfirmPass}
                      width={18}
                      height={20}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={`${
                    isValidForm
                      ? 'greenbtn cursor-pointer'
                      : 'graybtn cursor-not-allowed'
                  }  -mt-7 ${styles.signBtn}`}
                >
                  <a>reset password</a>
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

export default Content12_2;
