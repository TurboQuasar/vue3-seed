import { createServer, Factory, Model, Response } from 'miragejs';
import { config } from 'boot/config';
import {
  BookFactories,
  BookFixtures,
  BookRoutes,
  BookSeeds,
  BookSerializers,
} from 'mock/book';
import { Result } from 'classes/Result';
import { AccessRoutes } from 'mock/access';
import {
  AccountFactories,
  AccountFixtures,
  AccountRoutes,
  AccountSeeds,
  AccountSerializers,
} from 'mock/account';
import {
  ArticleFactories,
  ArticleFixtures,
  ArticleRoutes,
  ArticleSeeds,
  ArticleSerializers,
} from 'mock/article';
export function makeServer({ environment = 'development' } = {}) {
  console.log('mock server started');
  return createServer({
    environment,

    models: {
      book: Model,
      account: Model.extend<
        Partial<{
          id: string;
          uid: number;
          name: string;
          phone: string;
          email: string;
          password: string;
          avatar: string;
        }>
      >({}),
      article: Model.extend<
        Partial<{
          id: string;
          abstract: string;
          content: string;
        }>
      >({}),
    },
    factories: {
      ...BookFactories,
      ...AccountFactories,
      ...ArticleFactories,
    },
    fixtures: {
      ...BookFixtures,
      ...AccountFixtures,
      ...ArticleFixtures,
    },
    serializers: {
      ...BookSerializers,
      ...AccountSerializers,
      ...ArticleSerializers,
    },

    seeds(server) {
      BookSeeds(server);
      AccountSeeds(server);
      ArticleSeeds(server);
    },

    routes() {
      this.passthrough('/api/**');
      this.passthrough('/rest/**');
      this.passthrough('/data/**');
      this.passthrough('/gio/**');
      this.passthrough('/json/**');
      this.passthrough(`${config.$PUBLIC_PATH}**`);
      this.passthrough('https://www.baidu.com/**');
      this.passthrough('https://api.growingio.com/**');
      this.passthrough('https://www.growingio.com/**');
      this.passthrough('https://www.tosign.cn/**');
      this.passthrough('http://124.70.195.38:9080/**');
      this.passthrough('https://mapi.bityuan.com/**');
      this.passthrough(`${process.env.BASE_API}/**`);
      this.passthrough('https://het-wt.oss-cn-shanghai.aliyuncs.com/**');
      this.passthrough('/chain33/');
      this.namespace = process.env.MOCK_API || '';
      BookRoutes(this);
      AccessRoutes(this);
      AccountRoutes(this);
      ArticleRoutes(this);
    },
  });
}
