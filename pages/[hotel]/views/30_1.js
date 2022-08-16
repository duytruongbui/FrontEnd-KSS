import Image from "next/image";
import Link from "next/link";
import Term from "./29";
import styles from "../../../styles/11.module.css";
import { useState } from "react";

const Content30_1 = ({ Mantra }) => {
  const [remember, onChangeRemember] = useState(true);
  const [disclaim, onShowDisclaim] = useState(false);

  const handleRemember = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    onChangeRemember(value);
  };

  return (
    <>
      {disclaim ? (
        <Term onNav={onShowDisclaim} />
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.box}>
              <div className={styles.TextBox}>
                <Image
                  src="/images/11/Bigtext.png"
                  alt=""
                  width={300}
                  height={80}
                />
              </div>
              <div className={styles.CenterBox}>
                <h1 className={styles.TextHello}>Edit Profile</h1>
                <div className={styles.inputBox}>
                  <div className={styles.Icon}>
                    <Image
                      src="/images/11/Group 2.png"
                      alt=""
                      layout="fill"
                      objectFit="scale-down"
                    />
                  </div>
                  <input type="text" placeholder="Username" />
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.Icon}>
                    <Image
                      src="/images/11/Group 50.png"
                      alt=""
                      layout="fill"
                      objectFit="scale-down"
                    />
                  </div>
                  <input type="text" placeholder="Email" />
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.Icon}>
                    <Image
                      src="/images/11/Password.png"
                      alt=""
                      layout="fill"
                      objectFit="scale-down"
                    />
                  </div>
                  <input type="password" placeholder="Password" />
                </div>
                <div className={styles.inputBoxChange}>
                  <button className={styles.passwordBtn}>
                    Change Password
                  </button>
                </div>
              </div>
              <Link href={"#"}>
                <a className="greenbtn -mt-7">UPDATE PrOfile</a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Content30_1;
