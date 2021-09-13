import { Serializable } from 'typescript-json-serializer';
import { api } from 'boot/axios';
import { API } from 'api/index';
export interface AccountReplaceBindReq {
  account: string;
  captcha: string;
  token: string;
}
@Serializable()
export class AccountReplaceBind {
  static async do(payload: AccountReplaceBindReq) {
    await api.put(API.ACCOUNT_REPLACE_BIND, payload);
  }
  static async getCaptcha(
    payload: {
      account: string;
      type: number;
    },
    awsc: Object
  ) {
    await api.get(API.ACCOUNT_REPLACE_BIND_CAPTCHA, {
      params: {
        ...payload,
        ...awsc,
      },
    });
  }
}
