import { Pagination } from 'models/Pagination';
import { Response } from 'miragejs';
import { Result } from 'classes/Result';
import faker from 'faker';
import { makeServer } from 'mock/index';

export const Routes = (this$: ReturnType<typeof makeServer>) => {
  this$.get('/book', function (schema, request) {
    const { page, size } = request.queryParams;
    const pageNumber = Number(page);
    const pageSize = Number(size);
    const totalSize = schema.all('book').length;
    const totalPage = Math.ceil(totalSize / pageSize);
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    const hasNextPage = totalPage > pageNumber;
    const hasPrePage = pageNumber > 1;
    const data = schema.all('book').models.slice(start, end);
    return new Response(
      200,
      {},
      new Result({
        code: 0,
        data: new Pagination({
          data,
          dataSize: totalSize,
          end,
          hasNextPage,
          hasPrePage,
          pageNumber,
          pageSize,
          rainbow: [],
          start,
          totalPage,
          totalSize,
        }),
      })
    );
  });
  this$.delete('/book', function (schema, request) {
    const { id } = JSON.parse(request.requestBody);
    schema.find('book', id)?.destroy();
    return new Response(
      200,
      {},
      new Result({
        code: 0,
      })
    );
  });
  this$.post('/book', function (schema, request) {
    const attrs = JSON.parse(request.requestBody);
    schema.create('book', {
      ...attrs,
      rating: faker.datatype.number(50) / 10,
    });
    return new Response(
      200,
      {},
      new Result({
        code: 0,
      })
    );
  });
  this$.put('/book', function (schema, request) {
    const attrs = JSON.parse(request.requestBody);
    schema.find('book', attrs.id)?.update(attrs);
    return new Response(
      200,
      {},
      new Result({
        code: 0,
      })
    );
  });
};
