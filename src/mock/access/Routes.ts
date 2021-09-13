import { Response } from 'miragejs';
import { Result } from 'classes/Result';
import faker from 'faker';
import { API } from 'api/index';
import { makeServer } from 'mock/index';

export const Routes = (this$: ReturnType<typeof makeServer>) => {
  this$.get(API.ACCESS_LOGIN_CAPTCHA, function (schema, request) {
    return new Response(
      200,
      {},
      new Result({
        code: 0,
        data: faker.datatype.number(6),
      })
    );
  });
  this$.get(API.ACCESS_PASSWORD_CAPTCHA, function (schema, request) {
    return new Response(
      200,
      {},
      new Result({
        code: 0,
        data: faker.datatype.number(6),
      })
    );
  });
  this$.get(API.ACCESS_EXIST, function (schema, request) {
    const { account } = request.queryParams;
    const data = schema.findBy('account', { phone: account });
    return new Response(
      200,
      {},
      new Result({
        code: 0,
        data: {
          hasAccount: Boolean(data),
          hasPassword: Boolean(data?.password),
        },
      })
    );
  });
  this$.post(API.ACCESS_PASSWORD, function (schema, request) {
    const { account, newPassword } = JSON.parse(request.requestBody);
    schema
      .findBy('account', { phone: account })
      ?.update({ password: newPassword });

    return new Response(
      200,
      {},
      new Result({
        code: 0,
      })
    );
  });
  this$.post(API.ACCESS_LOGIN, function (schema, request) {
    const { account } = JSON.parse(request.requestBody);
    const r = schema.findOrCreateBy('account', { phone: account });
    return new Response(
      200,
      {},
      new Result({
        code: 0,
        data: {
          token: r.phone,
        },
      })
    );
  });
};
