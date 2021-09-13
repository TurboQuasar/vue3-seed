import {
  deserialize,
  JsonProperty,
  Serializable,
} from 'typescript-json-serializer';
import { api, mockApi } from 'boot/axios';
import { API } from 'api/index';
export interface AccessExistReq {
  account: string;
}
@Serializable()
export class AccessExist {
  constructor() {}
  @JsonProperty() hasAccount: boolean;
  @JsonProperty() hasPassword: boolean;

  static async do(payload: AccessExistReq) {
    const data = await mockApi.get(API.ACCESS_EXIST, { params: payload });
    return deserialize<AccessExist>(data, AccessExist);
  }
}
