// https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/quiz/User%20Question%20Options%20module(public)/getResultUsingGET_1
const quizUrl = '/public/userQuestionOptions';

class QuizService {
  constructor(axios) {
    this.axios = axios;
  }

  getAnswerResult = async (params) => {
    const res = await this.axios.get(`${quizUrl}/getResult`, { params });
    return res.data;
  };

  saveResult = async (params) => {
    const res = await this.axios.get(`${quizUrl}/saveResult`, { params });
    return res.data;
  };

  startAnswerQuestion = async () => {
    const res = await this.axios.get(`${quizUrl}/startAnswerQuestion`);
    return res.data;
  };

  submitAnswer = async () => {
    const res = await this.axios.get(`${quizUrl}/submitAnswer`);
    return res.data;
  };

  submitAnswerSort = async () => {
    const res = await this.axios.get(`${quizUrl}/submitAnswerSort`);
    return res.data;
  };

  submitAnswerText = async (bodyReq) => {
    const res = await this.axios.post(`${quizUrl}/submitAnswerText`, bodyReq);
    return res.data;
  };

  submitAnswerSortText = async () => {
    const res = await this.axios.post(`${quizUrl}/submitAnswerSortText`);
    return res.data;
  };
}

export default QuizService;
