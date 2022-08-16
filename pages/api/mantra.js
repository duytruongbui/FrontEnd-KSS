// https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/mantra/Mantra%20module(public)/getInfoByNameUsingGET_1
const mantraUrl = '/public/mantra';

class MantraService {
  constructor(axios) {
    this.axios = axios;
  }

  obtainMantraDetails = async (mantraName) => {
    const res = await this.axios.get(
      `${mantraUrl}/getInfoByName?mantraName=${mantraName}`
    );
    return res.data;
  };
}

export default MantraService;
