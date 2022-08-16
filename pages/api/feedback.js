// https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/feedback/Feedback%20module(public)/queryListUsingGET_3
const feedbackUrl = '/public/feedback';

class FeedbackService {
  constructor(axios) {
    this.axios = axios;
  }

  queryFeedback = async () => {
    const res = await this.axios.get(`${feedbackUrl}/queryList`);
    return res.data;
  };

  addFeedback = async (feedback) => {
    const res = await this.axios.post(`${feedbackUrl}/save`, feedback);
    return res.data;
  };

  checkUserFeedback = async () => {
    const res = await this.axios.get(`${feedbackUrl}/checkUserFeedback`);
    return res.data;
  };
}

export default FeedbackService;
