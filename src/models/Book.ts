import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { mockApi } from 'boot/axios';
import { API } from 'api/index';
export interface BookPutReq {
  id: number;
  title: string;
  author: string;
}
export interface BookPostReq {
  title: string;
  author: string;
}
@Serializable()
export class Book {
  @JsonProperty() id: number;
  @JsonProperty() title: string;
  @JsonProperty() author: string;
  @JsonProperty() rating: 3.4;
  static async delete(payload: { id: number }) {
    await mockApi.delete(API.BOOK, {
      data: payload,
    });
  }
  static async put(payload: BookPutReq) {
    await mockApi.put(API.BOOK, payload);
  }
  static async post(payload: BookPostReq) {
    await mockApi.post(API.BOOK, payload);
  }
}
