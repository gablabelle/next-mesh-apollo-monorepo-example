import { NextApiRequest, NextApiResponse } from 'next';
import createApolloServer from '@monorepo/graphql-server';

let apolloServerHandler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;

// eslint-disable-next-line import/prefer-default-export
export async function getApolloServerHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (apolloServerHandler) return apolloServerHandler(req, res);
  const server = await createApolloServer();
  apolloServerHandler = server.createHandler({ path: '/api/graphql' });
  return apolloServerHandler(req, res);
}
