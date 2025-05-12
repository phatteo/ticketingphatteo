import axios from 'axios';
import https from 'https';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // Running on server => dùng baseURL nội bộ và bỏ qua xác thực SSL
    // TODO: change to local
    return axios.create({
      baseURL: 'https://www.hkhviet.xyz',  // hoặc domain bạn đang dùng
      headers: req.headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,  // ✅ Bỏ qua xác thực SSL (chỉ dùng khi dev hoặc test)
      }),
    });
  } else {
    // Running in browser
    return axios.create({
      baseURL: '/',
    });
  }
};
