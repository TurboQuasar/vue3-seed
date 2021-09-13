import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { api } from 'boot/axios';
import { API } from 'api/index';
export interface AccountBindReq {
  account: string;
  captcha: string;
}
@Serializable()
export class AccountBind {
  static async do(payload: AccountBindReq) {
    await api.post(API.ACCOUNT_BIND, payload);
  }
  static async getCaptcha(payload: { account: string }, awsc: Object) {
    await api.get(API.ACCOUNT_BIND_CAPTCHA, {
      params: {
        ...payload,
        ...awsc,
      },
    });
  }
}
