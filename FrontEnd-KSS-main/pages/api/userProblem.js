import axios from 'axios';

// https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/User%20Problem%20Options/User%20Problem%20Options%20module(public)/checkProblemUsingGET
const userProblemUrl = '/public/userProblemOptions';

class UserProblemService {
  constructor(axios) {
    this.axios = axios;
  }

  checkProblem = async () => {
    const res = await this.axios.get(`${userProblemUrl}/checkProblem`);
    return res.data;
  };

  submitAnswers = async (bodyReq) => {
    const res = await this.axios.post(
      `${userProblemUrl}/submitAnswers`,
      bodyReq
    );
    return res.data;
  };

  queryList = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/public/problem/queryList`
    );
    return res.data;
  };
}

export default UserProblemService;
