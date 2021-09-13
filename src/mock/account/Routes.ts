import { Response } from 'miragejs';
import { Result } from 'classes/Result';
import faker from 'faker';
import { API } from 'api/index';
import { makeServer } from 'mock/index';

export const Routes = (this$: ReturnType<typeof makeServer>) => {
  this$.get(API.USER, function (schema, request) {
    const phone = request.requestHeaders['f3jhp-token'];
    return new Response(
      200,
      {},
      new Result({
        code: 0,
        data: {
          user: schema.findBy('account', { phone }),
        },
      })
    );
  });
  this$.put(API.USER, function (schema, request) {
    const phone = request.requestHeaders['f3jhp-token'];
    const attrs = JSON.parse(request.requestBody);
    schema.findBy('account', { phone })?.update(attrs);
    return new Response(
      200,
      {},
      new Result({
        code: 0,
      })
    );
  });
  this$.get(API.ACCOUNT_LOGOUT, (schema, request) => {
    return new Response(
      200,
      {},
      new Result({
        code: 0,
      })
    );
  });
};
