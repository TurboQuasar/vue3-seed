import {
  deserialize,
  JsonProperty,
  Serializable,
} from 'typescript-json-serializer';
import { api } from 'boot/axios';
import { API } from 'api/index';
export interface AccountReplaceReq {
  captcha: string;
  type: number;
}
@Serializable()
export class AccountReplace {
  @JsonProperty() token: string;
  static async do(payload: AccountReplaceReq) {
    const data = await api.put(API.ACCOUNT_REPLACE, payload);
    return deserialize<AccountReplace>(data, AccountReplace);
  }
  static async getCaptcha(payload: { type: number }, awsc: Object) {
    await api.get(API.ACCOUNT_REPLACE_CAPTCHA, {
      params: {
        ...payload,
        ...awsc,
      },
    });
  }
}
