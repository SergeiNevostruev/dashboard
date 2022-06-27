import axios, { AxiosRequestConfig } from 'axios';

const PostRequest = async ({ url,  method = 'GET', data = {}, params = {}, headers }: AxiosRequestConfig) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      params,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export default PostRequest;
