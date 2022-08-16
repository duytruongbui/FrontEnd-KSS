import Image from "next/image";
import Navbar, { MBFooter, Footer } from "../navbar";
import styles from '../../../styles/6p.module.css'
const data = [
    'Very sensitive to certain drugs, foods, scents, or other allergens',
    'Often affected by pollens during spring',
    'Have shallow breaths, shortness of breath',
    'Have respiratory allergies (Asthma, panting, sneezing)',
    'Have a weak and soft voice',
    'Get sick easily',
    'Have blocked; running nose',
    'Very weak as a child and often sick'
]
export default function Content5() {
    return (
        <>
            <div className={styles.container}>
                <Navbar/>
                <div className="container mx-auto mt-8 mb-8 grid justify-items-center relative ">
                    
                    <div className={styles.contain}>
                        <div className={styles.head2}>Do you experience any of these symptoms?</div>
                        <div className="grid md:grid-cols-2 gap-4 p-6 md:pb-10">
                            {data.map((i, index) => (
                                <div className={styles.card} key={index}>
                                   {i} 
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