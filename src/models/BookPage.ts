import { Pagination } from 'models/Pagination';
import { Book } from 'models/Book';
import {
  deserialize,
  JsonProperty,
  Serializable,
} from 'typescript-json-serializer';
import { mockApi } from 'boot/axios';
import { API } from 'api/index';
export interface BookPageReq {
  page: number;
  size: number;
}
@Serializable()
export class BookPage extends Pagination<Book> {
  @JsonProperty() data: Book[];
  static async get(payload: BookPageReq) {
    const data = await mockApi.get(API.BOOK, {
      params: payload,
    });
    return deserialize<BookPage>(data, BookPage);
  }
}
