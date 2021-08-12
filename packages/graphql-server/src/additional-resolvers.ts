/* eslint-disable import/prefer-default-export */
import { Resolvers } from '../.mesh';

export const resolvers: Resolvers = {
  // Your custom resolvers here
  Query: {
    getTrue: async () => {
      return true;
    },
  },
};
