import {
  deserialize,
  JsonProperty,
  Serializable,
} from 'typescript-json-serializer';
import { mockApi } from 'boot/axios';
import { API } from 'api/index';
export interface AccessLoginReq {
  account: string;
  approve: number;
  captcha: string;
  password: string;
  platform: string;
}
@Serializable()
export class AccessLogin {
  constructor() {}
  @JsonProperty() token: string;

  static async do(payload: AccessLoginReq) {
    const data = await mockApi.post(API.ACCESS_LOGIN, payload);
    return deserialize<AccessLogin>(data, AccessLogin);
  }

  static async getCaptcha(payload: { account: string }, awsc: Object) {
    const data = await mockApi.get(API.ACCESS_LOGIN_CAPTCHA, {
      params: {
        ...payload,
        ...awsc,
      },
    });
  }
}
