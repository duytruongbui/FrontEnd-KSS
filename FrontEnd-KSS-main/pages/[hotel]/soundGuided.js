import styles from '../../styles/soundGuided.module.css';
import Navbar from './navbar';
import { useRouter } from 'next/router';
import FeedbackModal from '../../components/FeedbackModal';
import { useState, useEffect } from 'react';
import api from '../api';

const soundGuidedBg = `url('/images/soundGuided/sound-guided-pg.png')`;

export default () => {
  const router = useRouter();
  const [data, setData] = useState({});
  useEffect(() => {
    const init = async () => {
      if (router?.query?.guidedPracticeId) {
        const res = await api.guidePractice.getInfo(
          router.query.guidedPracticeId
        );
        setData(res?.data);
      }
    };
    init();
  }, [router?.query?.guidedPracticeId]);
  return (
    <div className={styles.contain}>
      <div
        className={`${styles.content}`}
        style={{
          backgroundImage: soundGuidedBg,
        }}
      >
        <Navbar />
        <div className="container mx-auto w-full mt-20 px-4 md:mt-0 md:px-0">
          <div class="video-container">
            <video controls src={data.guidedPracticesVideo} />
          </div>
        </div>
      </div>
      <FeedbackModal
        onSubmit={() => {
          console.log('submit');
        }}
      />
    </div>
  );
};
