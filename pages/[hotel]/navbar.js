import Link from 'next/link';

import Image from 'next/image';
import MainStyles from '../../styles/Main.module.css';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import { StorageName } from '../../common/constant';
import { validateTimeExpired } from '../../common/utils';

export function MBFooter({ text, linkTo, noDefaultColor = false }) {
  return (
    <>
      <div
        className={MainStyles.mbfooter}
        // {`${MainStyles.mbfooter} ${noDefaultColor ? '' : 'bg-main'}`}
      >
        <div className="relative pb-1 pt-8 m-0 flex justify-self-center w-full">
          {text ? (
            <div className="text-center w-screen text-xs">
              <Link href={linkTo}>{text}</Link>
            </div>
          ) : (
            <div className="text-center w-screen text-xs copyright">
              ©2022 Copyright all reserved by Kanpobliss
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function FooterAll() {
  return (
    <>
      <MBFooter />
      <Footer />
    </>
  );
}

export function Footer({ isNoPadding = false }) {
  const router = useRouter();
  return (
    <>
      <div
        className="min-w-full hidden md:block"
        style={{ background: '#523922' }}
      >
        <div
          className={`w-full pt-8 pb-8 hidden md:flex md:flex-row md:justify-between container ${
            isNoPadding ? 'px-0' : ''
          }`}
        >
          <div className="flex-1">
            <Image src="/images/Logo.svg" height={60} width={180} alt="" />
            <div className="flex flex-row">
              <div className="pr-4">
                <Image
                  src="/images/ins.svg"
                  height={28}
                  width={28}
                  alt="Instagram"
                />
              </div>
              <div className="pr-4">
                <Image
                  src="/images/fb.svg"
                  height={28}
                  width={28}
                  alt="Facebook"
                />
              </div>
              <div className="pr-4">
                <Image
                  src="/images/email.svg"
                  height={28}
                  width={28}
                  alt="Mail"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-row justify-between">
            <div className="min-w-m189">
              <ul
                id="navbar-list"
                className="nearwhite ftpad list-none"
                style={{ listStyleType: 'none !important' }}
              >
                <li className="fs-15">
                  <Link href={'/body-type'}>Body Constitution</Link>
                </li>
                <li className="fs-15">
                  <Link href={'/body-recovery'}> Body Recovery</Link>
                </li>

                <li className="fs-15">
                  <Link href={'/guidedpractice'}>Guided Practices</Link>
                </li>
              </ul>
            </div>
            <div className="min-w-m189">
              <ul id="navbar-list" className="nearwhite ftpad">
                <li className="fs-15 cursor-pointer">My Profile</li>
                <li
                  className="fs-15 cursor-pointer"
                  onClick={() => {
                    router.push({
                      pathname: '/' + router.query.hotel + '/aboutus',
                    });
                  }}
                >
                  About Us
                </li>
                <li className="fs-15 cursor-pointer">
                  <Link href={'/feedback'}>Feedback</Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 flex-column">
              <div className={MainStyles.inputBox}>
                <div className={MainStyles.Icon}>
                  <img src="/images/mail.svg" alt="" layout="fill" />
                </div>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="nearwhite"
                />
              </div>
              <div className="subbtn">SUBSCRIBE</div>
            </div>
          </div>
        </div>

        <div
          className={`w-full pt-8 pb-4 hidden md:flow-root nearwhite text-xs container ${
            isNoPadding ? 'px-0' : ''
          }`}
          style={{ background: '#523922' }}
        >
          <div className="float-left flex flex-row">
            <div
              className="pr-6 cursor-pointer"
              onClick={() => {
                router.push({
                  pathname: '/' + router.query.hotel + '/terms',
                });
              }}
            >
              Terms and Conditions
            </div>
            <div
              className="pr-6 cursor-pointer"
              onClick={() => {
                router.push({
                  pathname: '/' + router.query.hotel + '/privacy',
                });
              }}
            >
              Privacy Policy
            </div>
            <div
              className="pr-6 cursor-pointer"
              onClick={() => {
                router.push({
                  pathname: '/' + router.query.hotel + '/disclaimer',
                });
              }}
            >
              Disclaimer
            </div>
          </div>
          <div className="float-right">
            ©2022 Copyright all reserved by Kanpobliss
          </div>
        </div>
      </div>
    </>
  );
}

export default function Navbar({
  title,
  isNotShowMobile,
  showBackButton,
  isNoPadding = false,
  onShowMenu,
}) {
  const [hideBar, setHideBar] = useState('hidden');
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const hotelID = router.query.hotel;

  const checkRedirect = () => {
    if (router.route.includes('recommend')) {
      router.push(`/${hotelID}/signin`);
    }
    if (router.route.includes('food-and-drinks')) {
      router.push(`/${hotelID}/signin`);
    }
    if (router.route.includes('fitness')) {
      router.push(`/${hotelID}/signin`);
    }
    if (router.route.includes('guide-practice')) {
      router.push(`/${hotelID}/signin`);
    }
    if (router.route.includes('soundGuided')) {
      router.push(`/${hotelID}/signin`);
    }
    if (router.route.includes('self-care')) {
      router.push(`/${hotelID}/signin`);
    }
    if (router.route.includes('guidedpracticedetail')) {
      router.push(`/${hotelID}/signin`);
    }
    if (router.route.includes('spa')) {
      router.push(`/${hotelID}/signin`);
    }
  };

  const checkLoggedIn = async () => {
    const tokenStorage = await localStorage.getItem(StorageName);
    setIsLoggedIn(
      tokenStorage !== null &&
        !validateTimeExpired(JSON.parse(tokenStorage).expired)
    );
    if (
      tokenStorage !== null &&
      validateTimeExpired(JSON.parse(tokenStorage).expired)
    ) {
      checkRedirect();
    } else if (tokenStorage === null) {
      checkRedirect();
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <>
      {showBackButton && (
        <a
          onClick={() => router.back()}
          className="absolute md:hidden top-8 left-4"
        >
          <img src="/images/icon/backIcon.svg" />
        </a>
      )}
      <div className={hideBar}>
        <div
          className="w-full h-full fixed"
          style={{ zIndex: 1, background: '#B99173', opacity: 0.8 }}
        ></div>
        <div className={MainStyles.backRec1} style={{ zIndex: 2 }}>
          <div className={MainStyles.menubox}>
            <div className="float-right">
              <a
                onClick={() => {
                  setHideBar('hidden');
                  if (onShowMenu) onShowMenu(false);
                }}
              >
                <Image src="/images/exit.svg" width={16} height={16} alt="" />
              </a>
            </div>
            <ul id="navbar-list" className="float-right text-right nearwhite">
              <li className={MainStyles.spacingtop}>
                <Link href={`/${hotelID}?step=welcomeHome`}>
                  <div className={MainStyles.font}>Home</div>
                </Link>
              </li>

              <li className={MainStyles.spacing}>
                <Link href={`/${hotelID}/body-type`}>
                  <div className={MainStyles.font}>Body Constitution</div>
                </Link>
              </li>

              <li className={MainStyles.spacing}>
                <Link href={`/${hotelID}/body-recovery`}>
                  <div className={MainStyles.font}>Body Recovery</div>
                </Link>
              </li>
              <li className={MainStyles.spacing}>
                <Link href={`/${hotelID}/guidedpractice`}>
                  <div className={MainStyles.font}>Guided Practices</div>
                </Link>
              </li>
              <li className={MainStyles.spacing}>
                <Link href={`/${hotelID}/aboutus`}>
                  <div className={MainStyles.font}>About Us</div>
                </Link>
              </li>
              <li className={MainStyles.spacing}>
                <Link href={`/${hotelID}/feedback`}>
                  <div className={MainStyles.font}>Feedback</div>
                </Link>
              </li>
              {isLoggedIn ? (
                <li className={MainStyles.spacing}>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      localStorage.clear();
                      router.replace(`/${hotelID}?step=welcomeHome`);
                    }}
                  >
                    <div className={MainStyles.font}>Sign Out</div>
                  </div>
                </li>
              ) : (
                <li className={MainStyles.spacing}>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      localStorage.clear();
                      router.push(`/${hotelID}/signin`);
                    }}
                  >
                    <div className={MainStyles.font}>Sign In</div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className={`container ${isNoPadding ? 'px-0' : ''}`}>
        <nav className="bg-transparent border-gray-200 py-2.5 rounded md:items-center md:mb-[57px]">
          <div className="flex justify-between items-center">
            <Link href={`/${hotelID}?step=welcomeHome`}>
              <a className="md:flex items-center md:relative hidden mobile:w-48 mobile:h-10 mt-12">
                <img src="/images/Logo.svg" className="w-[251px] h-24" />
              </a>
            </Link>
            {title && <div className={MainStyles.topTitle}>{title}</div>}
            <div
              className="w-auto inline-block md:relative absolute right-2 top-4"
              id="mobile-menu"
            >
              <ul
                id="navbar-list"
                className="flex pt-4 pr-3 md:pr-0 flex-row md:items-center md:space-x-4 lg:space-x-8 md:mt-0 md:text-base md:font-medium"
              >
                <li className={MainStyles.lighttext}>
                  <Link href={`/${hotelID}/body-type`}>
                    <div
                      className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 cursor-pointer"
                      aria-current="page"
                    >
                      Body Constitution
                    </div>
                  </Link>
                </li>
                <li className={MainStyles.lighttext}>
                  <Link href={`/${hotelID}/body-recovery`}>
                    <div
                      className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 cursor-pointer"
                      aria-current="page"
                    >
                      Body Recovery
                    </div>
                  </Link>
                </li>
                <li className={MainStyles.lighttext}>
                  <Link href={`/${hotelID}/guidedpractice`}>
                    <div
                      className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 cursor-pointer"
                      aria-current="page"
                    >
                      Guided Practices
                    </div>
                  </Link>
                </li>
                {(!isNotShowMobile || !isMobile) && (
                  <li>
                    <Link href="#">
                      <div
                        onClick={() => {
                          setHideBar('block');
                          if (onShowMenu) onShowMenu(true);
                        }}
                      >
                        <button
                          data-collapse-toggle="mobile-menu"
                          type="button"
                          className="inline-block"
                          aria-controls="mobile-menu-2"
                          aria-expanded="false"
                        >
                          <Image
                            src="/images/BurgerMenu.svg"
                            width={16}
                            height={16}
                          />
                        </button>
                      </div>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
