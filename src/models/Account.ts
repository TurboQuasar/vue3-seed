import { API } from 'api/index';
import { mockApi } from 'boot/axios';
import { JsonProperty, Serializable } from 'typescript-json-serializer';

@Serializable()
export class Account {
  @JsonProperty() uid: number;
  @JsonProperty() name: string;
  @JsonProperty() phone: string;
  @JsonProperty() email: string;
  @JsonProperty() password: string;
  @JsonProperty() headUrl: string;
  static async logout() {
    await mockApi.get(API.ACCOUNT_LOGOUT);
  }
}
