import { Serializable } from 'typescript-json-serializer';
import { mockApi } from 'boot/axios';
import { API } from 'api/index';
export interface AccountPasswordReq {
  account: string;
  captcha: string;
  newPassword: string;
}
@Serializable()
export class AccessPassword {
  static async do(payload: AccountPasswordReq) {
    const data = await mockApi.post(API.ACCESS_PASSWORD, payload);
  }
  static async getCaptcha(payload: { account: string }, awsc: Object) {
    const data = await mockApi.get(API.ACCESS_PASSWORD_CAPTCHA, {
      params: {
        ...payload,
        ...awsc,
      },
    });
  }
}
