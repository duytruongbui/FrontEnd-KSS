import styles from '../../../styles/feedback.module.css';
import { useEffect, useState } from 'react';
import Navbar, { MBFooter, Footer } from '../navbar';
import Popup from 'reactjs-popup';
import { useRouter } from 'next/router';
import api from '../../api';

export default function Content27() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);
  return (
    <>
      <Navbar showBackButton />
      <div className="container mt-14 md:mt-0">
        <Feedback onSubmit={() => setOpenModal(true)} />
      </div>
      <MBFooter />
      <Footer />
      <Popup
        open={openModal}
        closeOnDocumentClick
        onClose={closeModal}
        modal
        className="feedback-popup"
      >
        <div className="flex flex-col text-center items-center justify-center w-full h-full tablet:m-5 px-[65px]">
          <div className="text-main mb-[16px] font-tanpearl text-[24px] text-[#523922]">
            Thank you!
          </div>
          <p className={`${styles.textPopup} text-[20px] text-[#523922]`}>
            Your feedback has been received.
          </p>
          <button
            className="mt-3 w-[189px] h-[30px] greenbtn rounded-full"
            style={{ width: '100%' }}
            onClick={() => {
              router.push('/' + router.query.hotel + '/?step=welcomeHome');
            }}
          >
            <p className="text-sm capitalize">Close</p>
          </button>
        </div>
      </Popup>
    </>
  );
}

export const Feedback = ({ onSubmit, textColor, onCloseModal, modal }) => {
  const [tcmNumber, setTcmNumber] = useState(0);
  const [personalizedNumber, setPersonalizedNumber] = useState(0);
  const [recommendNumber, setRecommendNumber] = useState(0);
  const [note, setNote] = useState('');

  const handleSubmit = async () => {
    const req = {
      content: note,
      experienceRating: tcmNumber,
      recommendedRating: recommendNumber,
      useRatings: personalizedNumber,
    };
    const res = await api.feedback.addFeedback(req);
    if (res?.messages !== 'success') {
      alert(res.messages);
      return;
    }
    if (onSubmit) {
      onSubmit(req);
    }
  };

  useEffect(() => {
    const init = async () => {
      const res = await api.feedback.queryFeedback();
      if (res.code === 0) {
        const { useRatings, recommendedRating, content, experienceRating } =
          res.data;
        setTcmNumber(experienceRating);
        setPersonalizedNumber(useRatings);
        setRecommendNumber(recommendedRating);
        setNote(content);
      }
    };
    init();
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <h1
          className={`${
            modal ? 'text-base' : 'text-xl'
          }  md:text-[32px] w-[230px] md:w-full font-tanpearl ${
            textColor ? `text-[${textColor}]` : 'text-white'
          }`}
        >
          Your feedback is important to us.
        </h1>
        {onCloseModal && (
          <img
            src={'/images/icon/close-icon.svg'}
            className="cursor-pointer"
            onClick={() => onCloseModal()}
          />
        )}
      </div>
      <h3
        className={`mt-4 md:mt-7 ${
          modal ? 'text-xs' : 'text-sm'
        }  md:text-base ${textColor ? `text-[${textColor}]` : 'text-white'}`}
      >
        How would you rate your experience taking the TCM wellness assessments?
      </h3>
      <ListStart
        textColor={textColor}
        startNumber={tcmNumber}
        setStarNumber={setTcmNumber}
      />

      <h3
        className={`mt-4 md:mt-7 ${
          modal ? 'text-xs' : 'text-sm'
        } md:text-base ${textColor ? `text-[${textColor}]` : 'text-white'}`}
      >
        How would you rate your experience using personalized wellness tips &
        recommendations?
      </h3>
      <ListStart
        textColor={textColor}
        startNumber={personalizedNumber}
        setStarNumber={setPersonalizedNumber}
      />

      <h3
        className={`mt-4 md:mt-7 ${
          modal ? 'text-xs' : 'text-sm'
        } md:text-base ${textColor ? `text-[${textColor}]` : 'text-white'}`}
      >
        Would you recommend us to your friends & family?
      </h3>
      <PointItem
        textColor={textColor}
        number={recommendNumber}
        setNumber={setRecommendNumber}
      />

      <h3
        className={`mt-4 md:mt-7 ${
          modal ? 'text-xs' : 'text-sm'
        } md:text-base font-tenor ${
          textColor ? `text-[${textColor}]` : 'text-white'
        }`}
      >
        What feedback and suggestion would you like to share with us?
      </h3>
      <textarea
        className={`h-36 md:h-56 mt-2 font-tenor text-xs md:text-base p-3 ${
          textColor
            ? `text-[${textColor}] border-black placeholder:text-black `
            : 'text-white placeholder:text-white border-white'
        }`}
        placeholder="Please fill your feedback (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        className={`bg-green rounded-full h-8  w-full md:w-[18.4rem] mt-4 md:mt-10 font-tenor ${
          modal ? 'text-xs' : 'text-sm'
        } ${textColor ? '' : 'mb-20 md:mb-32'} text-white`}
        onClick={() => handleSubmit()}
      >
        SUBMIT
      </button>
    </>
  );
};

const ListStart = ({ textColor, startNumber, setStarNumber }) => {
  const [star, setStar] = useState(0);
  const onPressStar = (number) => {
    if (setStarNumber) {
      setStarNumber(number);
    }
    setStar(number);
  };

  useState(() => {
    if (startNumber !== null && startNumber !== undefined) {
      setStar(startNumber);
    }
  }, [startNumber]);

  return (
    <div className="flex flex-row mt-3">
      {[1, 2, 3, 4, 5].map((item) => (
        <StartItem
          active={item <= star}
          onClick={() => onPressStar(item)}
          textColor={textColor}
        />
      ))}
    </div>
  );
};

const StartItem = ({ active = false, onClick, textColor }) => {
  return active ? (
    <img
      onClick={onClick}
      className="cursor-pointe mr-4"
      src="/images/27/star.svg"
    />
  ) : (
    <img
      onClick={onClick}
      className="cursor-pointer mr-4"
      src={
        textColor ? '/images/27/starEmptyBrown.svg' : '/images/27/starEmpty.svg'
      }
    />
  );
};

const PointItem = ({ textColor, number, setNumber }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [point, setPoint] = useState(0);

  const onPressNumber = (value) => {
    if (setNumber) {
      setNumber(value);
    }
    setPoint(value);
  };

  useState(() => {
    if (number !== null && number !== undefined) {
      setPoint(number);
    }
  }, [number]);

  return (
    <>
      <div className="inline-block">
        <div className="flex mt-3">
          {numbers.map((item) => (
            <div
              className={`h-6 w-6 md:h-7 md:w-7 rounded-2xl flex justify-center items-center border-[1px] cursor-pointer
              ${item < 10 ? 'mr-[5px]' : ''} 
              ${
                point < item
                  ? textColor
                    ? `text-[${textColor}]`
                    : 'text-white'
                  : 'bg-[#073E0D] border-[#073E0D]'
              }`}
              onClick={() => onPressNumber(item)}
            >
              <span
                className={`${
                  textColor && point < item
                    ? `text-[${textColor}]`
                    : 'text-white'
                } font-tenor text-xs`}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <h3
            className={`text-[10px] ${
              textColor ? `text-[${textColor}]` : 'text-white'
            }`}
          >
            Not at all likely
          </h3>
          <h3
            className={`text-[10px] ${
              textColor ? `text-[${textColor}]` : 'text-white'
            }`}
          >
            Extremely Likely
          </h3>
        </div>
      </div>
    </>
  );
};
