import axios from 'axios';
declare module 'axios' {
  export interface AxiosRequestConfig {
    silent?: boolean;
  }
}
