import Image from 'next/image';
import Navbar, { MBFooter, Footer } from './navbar';
import styles from '../../styles/6p.module.css';
import { useState, useEffect } from 'react';
import Content10 from './views/10';
import { AllQuestions, MantraList } from '../../components/quiz/quiz1data';
import { RenderQuestion, RenderBonus } from '../../components/quiz/QuesList';
import DragItems from '../../components/quiz/dragItems';
import { useMediaQuery } from 'react-responsive';
import Popup from 'reactjs-popup';
import { useRouter } from 'next/router';
import api from '../api';
import { StorageName } from '../../common/constant';
import { validateTimeExpired } from '../../common/utils';

const quiz = ({ Q1List, Q2List, Q3List }) => {
  const router = useRouter();
  const [curPage, onChangePage] = useState(0);
  const [result, onChangeResult] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [showItem, onChangeShow] = useState(false);
  const [ansLists, onChangeAnsLists] = useState([]);
  const [mantra, onChangeMantra] = useState(() =>
    Math.max(
      MantraList.findIndex(
        (m) => m.toUpperCase() === (router.query.Mantra || '').toUpperCase()
      ),
      0
    )
  );
  const [dragl, setDragL] = useState([]);

  const showMantra = router.query.showMantra === 'true';
  const hotelID = router.query.hotel;

  const onShowMantra = async (showMantraBool, mantraName) => {
    const tokenStorage = localStorage.getItem(StorageName);
    if (
      tokenStorage !== null &&
      !validateTimeExpired(JSON.parse(tokenStorage).expired)
    ) {
      const resCheckProblem = await api.userProblem.checkProblem();
      if (
        resCheckProblem.messages === 'success' &&
        resCheckProblem.data === true
      ) {
        router.push({
          pathname: `/${hotelID}/home`,
          query: {
            ...router.query,
            showMantra: showMantraBool,
            ...(showMantraBool ? { Mantra: mantraName } : {}),
          },
        });
      } else {
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            showMantra: showMantraBool,
            ...(showMantraBool ? { info: true, Mantra: mantraName } : {}),
          },
        });
      }
    } else {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          showMantra: showMantraBool,
          ...(showMantraBool ? { info: true, Mantra: mantraName } : {}),
        },
      });
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);

  const [winReady, setWinReady] = useState(false);

  const [resultTie, onResultTie] = useState(false);

  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  useEffect(() => {
    setWinReady(true);
  }, []);

  const onSubmit = () => {
    let resSorted = [];
    result.map((el, indx) => (indx < 11 ? resSorted.push(el) : null));
    resSorted[0] = 0;
    let mantraList = [];
    resSorted.map((el, index) => {
      el == Math.max(...resSorted) ? mantraList.push(index) : null;
    });
    let res = [];
    let resultTieCheck = false;
    let changeShowCheck = false;
    if (mantraList.length === 1) {
      onChangeMantra(mantraList[0]);
      resultTieCheck = false;
      onShowMantra(true, MantraList[mantraList[0]]);
    } else if (mantraList.length <= 3) {
      mantraList.map((mantraEl) => {
        let checkStop = true;
        let i = 0;
        while (checkStop) {
          ansLists[i][1] == mantraEl ? (checkStop = false) : i++;
        }
        res.push(ansLists[i]);
      });
      resultTieCheck = false;
      changeShowCheck = true;
    } else {
      mantraList.map((mantraEl) => {
        let i = 0;
        if (ansLists) {
          while (i < ansLists.length) {
            if (ansLists[i])
              ansLists[i][1] == mantraEl ? res.push(ansLists[i]) : null;
            i++;
          }
        }
      });
      resultTieCheck = true;
      changeShowCheck = true;
    }
    let convertDrag = [];
    res.map((cont, idx) => {
      convertDrag.push({
        content: cont[0],
        ind: cont[1],
        id: `item-${idx}`,
      });
    });
    setDragL(convertDrag);
    onResultTie(resultTieCheck);
    onChangeShow(changeShowCheck);
  };

  const onSecondSubmit = (anss, newDragList) => {
    const selectedMantra = anss.findIndex((val) => val >= 2);
    if (selectedMantra > 0) {
      onChangeMantra(selectedMantra);
      onShowMantra(true, MantraList[selectedMantra]);
      onResultTie(false);
    } else {
      setDragL(newDragList);
      onResultTie(false);
      onChangeShow(true);
    }
  };

  const showResultMantra = (Mantra) => {
    onChangeMantra(Mantra[0].ind);
    onShowMantra(true, MantraList[Mantra[0].ind]);
    console.log(mantra);
  };

  const handleNextPage = async (resArr, ansList) => {
    try {
      const res = await api.quiz.submitAnswerText({
        questionOptionsTextList: ansList
          .filter((_as, idx) => {
            if (resArr[idx] > 0) {
              return true;
            }
            return false;
          })
          .map((as) => as.data),
        topic: AllQuestions[curPage].question,
        uuid: router.query.uuid,
      });
    } catch (error) {
      alert(error);
    }
    //
    if (resArr.reduce((a, b) => a + b, 0) > 0) {
      curPage < 9 ? onChangePage(curPage + 1) : onChangePage(curPage);
      let new_arr = result;
      let temp_ans_list = ansLists;
      resArr.map((resInd, index) => {
        new_arr[resInd]++;
        resInd > 0
          ? temp_ans_list.push([ansList[index].data, ansList[index].ind])
          : null;
      });
      onChangeResult(new_arr);
      onChangeAnsLists(temp_ans_list);
      if (curPage === 9) {
        const isAllNotApplicable = new_arr.every((val, i) =>
          1 <= i && i <= 10 ? val === 0 : true
        );
        if (!isAllNotApplicable) {
          onSubmit();
        } else {
          showDialog();
          onChangePage(0);
        }
      }
    } else {
      showDialog();
    }
  };
  const showDialog = () => {
    setOpenModal(true);
  };

  const handlePrevPage = (resArr, ansList) => {
    if (resArr.reduce((a, b) => a + b, 0) > 0) {
      curPage > 0 ? onChangePage(curPage - 1) : onChangePage(curPage);
      if (curPage > 0) {
        let new_arr = result;
        let temp_ans_list = ansLists;
        resArr.map((resInd, index) => {
          new_arr[resInd]--;
          resInd > 0
            ? temp_ans_list.push([ansList[index].data, ansList[index].ind])
            : null;
        });
        onChangeResult(new_arr);
        onChangeAnsLists(temp_ans_list);
      }
    }
  };

  return (
    <>
      <Popup
        open={openModal}
        closeOnDocumentClick
        onClose={closeModal}
        modal
        className="popup-quiz"
      >
        <Image src="/images/9/trident-eye.png" alt="" width={60} height={60} />
        <p className={styles.textPopup}>
          You need to answer this question to get to the assessment result.
        </p>
        <button className="greenbtn-2 mt-4" onClick={closeModal}>
          ANSWER
        </button>
      </Popup>
      <div className={styles.container}>
        <div className={!showMantra ? '' : 'hidden'}>
          <Navbar />
          <p className={styles.title}>Body Constitution</p>
        </div>
        {showMantra ? (
          <div>
            <Content10
              Mantra={MantraList[mantra]}
              Q1CheckBoxInit={Q1List}
              Q2CheckBoxInit={Q2List}
              Q3CheckBoxInit={Q3List}
            />
          </div>
        ) : (
          <div className={!showMantra ? '' : 'hidden'}>
            <div className="md:container md:mx-auto md:mb-20 md:mt-[-30px] md:grid md:items-center md:relative">
              <div className={styles.contain}>
                <div className={`md:container md:mx-auto`}>
                  {resultTie ? (
                    <RenderBonus data={dragl} onSub={onSecondSubmit} />
                  ) : (
                    <div className="mobile:w-full">
                      <div
                        className={showItem && !showMantra ? 'block' : 'hidden'}
                      >
                        <div
                          className={`${styles.head2} ${styles.customTopTitle}`}
                        >
                          Drag & re-order the symptoms you’ve selected
                          previously in the order of severity.
                        </div>
                        <div
                          className={`${styles.head3} ${styles.customSubtile}`}
                        >
                          Tap and hold the system before dragging. 1 being most
                          severe.
                        </div>
                        {winReady && showItem && !showMantra ? (
                          <DragItems
                            allItems={dragl}
                            onSub={showResultMantra}
                            isMobile={isMobile}
                          />
                        ) : null}
                      </div>
                      <div className={!showItem ? 'block' : 'hidden'}>
                        {AllQuestions.map((content, index) => (
                          <div
                            className={curPage == index ? 'block' : 'hidden'}
                            key={index * 100}
                          >
                            <RenderQuestion
                              questionJs={content}
                              handlePrev={handlePrevPage}
                              handleNext={handleNextPage}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4"></div>
              <div
                className={
                  !showItem ? 'block relative justify-center mt-4' : 'hidden'
                }
              >
                <div className="text-center text-sm -mt-2 nearwhite">
                  {curPage + 1} / 10
                </div>
                <div className={styles.graybar}>
                  <div
                    className={styles.greenbar}
                    style={{ width: 25 + curPage * 25 }}
                  ></div>
                </div>
              </div>
            </div>
            <MBFooter />
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const resQuizDemoGraphic = await api.userProblem.queryList();
  const Q1List = resQuizDemoGraphic.data[0].problemOptionsList.map((q) => ({
    ...q,
    value: false,
    label: q.options,
    otherDes: '',
  }));
  const Q2List = resQuizDemoGraphic.data[1].problemOptionsList.map((q) => ({
    ...q,
    value: false,
    label: q.options,
    otherDes: '',
  }));
  const Q3List = resQuizDemoGraphic.data[2].problemOptionsList.map((q) => ({
    ...q,
    value: false,
    label: q.options,
    otherDes: '',
  }));
  return {
    props: {
      Q1List,
      Q2List,
      Q3List,
    },
  };
};

export default quiz;
