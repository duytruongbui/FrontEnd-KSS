import React, { useState } from 'react';
import styles from '../../styles/6p.module.css';

export const Answer = ({ onChangeResult, data, ind, arrInd, value }) => {
  const handleChange = () => {
    onChangeResult(value !== 0 ? false : true, ind, arrInd);
  };

  return (
    <>
      <label className={styles.cardcover}>
        <input
          type="checkbox"
          value={value !== 0 || value === 100 ? 'checked' : 'uncheck'}
          onChange={handleChange}
        />
        <div
          className={
            value !== 0
              ? 'transition ease-linear bg-mediumBrown text-tenor text-milk md:min-w-full md:min-h-h71 mobile:min-h-h56 mobile:text-sm border-mediumBrown border-2 rounded-large rounded-br-question font-normal text-base flex flex-col justify-center md:mr-10 mobile:text-center px-15px cursor-pointer'
              : 'bg-transparent text-tenor md:text-mediumBrown mobile:text-white md:min-w-full md:min-h-h71 mobile:min-h-h56 mobile:text-sm md:border-mediumBrown mobile:border-white border-2 rounded-large font-normal text-base flex flex-col justify-center md:mr-10 mobile:text-center px-15px cursor-pointer'
          }
        >
          <span>{data}</span>
        </div>
      </label>
    </>
  );
};

export const RenderQuestion = ({ questionJs, handlePrev, handleNext }) => {
  const [answers, onChangeAnswers] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const updateData = (value, idx) => {
    let newArr = [...answers];
    if (value !== 100) {
      newArr[idx] = value;
      const idxNotApplicable = newArr.findIndex((val) => val === 100);
      if (idxNotApplicable !== -1) {
        newArr[idxNotApplicable] = 0;
      }
    } else {
      newArr.forEach((_val, idxNewArr) => {
        idxNewArr === idx ? (newArr[idxNewArr] = 100) : (newArr[idxNewArr] = 0);
      });
    }
    onChangeAnswers(newArr);
  };
  const handleAns = (value, ind, arrInd) => {
    if (value == true) {
      updateData(ind, arrInd);
    } else {
      updateData(0, arrInd);
    }
  };

  return (
    <div className="">
      <h2 className="mobile:text-xl md:text-3xl font-tenor mobile:text-white md:text-footer mobile:mb-10 md:mb-16">
        {questionJs.question}  Select all that apply.
      </h2>
      <div className="grid md:grid-cols-2 mobile:gap-3 md:gap-4 md:pt-2 md:pb-10">
        {questionJs.answer.map((answer, index) => (
          <div key={index} className="cursor-pointer">
            <Answer
              data={answer.data}
              ind={answer.ind}
              arrInd={index}
              onChangeResult={handleAns}
              value={answers[index]}
            />
          </div>
        ))}
      </div>
      <a
        onClick={() => handleNext(answers, questionJs.answer)}
        className={styles.nextbtn}
      >
        <div className={styles.nextsign}></div>
      </a>
      <a
        onClick={() => handlePrev(answers, questionJs.answer)}
        className={`${styles.prevbtn} ${styles.disabledBtn}`}
      >
        <div className={styles.prevsign}></div>
      </a>
    </div>
  );
};

export const RenderBonus = ({ data, onSub }) => {
  const [answers, onChangeAnswers] = useState(data.map((_) => 0));

  const handleAns = (isSelected, ind, arrInd) => {
    answers[arrInd] = isSelected ? ind : 0;
    onChangeAnswers([...answers]);
  };

  const canSubmit =
    answers.reduce((acc, val) => (val !== 0 ? acc + 1 : acc), 0) === 3;

  return (
    <>
      <h2 className={styles.head2}>
        Out of what you’ve selected previously, select 3 conditions or symptoms
        you feel are most severe now.
      </h2>
      <div className="grid md:grid-cols-2 gap-4 md:pb-10">
        {data.map((selectedAnswers, index) => (
          <div key={index}>
            <Answer
              data={selectedAnswers.content}
              ind={selectedAnswers.ind}
              arrInd={index}
              onChangeResult={handleAns}
              value={answers[index]}
            />
          </div>
        ))}
      </div>
      <button
        className={
          canSubmit
            ? `greenbtn ${styles.customGreenBtn}`
            : `${styles.disableSubmit} ${styles.customGreenBtn}`
        }
        onClick={() => {
          const mantraList = new Array(11).fill(0);
          answers.forEach((val) => {
            val !== 0 && mantraList[val]++;
          });
          const newDragList = data.filter((_, i) => answers[i] != 0);
          console.log('mantraList', mantraList);
          console.log('new dragList', newDragList);
          onSub(mantraList, newDragList);
        }}
        disabled={!canSubmit}
      >
        Continue
      </button>
    </>
  );
};
