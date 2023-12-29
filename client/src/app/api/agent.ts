//centralizing axios requests
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
//default base url for all axios requests
axios.defaults.baseURL = 'http://localhost:5000/api/';

//delay function
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

//helper method to simplify response from axios
const responseBody = (response: AxiosResponse) => response.data;

//axios error responses with toast notifications
axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        //if validation error
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        //else throw regular 400 notification
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        //redirect
        router.navigate('/server-error', { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

//centralizing axios calls by creating requests object defined with methods for each type of HTTP request
//then apply responseBody to each result
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorized'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  getValidationError: () => requests.get('buggy/validation-error'),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
