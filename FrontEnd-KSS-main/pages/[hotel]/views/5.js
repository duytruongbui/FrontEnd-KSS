import Image from 'next/image';
import Navbar, { MBFooter, Footer } from '../navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../../api';
import styles from '../../../styles/5p.module.css';
import { UUID_KEY } from '../../../common/constant';

export default function Content5() {
  const router = useRouter();
  const onStartAssessment = async () => {
    try {
      const res = await api.quiz.startAnswerQuestion();
      if (res.messages === 'success') {
        localStorage.setItem(UUID_KEY, res.data);
        router.push({
          pathname: `/${router.query.hotel}/quiz`,
          query: {
            uuid: res.data,
          },
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className={styles.contain}>
        <div className={styles.content}>
          <Navbar />
          <div className="md:hidden container mx-auto mt-20">
            <p className="-mt-16 mb-12 text-sm" style={{ color: '#f8eee4' }}>
              Body Constitution
            </p>
          </div>
          <div className="container mx-auto sm:mt-12 md:mt-0">
            <h1 className={`${styles.head1} font-tanpearl`}>
              About Body Constitution Assessment
            </h1>
            <div
              className={`text-xs md:text-base leading-none ${styles.p_lineHeight}`}
            >
              <p className="mt-4" style={{ color: '#f8eee4' }}>
                TCM (Traditional Chinese Medicine) is an individualized health
                and wellbeing system, based on the principle that different body
                constitutions, i.e., types, respond differently to the same
                lifestyle choices or environmental factors. Your body
                constitution is made up of your body's structural and functional
                characteristics, your temperament, your body's adaptability to
                environmental changes and susceptibility to disease. It is
                partly genetically determined and partly acquired based on your
                lifestyle and environment. In TCM, your body constitution forms
                the foundation of diagnosis, disease treatment and prevention.
              </p>
              <p className="mt-4" style={{ color: '#f8eee4' }}>
                By understanding your body constitution, you can learn how to
                make the right lifestyle choices for your own body, to restore
                balance within and with the surrounding environment. Depending
                on whether your body constitution is stable or not, you may be
                more or less affected by lifestyle, environmental changes and/or
                major life events.
              </p>
              <p className="mt-4" style={{ color: '#f8eee4' }}>
                Our personalized wellness tips and recommendations offered in at
                the end of this assessment are not prescriptive but are intended
                to guide you in making daily choices more wisely for the unique
                needs of your body. We encourage you to develop greater
                awareness of your body as a whole, and hope to empower you to
                build lasting positive habits.
              </p>
            </div>
            <div
              className={`${styles.startbtn} leading-8 h-10 flex justify-center items-center`}
              onClick={onStartAssessment}
            >
              Start Assessment
            </div>
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
              <Link href={`/${router.query.hotel}/body-recovery`}>
                <div
                  className="relative flex items-center justify-center"
                  style={{ maxHeight: '185.12px' }}
                >
                  <h1 className={`${styles.cardtitle} font-tanpearl`}>
                    Body Recovery
                  </h1>
                  <Image
                    src="/images/5/image 2.png"
                    layout="fill"
                    objectFit="cover"
                    className={styles.imgcover}
                  />
                </div>
              </Link>
              <Link href={`/${router.query.hotel}/guidedpractice`}>
                <div
                  className="relative flex items-center justify-center"
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
