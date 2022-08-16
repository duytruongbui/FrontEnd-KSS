import styles from '../../../styles/2245.module.css';
import Image from 'next/image';
import Navbar from '../navbar';
import { useRouter } from 'next/router';

export default function Content25() {
  const router = useRouter();

  return (
    <div>
      <div className={styles.coverimgfull}>
        <button
          className={styles.buttonBack}
          onClick={() =>
            router.push('/' + router.query.hotel + `/guide-practice`)
          }
        >
          <i className="bi bi-arrow-left-short"></i>
        </button>
        <div className={styles.contentcover}>
          <Navbar />
          <div className="h-96 grid content-center nearwhite">
            <div>
              <h1 className="text-center text-4xl">
                Six Healing Sound Guided Meditation
              </h1>
            </div>
            <div className="text-center p-4 text-2xl">
              Inhale kindness Exhale anger
            </div>
          </div>
          <div className="relative w-full h-80 -mt-20">
            <Image
              src="/images/24/Group 154.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <Image src="/images/25/bg.png" alt="" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
}
