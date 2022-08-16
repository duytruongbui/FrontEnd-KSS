// https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/Gym%20And%20Spa/Mantra%20Activity%20module(public)/getActivityInfoUsingGET
const gymAndSpaUrl = '/public/mantraActivity';
class GymAndSpaService {
  constructor(axios) {
    this.axios = axios;
  }

  inquireAboutActivityDetails = async (mantraId, activityId) => {
    const res = await this.axios.get(
      `${gymAndSpaUrl}/getActivityInfo?activityId=${activityId}&mantraId=${mantraId}`
    );
    return res.data;
  };

  pagingToQueryActivityOfMantra = async (pagingBody) => {
    const res = await this.axios.post(
      `${gymAndSpaUrl}/queryActivityPage`,
      pagingBody
    );
    return res.data;
  };
}

export default GymAndSpaService;
