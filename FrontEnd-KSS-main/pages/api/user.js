// https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/User/User%20information%20module/getUserInfoUsingGET
const userUrl = '/public/sysUser';

class UserService {
  constructor(axios) {
    this.axios = axios;
  }

  getUserInformation = async () => {
    const res = await this.axios.get(`${userUrl}/getUserInfo`);
    return res.data;
  };

  modifyUserInformation = async (user) => {
    const res = await this.axios.post(`${userUrl}/update`, user);
    return res.data;
  };
}

export default UserService;
