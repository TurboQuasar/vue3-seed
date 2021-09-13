import { Factory } from 'miragejs';
import * as faker from 'faker';
export const Factories = {
  book: Factory.extend({
    title(i) {
      return `Book ${i}`;
    },
    author() {
      return faker.name.findName();
    },
    cover() {
      return faker.image.image();
    },
    rating() {
      return faker.datatype.number(50) / 10;
    },
  }),
};
