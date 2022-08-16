// https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/Food%20And%20Drinks/Mantra%20Place%20Goods%20module(public)/getFoodAndDrinksDetailUsingGET
const foodAndDrinksUrl = '/public/mantraPlaceGoods';

class FoodAndDrinksService {
  constructor(axios) {
    this.axios = axios;
  }

  getFoodAndDrinksDetail = async (params) => {
    const res = await this.axios.get(
      `${foodAndDrinksUrl}/getFoodAndDrinksDetail`,
      { params }
    );
    return res.data;
  };

  queryFoodAndDrinksPage = async (pagingBody) => {
    const res = await this.axios.post(
      `${foodAndDrinksUrl}/queryFoodAndDrinksPage`,
      pagingBody
    );
    return res.data;
  };

  queryPlaceList = async (params) => {
    const res = await this.axios.get(`${foodAndDrinksUrl}/queryPlaceList`, {
      params,
    });
    return res.data;
  };
}

export default FoodAndDrinksService;
