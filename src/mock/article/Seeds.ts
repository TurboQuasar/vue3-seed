import { makeServer } from 'mock/index';

export const Seeds = (server: ReturnType<typeof makeServer>) => {
  server.loadFixtures('articles');
  server.createList('article', 2);
};
