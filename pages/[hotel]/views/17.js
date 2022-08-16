import Image from "next/image";
import Navbar, { MBFooter, Footer } from "../navbar";

import styles from '../../../styles/17.module.css'

const Content17 = ({ Name }) => {
    return (
        <>
        <Navbar />
        <div className={styles.contain}>
            
        <div className={styles.box}>
            <div className={styles.heading}>
                {/* <img className={styles.logo" src="assets17/logo.png}> */}
                <Image src="/images/17/logo.png" width={140} height={140} objectFit="scale-down" alt="" />
                <div className={styles.infor}>
                    <h1 className={styles.hello}>Hello, {Name}!</h1>
                    <h1 className={styles.bio}>Here&apos;re the recomnendations for you to live your wellness mantra</h1>
                </div>
            </div>
            <div className={styles.choose}>Choose from one of the following</div>
            <div className={styles.container}>
                {/* <img src="assets17/image 7.png" alt="" className={styles.image}>
                <img src="assets17/image 8.png" alt="" className={styles.image}>
                <img src="assets17/image 6.png" alt="" className={styles.image}>
                <img src="assets17/image 5.png" alt="" className={styles.image}> */}
                <Image src="/images/17/image 7.png" width={360} height={405} alt="" objectFit="scale-down" />
                <Image src="/images/17/image 8.png" width={360} height={405} alt="" objectFit="scale-down" />
                <Image src="/images/17/image 6.png" width={360} height={405} alt="" objectFit="scale-down" />
                <Image src="/images/17/image 5.png" width={360} height={405} alt="" objectFit="scale-down" />
            </div>
            <div className={styles.slider}>
                <div className={styles.green}></div>
                <div className={styles.white}></div>
            </div>
        </div>
        </div>
        <MBFooter />
        <Footer />
        </>
    )
}

export default Content17;