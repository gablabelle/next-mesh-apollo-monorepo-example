import { NextApiRequest, NextApiResponse } from 'next';
import { getApolloServerHandler } from 'global';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return getApolloServerHandler(req, res);
};
