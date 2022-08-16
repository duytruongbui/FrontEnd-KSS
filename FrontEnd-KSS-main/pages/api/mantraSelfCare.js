// https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/Mantra%20Self%20Care/Mantra%20Self%20Care%20module(public)/getRecommendSelfCareUsingGET
const mantraSelfCareUrl = '/public/mantraSelfCare';

class MantraSelfCareService {
  constructor(axios) {
    this.axios = axios;
  }

  getReferralSelfCare = async (params) => {
    const res = await this.axios.get(
      `${mantraSelfCareUrl}/getRecommendSelfCare`,
      { params }
    );
    return res.data;
  };

  pagingToQuerySelfCareOfCertain = async (pagingBody) => {
    const res = await this.axios.post(
      `${mantraSelfCareUrl}/querySelfCarePage`,
      pagingBody
    );
    return res.data;
  };
}

export default MantraSelfCareService;
