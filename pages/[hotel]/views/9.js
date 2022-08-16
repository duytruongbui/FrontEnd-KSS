import Image from 'next/image';
import Navbar from '../navbar';
import styles from '../../../styles/6p.module.css';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Q1CheckBoxInitMock,
  Q2CheckBoxInitMock,
  Q3CheckBoxInitMock,
} from '../../../common/mock';

const InputData = ({ text, onChange, isChecked }) => {
  const [check, setChecked] = useState(false);
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (onChange) {
      onChange(value);
    }
    setChecked(value);
  };
  return (
    <label className="checkbox text-xs">
      <input
        name="isGoing"
        type="checkbox"
        checked={
          isChecked !== null || isChecked !== undefined ? isChecked : check
        }
        onChange={handleInputChange}
      />
      <span className="checkmark"></span>
      <span className="labelcheck text-sm onmb">
        &#160; &#160; &#160;
        {text}
      </span>
    </label>
  );
};

export default function Content9({
  onChange,
  Q1CheckBoxInit,
  Q2CheckBoxInit,
  Q3CheckBoxInit,
}) {
  const [age, onChangeAge] = useState('0');
  const [gender, onChangeGender] = useState('0');
  const [isDisableSubmit, setDisableSubmit] = useState(true);
  const [q1CheckBox, setQ1CheckBox] = useState(
    Q1CheckBoxInit || Q1CheckBoxInitMock
  );
  const [q2CheckBox, setQ2CheckBox] = useState(
    Q2CheckBoxInit || Q2CheckBoxInitMock
  );
  const [q3CheckBox, setQ3CheckBox] = useState(
    Q3CheckBoxInit || Q3CheckBoxInitMock
  );
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  const _setQ1CheckBox = ({ id, value }) => {
    const _q1CheckBox = q1CheckBox.map((item) => {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });
    setQ1CheckBox(_q1CheckBox);
  };

  const _setQ2CheckBox = ({ id, value }) => {
    const _q2CheckBox = q2CheckBox.map((item) => {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });
    setQ2CheckBox(_q2CheckBox);
  };

  const _setQ3CheckBox = ({ id, value }) => {
    const _q3CheckBox = q3CheckBox.map((item) => {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });
    setQ3CheckBox(_q3CheckBox);
  };

  const handleOtherQ1Change = (event) => {
    const newQ1List = [...q1CheckBox];
    newQ1List[newQ1List.length - 1].otherDes = event.target.value;
    setQ1CheckBox(newQ1List);
    validateBeforeSubmit();
  };

  const handleOtherQ2Change = (event) => {
    const newQ2List = [...q2CheckBox];
    newQ2List[newQ2List.length - 1].otherDes = event.target.value;
    setQ2CheckBox(newQ2List);
    validateBeforeSubmit();
  };

  const handleOtherQ3Change = (event) => {
    const newQ3List = [...q3CheckBox];
    newQ3List[newQ3List.length - 1].otherDes = event.target.value;
    setQ3CheckBox(newQ3List);
    validateBeforeSubmit();
  };

  const handleAge = (event) => {
    onChangeAge(event.target.value);
  };
  const handleGender = (event) => {
    onChangeGender(event.target.value);
  };

  useEffect(() => {
    validateBeforeSubmit();
  }, [age, gender, q1CheckBox, q2CheckBox, q3CheckBox]);

  const validateBeforeSubmit = () => {
    let isSuccess = true;
    const countQ1Tick = q1CheckBox.reduce((prev, next) => {
      return next.value ? (prev = prev + 1) : prev;
    }, 0);
    if (!countQ1Tick || age === '0' || gender === '0') {
      isSuccess = false;
    }
    if (
      q1CheckBox.find((item) => item.label === 'Others')?.value &&
      q1CheckBox.find((item) => item.label === 'Others')?.otherDes === ''
    ) {
      isSuccess = false;
    }
    if (
      q2CheckBox.find((item) => item.label === 'Others')?.value &&
      q2CheckBox.find((item) => item.label === 'Others')?.otherDes === ''
    ) {
      isSuccess = false;
    }
    if (
      q3CheckBox.find((item) => item.label === 'Others')?.value &&
      q3CheckBox.find((item) => item.label === 'Others')?.otherDes === ''
    ) {
      isSuccess = false;
    }
    setDisableSubmit(!isSuccess);
    return isSuccess;
  };

  const onSubmit = () => {
    const isSuccess = validateBeforeSubmit();
    if (!isSuccess) {
      //validate failure
      return;
    }
    let dataUpdateDemoGraphic = {
      ageRange: age,
      sex: (parseInt(gender, 10) - 1).toString(),
      userProblemOptionsList: [],
    };
    const problem1OptionList = {
      problemId: q1CheckBox[0].problemId,
      problemOptionsIdList: q1CheckBox
        .map((q) => {
          if (q.value === true) {
            return q.id;
          }
        })
        .filter((q) => q),
      details:
        q1CheckBox[q1CheckBox.length - 1].value === true
          ? q1CheckBox[q1CheckBox.length - 1].otherDes
          : '',
    };
    const problem2OptionList = {
      problemId: q2CheckBox[0].problemId,
      problemOptionsIdList: q2CheckBox
        .map((q) => {
          if (q.value === true) {
            return q.id;
          }
        })
        .filter((q) => q),
      details:
        q2CheckBox[q2CheckBox.length - 1].value === true
          ? q2CheckBox[q2CheckBox.length - 1].otherDes
          : '',
    };
    const problem3OptionList = {
      problemId: q3CheckBox[0].problemId,
      problemOptionsIdList: q3CheckBox
        .map((q) => {
          if (q.value === true) {
            return q.id;
          }
        })
        .filter((q) => q),
      details:
        q3CheckBox[q3CheckBox.length - 1].value === true
          ? q3CheckBox[q3CheckBox.length - 1].otherDes
          : '',
    };
    dataUpdateDemoGraphic.userProblemOptionsList = [
      problem1OptionList,
      problem2OptionList,
      problem3OptionList,
    ];
    onChange(dataUpdateDemoGraphic);
  };

  return (
    <>
      <Navbar title="Body Constitution" />
      <div className={styles.container}>
        <div className="container mx-auto mt-8 mb-8 grid justify-items-center relative ">
          <div
            className={`${styles.contain} ${styles.contain_Tell_Us} ${styles.answerContainer}`}
          >
            <div className={styles.header}>Tell us more about you</div>
            <div className="onmb dropdown-container gap-7">
              <div className={styles.inputBox}>
                <div className={`px-2 ${styles.Icon}`}>
                  <img
                    src={`${
                      isMobile ? '/images/9/Age white.png' : '/images/9/Age.png'
                    }`}
                    alt=""
                    width={15}
                    height={14}
                    className="mx-2"
                  />
                </div>
                <label className={styles.selectContainer}>
                  <select className="onmb" value={age} onChange={handleAge}>
                    <option className="brown" value="0">
                      *Choose your age range:
                    </option>
                    <option className="brown" value="less_than_20">
                      {'< 20'}
                    </option>
                    <option className="brown" value="20_to_29">
                      20-29
                    </option>
                    <option className="brown" value="30_to_39">
                      30-39
                    </option>
                    <option className="brown" value="40_to_49">
                      40-49
                    </option>
                    <option className="brown" value="50_to_59">
                      50-59
                    </option>
                    <option className="brown" value="from_60_to_over">
                      60+
                    </option>
                  </select>
                </label>
                <div className={styles.Icon}>
                  <Image
                    src={
                      isMobile
                        ? '/images/9/Vector 5.svg'
                        : '/images/9/Vector 5 brown.svg'
                    }
                    alt=""
                    layout="fill"
                    objectFit="scale-down"
                  />
                </div>
              </div>
              <div className={styles.inputBox}>
                <div className={`px-2 ${styles.Icon}`}>
                  <img
                    src={`${
                      isMobile
                        ? '/images/9/Gender white.png'
                        : '/images/9/Gender.png'
                    }`}
                    alt=""
                    width={16}
                    height={16}
                    className="mx-2"
                  />
                </div>
                <label className={styles.selectContainer}>
                  <select
                    className="onmb"
                    value={gender}
                    onChange={handleGender}
                  >
                    <option className="brown" value="0">
                      *Choose your gender:
                    </option>
                    <option className="brown" value="1">
                      Male
                    </option>
                    <option className="brown" value="2">
                      Female
                    </option>
                    <option className="brown" value="3">
                      Non-binary or non-conforming
                    </option>
                  </select>
                </label>
                <div className={styles.Icon}>
                  <Image
                    src={
                      isMobile
                        ? '/images/9/Vector 5.svg'
                        : '/images/9/Vector 5 brown.svg'
                    }
                    alt=""
                    layout="fill"
                    objectFit="scale-down"
                  />
                </div>
              </div>
            </div>
            <div className="text-left">
              <div className="test-base brown onmb">
                What are your current health and wellbeing goals? *
              </div>
              {q1CheckBox.map((item) => (
                <div key={item.id} className="mt-3">
                  <InputData
                    isChecked={item.value}
                    text={item.label}
                    onChange={(value) => {
                      _setQ1CheckBox({ id: item.id, value });
                    }}
                  />
                </div>
              ))}
              {q1CheckBox.find((item) => item.label === 'Others').value && (
                <textarea
                  className="onmb"
                  placeholder="Please write down in details."
                  onChange={handleOtherQ1Change}
                />
              )}
              <div className="test-base brown onmb">
                What are your current wellness practices?
              </div>
              {q2CheckBox.map((item, ind) => (
                <div key={ind} className="mt-3">
                  <InputData
                    isChecked={item.value}
                    text={item.label}
                    onChange={(value) => _setQ2CheckBox({ id: item.id, value })}
                  />
                </div>
              ))}
              {q2CheckBox.find((item) => item.label === 'Others').value && (
                <textarea
                  className="onmb"
                  placeholder="Please write down in details."
                  onChange={handleOtherQ2Change}
                />
              )}
              <div className="test-base brown onmb">
                Which of these wellness practices interest you?
              </div>
              {q3CheckBox.map((item, ind) => (
                <div key={ind} className="mt-3">
                  <InputData
                    isChecked={item.value}
                    text={item.label}
                    onChange={(value) => _setQ3CheckBox({ id: item.id, value })}
                  />
                </div>
              ))}
              {q3CheckBox.find((item) => item.label === 'Others').value && (
                <textarea
                  className="onmb"
                  placeholder="Please write down in details."
                  onChange={handleOtherQ3Change}
                />
              )}
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={onSubmit}
                className={
                  isDisableSubmit ? styles.disableSubmit : styles.activeSubmit
                }
              >
                Submit Answers
              </button>
            </div>
            <br />
            <div className={styles.copyright}>
              ©2022 Copyright all reserved by Kanpobliss
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
