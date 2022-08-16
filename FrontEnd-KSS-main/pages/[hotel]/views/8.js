import Image from "next/image";
import Navbar, { MBFooter, Footer } from "../navbar";
import styles from '../../../styles/6p.module.css'
const data = [
    'Very sensitive to certain drugs, food, scents or other allergens',
    'Prone to thrush or UTI',
    'Poor digestion'
]
export default function Content5() {
    return (
        <>
            <div className={styles.container}>
                <Navbar />
                <div className="container mx-auto mt-8 mb-8 grid justify-items-center relative ">
                    
                    <div className={styles.contain}>
                        <div className={`${styles.head2} ${styles.customTopTitle}`}>Drag & re-order the symptoms you selected previously. </div>
                        <div className={`${styles.head3} ${styles.customSubtile}`}>Tap and hold the system before dragging. 1 being most severe.</div>
                        <div className="grid md:grid-cols-1 gap-4 p-6 md:pb-10">
                            {data.map((i, index) => (
                                <div className={styles.card2} key={index}>
                                    
                                    <div className="text-left">
                                    {index}
                                    </div>
                                    <span>.{i} </span>
                                </div>
                            ))}
                            
                        </div>
                        
                    </div>
                    <div className="md:mt-4">
                    <Image src='/images/6/next.png' alt="" width={420} height={40} />
                    </div>
                    
                </div>
                <Footer />
                <MBFooter />
            </div>
        </>
    )
}