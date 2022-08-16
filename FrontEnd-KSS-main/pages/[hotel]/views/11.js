import Image from 'next/image';
import Navbar from '../Menu';
import Link from 'next/link';
import Term from './29';
import styles from '../../../styles/11.module.css';
import { useEffect, useState } from 'react';
import SocialLogin from '../../../components/socialLogin';
import { useMediaQuery } from 'react-responsive';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
  ApplicationLogin,
  DEMO_GRAPHIC,
  EXPIRED_LOGIN_TIME,
  StorageName,
  UserDataKey,
} from '../../../common/constant';
import api from '../../api';
import Popup from 'reactjs-popup';

const Content11 = ({ Mantra }) => {
  const router = useRouter();
  const isTerm = router.query.isTerm === 'true';
  const [remember, onChangeRemember] = useState(true);
  const [logoWidth, setLogoWidth] = useState(234);
  const [logoHeight, setLogoHeight] = useState(51);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
  const [isValidForm, setValidForm] = useState(false);
  const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState(false);

  const [isOpen, setIsOpen] = useState();

  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }

    if (!values.lastName) {
      errors.firstName = 'Required';
    }

    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    }
    setValidForm(Object.keys(errors).length === 0);
    return errors;
  };

  const handleRemember = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    onChangeRemember(value);
  };

  const _setAgreePrivacyPolicy = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setAgreePrivacyPolicy(value);
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validate,
    onSubmit: async (data) => {
      try {
        if (agreePrivacyPolicy) {
          const res = await api.auth.register({
            application: ApplicationLogin,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            source: 'H5',
            username: data.email.toLowerCase(),
          });
          if (res.code === 0 && res.data) {
            localStorage.setItem(
              StorageName,
              JSON.stringify({
                token: res.data.token,
                user: res.data.sysUserDto,
                expired: Date.now() + EXPIRED_LOGIN_TIME,
              })
            );
            localStorage.setItem(
              UserDataKey,
              JSON.stringify(res.data.sysUserDto)
            );
            if (Mantra) {
              const dataUpdateDemoGraphicStr =
                localStorage.getItem(DEMO_GRAPHIC);
              if (dataUpdateDemoGraphicStr) {
                try {
                  const resDemoGraphic = await api.userProblem.submitAnswers(
                    JSON.parse(dataUpdateDemoGraphicStr)
                  );
                  if (resDemoGraphic.messages === 'success') {
                    localStorage.removeItem(DEMO_GRAPHIC);
                  }
                } catch (error) {
                  alert(error);
                }
              }
              router.push({
                pathname: '/' + router.query.hotel + '/disclaimer',
                query: { Mantra },
              });
            } else {
              router.push('/' + router.query.hotel + '/body-type');
            }
          } else {
            alert(res.messages);
          }
        }
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <>
      {isTerm ? (
        <Term
          onNav={() => {
            router.back();
            setAgreePrivacyPolicy(true);
          }}
        />
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            <Navbar />
            <div className={styles.box}>
              <div className={styles.TextBox}>
                <Image
                  src="/images/11/Bigtext.png"
                  alt=""
                  width={logoWidth}
                  height={logoHeight}
                />
              </div>
              <form
                className={styles.CenterBox}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                <h1 className={`${styles.TextHello} font-tanpearl`}>
                  Welcome!
                </h1>
                <div className={styles.inputBox}>
                  <div className={styles.Icon}>
                    <Image
                      src="/images/11/Group 2.svg"
                      alt=""
                      width={18}
                      height={20}
                    />
                  </div>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.Icon}>
                    <Image
                      src="/images/11/Group 2.svg"
                      alt=""
                      width={18}
                      height={20}
                    />
                  </div>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.Icon}>
                    <Image
                      src="/images/11/Group 50.svg"
                      alt=""
                      width={18}
                      height={20}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                </div>
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
                    placeholder="Password"
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
                    type={isShowConfirmPass ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className={styles.password}
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                  />
                  <div className={styles.Icon}>
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
                      <span className="pl-6 text-xs leading-3 nearblack">
                        Keep me signed in for 7 days
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="scheckbox text-xs -ml-5">
                      <input
                        className={styles.checkboxs}
                        type="checkbox"
                        checked={agreePrivacyPolicy}
                        onChange={_setAgreePrivacyPolicy}
                      />
                      <span className="scheckmark"></span>
                      <span className="pl-6 text-xs nearblack">
                        I agree to the Kanpobliss{' '}
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            setIsOpen('term');
                          }}
                        >
                          Terms & Conditions
                        </a>{' '}
                        and{' '}
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            setIsOpen('privacy');
                          }}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  color="info"
                  className={`graybtn ${
                    isValidForm && agreePrivacyPolicy
                      ? `${styles.signUpBtnGreen} cursor-pointer`
                      : `${styles.signUpBtn} cursor-not-allowed`
                  }`}
                >
                  Sign up
                </button>
              </form>

              <SocialLogin Mantra={Mantra} type="signup" />
              <div className={styles.copyright}>
                ©2022 Copyright all reserved by Kanpobliss
              </div>
            </div>
          </div>
        </div>
      )}
      <PrivacyPopup isOpen={isOpen === 'privacy'} close={() => setIsOpen()} />
      <TermsPopup isOpen={isOpen === 'term'} close={() => setIsOpen()} />
    </>
  );
};

export default Content11;

const PrivacyPopup = ({ isOpen, close }) => {
  return (
    <Popup
      open={isOpen}
      closeOnDocumentClick
      onClose={close}
      modal
      className="popup-privacy"
    >
      <div className="flex justify-between items-center w-full mb-6">
        <div className="font-tanpearl text-base">Privacy Policy</div>
        <div className="cursor-pointer" onClick={close}>
          <XIcon />
        </div>
      </div>
      <div className="privacy-content">
        <div>
          Last updated at 20 April 2022
          <br />
          <br /> This Privacy Policy (“Policy”) sets out the basis which
          Cultured Generation Pte. Ltd. (“we”, “us”, or “our”) may collect, use,
          disclose or otherwise process personal data of our customers in
          accordance with the Personal Data Protection Act (“PDPA”). This Notice
          applies to personal data in our possession or under our control,
          including personal data in the possession of organisations which we
          have engaged to collect, use, disclose or process personal data for
          our purposes.
        </div>
        <ol className="privacy-content-list">
          <div>PERSONAL DATA </div>
          <li>
            1. As used in this Notice “customer” means an individual who (a) has
            contacted us through any means to find out more about any goods or
            services we provide, or (b) may, or has, entered into a contract
            with us for the supply of any goods or services by us; and “personal
            data” means data, whether true or not, about a customer who can be
            identified: (a) from that data; or (b) from that data and other
            information to which we have or are likely to have access.
          </li>
          <li>
            2. Depending on the nature of your interaction with us, some
            examples of personal data which we may collect from you include
            name, email address, telephone number and gender.
          </li>
          <li>
            3. Other terms used in this Notice shall have the meanings given to
            them in the PDPA (where the context so permits).
          </li>
          <div>COLLECTION, USE AND DISCLOSURE OF PERSONAL DATA</div>
          <li>
            4. We generally do not collect your personal data unless (a) it is
            provided to us voluntarily by you directly or via a third party who
            has been duly authorised by you to disclose your personal data to us
            (your “authorised representative”) after (i) you (or your authorised
            representative) have been notified of the purposes for which the
            data is collected, and (ii) you (or your authorised representative)
            have provided written consent to the collection and usage of your
            personal data for those purposes, or (b) collection and use of
            personal data without consent is permitted or required by the PDPA
            or other laws. We shall seek your consent before collecting any
            additional personal data and before using your personal data for a
            purpose which has not been notified to you (except where permitted
            or authorised by law).
          </li>
          <li>
            5. We may collect and use your personal data for any or all of the
            following purposes: a. performing obligations in the course of or in
            connection with our provision of the goods and/or services requested
            by you; b. responding to, handling, and processing queries,
            requests, applications, complaints, and feedback from you; c.
            managing your relationship with us; and d. any other purposes for
            which you have provided the information.
          </li>
          <li>
            6. We may disclose your personal data: a. where such disclosure is
            required for performing obligations in the course of or in
            connection with our provision of the goods and services requested by
            you.
          </li>
          <li>
            7. The purposes listed in the above clauses may continue to apply
            even in situations where your relationship with us (for example,
            pursuant to a contract) has been terminated or altered in any way,
            for a reasonable period thereafter (including, where applicable, a
            period to enable us to enforce our rights under a contract with
            you).
          </li>
          <div>WITHDRAWING YOUR CONSENT</div>
          <li>
            8. The consent that you provide for the collection, use and
            disclosure of your personal data will remain valid until such time
            it is being withdrawn by you in writing. You may withdraw consent
            and request us to stop collecting, using and/or disclosing your
            personal data for any or all of the purposes listed above by
            submitting your request in writing or via email to our Data
            Protection Officer at the contact details provided below.
          </li>
          <li>
            9. Upon receipt of your written request to withdraw your consent, we
            may require reasonable time (depending on the complexity of the
            request and its impact on our relationship with you) for your
            request to be processed and for us to notify you of the consequences
            of us acceding to the same, including any legal consequences which
            may affect your rights and liabilities to us. In general, we shall
            seek to process your request within ten (10) business days of
            receiving it.
          </li>
          <li>
            10. Whilst we respect your decision to withdraw your consent, please
            note that depending on the nature and scope of your request, we may
            not be in a position to continue providing our goods or services to
            you and we shall, in such circumstances, notify you before
            completing the processing of your request. Should you decide to
            cancel your withdrawal of consent, please inform us in writing in
            the manner described in clause 8 above.
          </li>
          <li>
            11. Please note that withdrawing consent does not affect our right
            to continue to collect, use and disclose personal data where such
            collection, use and disclose without consent is permitted or
            required under applicable laws.
          </li>
          <div>ACCESS TO AND CORRECTION OF PERSONAL DATA</div>
          <li>
            12. If you wish to make (a) an access request for access to a copy
            of the personal data which we hold about you or information about
            the ways in which we use or disclose your personal data, or (b) a
            correction request to correct or update any of your personal data
            which we hold about you, you may submit your request in writing or
            via email to our Data Protection Officer at the contact details
            provided below.
          </li>
          <li>
            13. Please note that a reasonable fee may be charged for an access
            request. If so, we will inform you of the fee before processing your
            request.
          </li>
          <li>
            14. We will respond to your request as soon as reasonably possible.
            In general, our response will be within thirty (30) business days.
            Should we not be able to respond to your request within thirty (30)
            days after receiving your request, we will inform you in writing
            within thirty (30) days of the time by which we will be able to
            respond to your request. If we are unable to provide you with any
            personal data or to make a correction requested by you, we shall
            generally inform you of the reasons why we are unable to do so
            (except where we are not required to do so under the PDPA).
          </li>
          <div>PROTECTION OF PERSONAL DATA</div>
          <li>
            15. To safeguard your personal data from unauthorised access,
            collection, use, disclosure, copying, modification, disposal or
            similar risks, we have introduced appropriate administrative,
            physical and technical measures such as minimised collection of
            personal data, authentication and access controls (such as good
            password practices, need-to-basis for data disclosure, etc.),
            encryption of data, data anonymisation, up-to-date antivirus
            protection, regular patching of operating system and other software,
            securely erase storage media in devices before disposal, web
            security measures against risks, and security review and testing
            performed regularly.
          </li>
          <li>
            16. You should be aware, however, that no method of transmission
            over the Internet or method of electronic storage is completely
            secure. While security cannot be guaranteed, we strive to protect
            the security of your information and are constantly reviewing and
            enhancing our information security measures.
          </li>
          <div>ACCURACY OF PERSONAL DATA</div>
          <li>
            17. We generally rely on personal data provided by you (or your
            authorised representative). In order to ensure that your personal
            data is current, complete and accurate, please update us if there
            are changes to your personal data by informing our Data Protection
            Officer in writing or via email at the contact details provided
            below.
          </li>
          <div>RETENTION OF PERSONAL DATA </div>
          <li>
            18. We may retain your personal data for as long as it is necessary
            to fulfil the purpose for which it was collected, or as required or
            permitted by applicable laws.
          </li>
          <li>
            19. We will cease to retain your personal data, or remove the means
            by which the data can be associated with you, as soon as it is
            reasonable to assume that such retention no longer serves the
            purpose for which the personal data was collected, and is no longer
            necessary for legal or business purposes.
          </li>
          <div>TRANSFERS OF PERSONAL DATA OUTSIDE OF SINGAPORE</div>
          <li>
            20. We generally do not transfer your personal data to countries
            outside of Singapore. However, if we do so, we will obtain your
            consent for the transfer to be made and we will take steps to ensure
            that your personal data continues to receive a standard of
            protection that is at least comparable to that provided under the
            PDPA.
          </li>
          <div>EFFECT OF NOTICE AND CHANGES TO NOTICE</div>
          <li>
            21. This Notice applies in conjunction with any other notices,
            contractual clauses and consent clauses that apply in relation to
            the collection, use and disclosure of your personal data by us.
          </li>
          <li>
            22. We may revise this Notice from time to time without any prior
            notice. You may determine if any such revision has taken place by
            referring to the date on which this Notice was last updated. Your
            continued use of our services constitutes your acknowledgement and
            acceptance of such changes.
          </li>
        </ol>
      </div>
    </Popup>
  );
};

const TermsPopup = ({ isOpen, close }) => {
  return (
    <Popup
      open={isOpen}
      closeOnDocumentClick
      onClose={close}
      modal
      className="popup-privacy"
    >
      <div className="flex justify-between items-center w-full mb-6">
        <div className="font-tanpearl text-base">Terms & Conditions</div>
        <div className="cursor-pointer" onClick={close}>
          <XIcon />
        </div>
      </div>
      <div className="privacy-content">
        <div>
          Last updated at 02 February 2022
          <br />
          <br /> Please read these terms and conditions ("terms and conditions",
          "terms") carefully before using kanpobliss.com website (“website”,
          "service") operated by Kanpobliss ("us", 'we", "our").
        </div>
        <ol className="privacy-content-list">
          <li>
            <div>1. Conditions of use</div>
            By using this website, you certify that you have read and reviewed
            this Agreement and that you agree to comply with its terms. If you
            do not want to be bound by the terms of this Agreement, you are
            advised to leave the website accordingly. Kanpobliss only grants use
            and access of this website, its products, and its services to those
            who have accepted its terms.
          </li>
          <li>
            <div>2. Privacy policy</div>
            Before you continue using our website, we advise you to read our
            privacy policy regarding our user data collection. It will help you
            better understand our practices.
          </li>
          <li>
            <div>3. Age restriction</div>
            You must be at least 18 (eighteen) years of age before you can use
            this website. By using this website, you warrant that you are at
            least 18 years of age and you may legally adhere to this Agreement.
            Kanpobliss assumes no responsibility for liabilities related to age
            misrepresentation.
          </li>
          <li>
            <div>4. Intellectual property</div>
            You agree that all materials, products, and services provided on
            this website are the property of [name], its affiliates, directors,
            officers, employees, agents, suppliers, or licensors including all
            copyrights, trade secrets, trademarks, patents, and other
            intellectual property. You also agree that you will not reproduce or
            redistribute the [name]’s intellectual property in any way,
            including electronic, digital, or new trademark registrations. You
            grant Kanpobliss a royalty-free and non-exclusive license to
            display, use, copy, transmit, and broadcast the content you upload
            and publish. For issues regarding intellectual property claims, you
            should contact the company in order to come to an agreement.
          </li>
          <li>
            <div>5. User accounts</div>
            As a user of this website, you may be asked to register with us and
            provide private information. You are responsible for ensuring the
            accuracy of this information, and you are responsible for
            maintaining the safety and security of your identifying information.
            You are also responsible for all activities that occur under your
            account or password. If you think there are any possible issues
            regarding the security of your account on the website, inform us
            immediately so we may address them accordingly. We reserve all
            rights to terminate accounts, edit or remove content and cancel
            orders at our sole discretion.
          </li>
          <li>
            <div>6. Applicable law</div>
            By visiting this website, you agree that the laws of the [location],
            without regard to principles of conflict laws, will govern these
            terms and conditions, or any dispute of any sort that might come
            between Kanpobliss and you, or its business partners and associates.
          </li>
          <li>
            <div>7. Disputes</div>
            Any dispute related in any way to your visit to this website or to
            products you purchase from us shall be arbitrated by state or
            federal court [location] and you consent to exclusive jurisdiction
            and venue of such courts.
          </li>
          <li>
            <div>8. Indemnification</div>
            You agree to indemnify Kanpobliss and its affiliates and hold
            Kanpobliss harmless against legal claims and demands that may arise
            from your use or misuse of our services. We reserve the right to
            select our own legal counsel.
          </li>
          <li>
            <div>9. Limitation on liability</div>
            Kanpobliss is not liable for any damages that may occur to you as a
            result of your misuse of our website. Kanpobliss reserves the right
            to edit, modify, and change this Agreement at any time. We shall let
            our users know of these changes through electronic mail. This
            Agreement is an understanding between Kanpobliss and the user, and
            this supersedes and replaces all prior agreements regarding the use
            of this website.
          </li>
        </ol>
      </div>
    </Popup>
  );
};

const XIcon = () => {
  return (
    <svg
      width="11"
      height="13"
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.94237 1.28317C1.55729 0.887279 0.932948 0.887279 0.547867 1.28317C0.162786 1.67907 0.162786 2.32093 0.547867 2.71683L1.94237 1.28317ZM9.30207 11.7168C9.68715 12.1127 10.3115 12.1127 10.6966 11.7168C11.0817 11.3209 11.0817 10.6791 10.6966 10.2832L9.30207 11.7168ZM0.547867 2.71683L9.30207 11.7168L10.6966 10.2832L1.94237 1.28317L0.547867 2.71683Z"
        fill="#A56C50"
      />
      <path
        d="M10.6963 2.71683C11.0814 2.32093 11.0814 1.67907 10.6963 1.28317C10.3112 0.887279 9.68685 0.887279 9.30177 1.28317L10.6963 2.71683ZM0.54757 10.2832C0.162488 10.6791 0.162489 11.3209 0.547569 11.7168C0.93265 12.1127 1.55699 12.1127 1.94207 11.7168L0.54757 10.2832ZM9.30177 1.28317L0.54757 10.2832L1.94207 11.7168L10.6963 2.71683L9.30177 1.28317Z"
        fill="#A56C50"
      />
    </svg>
  );
};
