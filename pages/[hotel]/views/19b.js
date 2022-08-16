import Image from "next/image";
import Navbar, { MBFooter, Footer } from "../navbar";

import styles from '../../../styles/19b.module.css'

const Content19 = () => {
    return (
        <>
        <Navbar />
        <div className={styles.contain}>

        
        <div className={styles.box1}>
        <div className={styles.container1}>
            <div className={styles.img1} >
            <Image src="/images/19/image 7.png"  layout="fill" objectFit="contain" />
            </div>

            <div className={styles.content1}>
                <h1 className={styles.header1}>Qi-moving full body massage</h1>
                <h3 className={styles.text1}>Why we curated this for you</h3>
                <ul className={styles.ul}>
                    <li>Provi  des immune support</li>
                    <li>Clear phlegm</li>
                    <li>Stabilizes blood sugar</li> 
                    <li>Prevents liver damage</li>
                </ul>
            </div>
        </div>
        <div className={styles.container2}>
            <div className={styles.content2}>
                <h1 className={styles.header2}>Enjoy it at SPA Name</h1>
                <h3 className={styles.text2}>Discover a dining experience built on craft, service and ambience. Madame Fan offers Cantonese cuisine in a contemporary setting.</h3>
                <button className={styles.book}>BOOK A SPA</button>
            </div>
            <div  className={styles.img2}>
            <Image src="/images/19/image 8.png"  layout="fill" objectFit="contain" alt=""  />
            </div>
            
        </div>
    </div>
    <div className={styles.box2}>
        <div className={styles.container4}>
            <h1 className={styles.header4}>Other restaurants to explore </h1>
            <div className={styles.content4}>
               <div className={styles.card}>
               <Image src="/images/19/Card6.png"  layout="fill" objectFit="contain" alt="" />
               </div>
               <div className={styles.card}>
               <Image src="/images/19/Card5.png"  layout="fill" objectFit="contain" alt="" />
               </div>
                
                
            </div>
        </div>
    </div>
            <br/>
            <MBFooter />
            </div>
            
            <Footer />
        </>
    )
}

export default Content19;