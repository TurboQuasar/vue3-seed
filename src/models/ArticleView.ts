import {
  deserialize,
  JsonProperty,
  Serializable,
} from 'typescript-json-serializer';
import { mockApi } from 'boot/axios';
import { API } from 'api/index';

@Serializable()
export class ArticleView {
  @JsonProperty()
  abstract: string;
  @JsonProperty()
  content: string;
  static async get(id: string) {
    const data = await mockApi.get(API.ARTICLE, {
      params: {
        id,
      },
    });
    return deserialize<ArticleView>(data, ArticleView);
  }
}
