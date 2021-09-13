import { makeServer } from 'mock/index';

export const Seeds = (server: ReturnType<typeof makeServer>) => {
  server.loadFixtures('books');
  server.createList('book', 20);
};
