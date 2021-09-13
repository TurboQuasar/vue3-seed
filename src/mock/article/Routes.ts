import { Response } from 'miragejs';
import { Result } from 'classes/Result';
import faker from 'faker';
import { API } from 'api/index';
import { makeServer } from 'mock/index';

export const Routes = (this$: ReturnType<typeof makeServer>) => {
  this$.get(API.ARTICLE, function (schema, request) {
    const { id } = request.queryParams;
    return new Response(
      200,
      {},
      new Result({
        code: 0,
        data: schema.find('article', id),
      })
    );
  });
};
