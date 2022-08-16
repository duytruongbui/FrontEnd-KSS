import Image from 'next/image';
import Navbar, { MBFooter, Footer } from '../navbar';
import Link from 'next/link';
import styles from '../../../styles/body-recovery.module.css';
import { useRouter } from 'next/router';


export default function Content5_1() {
    const router = useRouter();
    
  return (
    <>
        <div className={styles.contain}>
            <div className={styles.content}>
                <Navbar />
                <div className="md:hidden container mx-auto mt-20">
                    <p className="-mt-16 mb-12 text-sm" style={{ color: '#f8eee4' }}>
                        Body Recovery
                    </p>
                </div>
                <div className="container mx-auto sm:mt-12 md:mt-0">
                    <h1 className={`${styles.head1} font-tanpearl`}>
                        About Body Recovery Assessment
                    </h1>
                    <div
                        className={`text-xs md:text-base leading-none ${styles.p_lineHeight}`}
                    >
                        <p className="mt-4" style={{ color: '#f8eee4' }}>
                        Traditional Chinese medicine (TCM) has evolved over thousands of
                        years. Its holistic approach treats the mind-body-spirit as a
                        whole and attributes ailments to an imbalance in the internal
                        bodily functions and with the external elements.
                        </p>
                        <p className="mt-4" style={{ color: '#f8eee4' }}>
                        When it comes to treatment and prevention, TCM uses a method
                        called Differential Diagnosis, which emphasizes a patient-based
                        diagnosis, rather than the Western and other alternative
                        medicine’s disease-based diagnosis.
                        </p>
                        <p className="mt-4" style={{ color: '#f8eee4' }}>
                        Through this Body Recovery assessment, your symptoms are gathered
                        and interpreted into specific patterns of contributing factors
                        which in turn forms the basis of the individualized treatment
                        recommendations.
                        </p>
                        <p className="mt-4" style={{ color: '#f8eee4' }}>
                        Our personalized wellness tips and recommendations offer at the
                        end of this assessment are not prescriptive but are intended to
                        support you in self-care and self-healing. We encourage you to
                        develop greater awareness of your body as a whole, and hope to
                        empower you in your journey towards greater balance.
                        </p>
                    </div>
                    <Link href={`/${router.query.hotel}/body-recovery-menu`}>
                    <div
                        className={`${styles.startbtn} leading-8 h-10 flex justify-center items-center`}
                    >
                        COMING SOON
                    </div>
                    </Link>
                    <div className="divider"></div>
                    <div
                        className="text-sm md:text-base mt-3"
                        style={{ color: '#f8eee4' }}
                    >
                        Explore more
                    </div>
                    <div
                        className="grid md:grid-cols-2 md:gap-8 gap-4 pt-4 pb-4"
                        style={{ marginBottom: '49px' }}
                    >
                        <Link href={`/${router.query.hotel}/body-type`}>
                            <div
                                className="relative flex items-center justify-center cursor-pointer"
                                style={{ maxHeight: '185.12px' }}
                            >
                                <h1 className={`${styles.cardtitle} font-tanpearl`}>
                                Body Constitution
                                </h1>
                                <Image
                                src="/images/5/image 3.png"
                                layout="fill"
                                objectFit="cover"
                                className={styles.imgcover}
                                />
                            </div>
                        </Link>

                        <Link href={`/${router.query.hotel}/guidedpractice`}>
                            <div
                                className="relative flex items-center justify-center cursor-pointer"
                                style={{ maxHeight: '185.12px' }}
                            >
                                <h1 className={`${styles.cardtitle} font-tanpearl`}>
                                Guided Practices
                                </h1>
                                <Image
                                src="/images/5/Rectangle 15.png"
                                layout="fill"
                                objectFit="cover"
                                className={styles.imgcover}
                                />
                            </div>
                        </Link>
                    </div>
                </div>
                <MBFooter />
                <Footer />
            </div>
        </div>
    </>
  );
}
