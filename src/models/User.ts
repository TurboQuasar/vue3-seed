import {
  deserialize,
  JsonProperty,
  Serializable,
} from 'typescript-json-serializer';
import { mockApi } from 'boot/axios';
import { API } from 'api/index';
@Serializable()
export class User {
  @JsonProperty() user: Account;
  static async get() {
    const data = await mockApi.get(API.USER);
    return deserialize<User>(data, User);
  }
  static async put(payload: { headUrl: string; name: string }) {
    const data = await mockApi.put(API.USER, payload);
  }
}
