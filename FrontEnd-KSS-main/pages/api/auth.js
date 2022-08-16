const authUrl = '/auth';

class AuthService {
  constructor(axios) {
    this.axios = axios;
  }

  // https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/Login%20And%20Register/Authentication/loginUsingPOST
  // Example data:
  // {
  // 	"application": "KANPOBLIS",
  // 	"password": "123456",
  // 	"username": "649318073@qq.com"
  // }
  login = async (loginForm) => {
    const res = await this.axios.post(`${authUrl}/login`, loginForm);
    return res.data;
  };

  // https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/Login%20And%20Register/Authentication/registerUsingPOST
  // Example data:
  // {
  // 	"application": "KANPOBLIS",
  // 	"firstName": "wu",
  // 	"lastName": "peng",
  // 	"password": "123456",
  // 	"source": "H5",
  // 	"username": "649318073@qq.com"
  // }
  register = async (signupForm) => {
    const res = await this.axios.post(`${authUrl}/register`, signupForm);
    return res.data;
  };

  // https://kanpobliss.server.eluzh.com/kanpobliss/doc.html#/Login%20And%20Register/Authentication/changePasswordUsingPOST
  // Example data:
  // {
  // 	"application": "KANPOBLIS",
  // 	"password": "123456",
  // 	"username": "649318073@qq.com"
  // }
  changePassword = async (changePasswordForm) => {
    const res = await this.axios.post(
      `${authUrl}/changePassword`,
      changePasswordForm
    );
    return res.data;
  };

  checkAccount = async (params) => {
    const res = await this.axios.get(`${authUrl}/checkAccount`, { params });
    return res.data;
  };
}

export default AuthService;
