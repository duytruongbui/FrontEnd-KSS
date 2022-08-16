// https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/Guided%20Practices/Guided%20Practices%20module(public)/getInfoUsingGET
const guidePracticesUrl = '/public/guidedPractices';
const guidePracticesTypeUrl = '/public/guidedPracticesType';

class GuidePracticeService {
  constructor(axios) {
    this.axios = axios;
  }

  getInfo = async (id) => {
    const res = await this.axios.get(`${guidePracticesUrl}/getInfo?id=${id}`);
    return res.data;
  };

  getType = async (params) => {
    const res = await this.axios.get(`${guidePracticesTypeUrl}/queryList`, {
      params,
    });
    return res.data;
  };

  queryPage = async (pagingBody) => {
    const res = await this.axios.post(
      `${guidePracticesUrl}/queryPage`,
      pagingBody
    );
    return res.data;
  };
}

export default GuidePracticeService;
