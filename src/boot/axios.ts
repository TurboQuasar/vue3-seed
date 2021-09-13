import { boot } from 'quasar/wrappers';
import axios, { AxiosRequestConfig, Canceler } from 'axios';
import { store } from 'store/index';
import { config } from 'boot/config';
import { Result } from 'classes/Result';
import { NotifyUtil } from 'utils/MessageUtils';
import qs from 'qs';
export const pendingRequest = new Map<string, Canceler>();
export function generateReqKey(config: AxiosRequestConfig) {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&');
}
export function addPendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}
export function removePendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken && cancelToken(requestKey);
    pendingRequest.delete(requestKey);
  }
}
function createInstance(options: AxiosRequestConfig) {
  const instance = axios.create(options);
  // 请求拦截
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = store.getters['auth/getToken'];
      config.headers['f3jhp-token'] = token;
      removePendingRequest(config);
      addPendingRequest(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //响应拦截
  instance.interceptors.response.use(
    (response) => {
      removePendingRequest(response.config);
      if (typeof response.data === 'string') {
        return response.data;
      }
      const data: Result<any> = response.data;
      let message: string | undefined = '未知错误';
      switch (data.code) {
        case 0:
          return data.data;
        case -1:
        case 500:
        case 404:
        case 302:
          if (!options.silent) {
            message = data.message;
            NotifyUtil.warning(message);
          }
          break;
        default:
          if (!options.silent) {
            message = data.message;
            NotifyUtil.warning(message);
          }
          break;
      }
      return Promise.reject(data);
    },
    (error) => {
      if (axios.isCancel(error)) {
        return new Promise(() => {});
      }
      if (!options.silent) {
        let message: string | undefined = '未知错误';

        if (
          error.code === 'ECONNABORTED' ||
          error.message.indexOf('timeout') !== -1 ||
          error.message === 'Network Error'
        ) {
          message = '网络异常';
          NotifyUtil.warning(message);
          return Promise.reject(error);
        }
        switch (error.response?.status) {
          case 403:
            message = '拒绝访问(403)';
            NotifyUtil.warning(message);
            break;
          case 404:
            message = '资源不存在(404)';
            NotifyUtil.warning(message);
            break;
          case 408:
            message = '请求超时(404)';
            NotifyUtil.warning(message);
            break;
          case 500:
            message = '服务器错误(500)';
            NotifyUtil.warning(message);
            break;
          case 501:
            message = '服务未实现(501)';
            NotifyUtil.warning(message);
            break;
          case 502:
            message = '网络错误(502)';
            NotifyUtil.warning(message);
            break;
          case 503:
            message = '服务不可用(503)';
            NotifyUtil.warning(message);
            break;
          case 504:
            message = '网络超时(504)';
            NotifyUtil.warning(message);
            break;
          case 505:
            message = 'HTTP版本不受支持(505)';
            NotifyUtil.warning(message);
            break;
          default:
            NotifyUtil.warning(message);
            break;
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
}
const api = createInstance({
  baseURL: process.env.BASE_API,
  timeout: config.$timeOut,
  withCredentials: true,
});
const silentApi = createInstance({
  baseURL: process.env.BASE_API,
  timeout: config.$timeOut,
  withCredentials: true,
  silent: true,
});
const mockApi = createInstance({
  baseURL: process.env.MOCK_API,
  timeout: config.$timeOut,
});
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  app.config.globalProperties.$silentApi = silentApi;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$mockApi = mockApi;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, api, mockApi };
