// next.js /api/graphql.ts
import { NextApiRequest, NextApiResponse } from 'next';
import createApolloServer from '@monorepo/graphql-server';

let apolloServerHandler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (apolloServerHandler) return apolloServerHandler(req, res);
  const server = await createApolloServer();
  apolloServerHandler = server.createHandler({ path: '/api/graphql' });
  return apolloServerHandler(req, res);
};
