import { JsonProperty, Serializable } from 'typescript-json-serializer';

@Serializable()
export class Pagination<T> {
  @JsonProperty() data: T[];
  @JsonProperty() dataSize: number;
  @JsonProperty() end: number;
  @JsonProperty() hasNextPage: boolean;
  @JsonProperty() hasPrePage: boolean;
  @JsonProperty() pageNumber: number;
  @JsonProperty() pageSize: number;
  @JsonProperty() rainbow: number[];
  @JsonProperty() start: number;
  @JsonProperty() totalPage: number;
  @JsonProperty() totalSize: number;
  constructor(payload: Partial<Pagination<T>>) {
    Object.assign(this, payload);
  }
  static empty() {
    return new Pagination({
      data: [],
      dataSize: 0,
      end: 0,
      hasNextPage: false,
      hasPrePage: false,
      pageNumber: 1,
      pageSize: 10,
      rainbow: [],
      start: 0,
      totalPage: 1,
      totalSize: 0,
    });
  }
}
