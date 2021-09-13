import { Factory } from 'miragejs';
import * as faker from 'faker';
export const Factories = {
  article: Factory.extend({
    abstract: faker.lorem.words(10),
    content: faker.lorem.paragraphs(10),
  }),
};
