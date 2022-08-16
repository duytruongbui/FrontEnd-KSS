// https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/Guided%20Practices%20Type/Guided%20Practices%20Type%20module(public)/queryListUsingGET
const guidePracticeTypesUrl = '/public/guidedPracticesType';

class GuidePracticeTypeService {
  constructor(axios) {
    this.axios = axios;
  }

  queryAll = async () => {
    const res = await this.axios.get(`${guidePracticeTypesUrl}/queryList`);
    return res.data;
  };
}

export default GuidePracticeTypeService;
