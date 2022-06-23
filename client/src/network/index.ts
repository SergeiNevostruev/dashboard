import axios, { AxiosRequestConfig } from 'axios';

// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded; charset=UTF-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE';
// axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';


const PostRequest = async ({ url,  method = 'GET', data = {}, params = {}, headers }: AxiosRequestConfig) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      params,
      // baseURL:'http://localhost:8080',
      // proxy: {
      //   protocol: 'http',
      //   host: '127.0.0.1',
      //   port: 8080,
      // },
    });

    return response.data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export default PostRequest;
