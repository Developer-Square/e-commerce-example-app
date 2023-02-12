import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Products } from '@/lib/products';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.query;
  if (req.method === 'GET') {
    const product = await Products.get(productId as string);
    res.status(httpStatus.OK).json(product);
  } else if (req.method === 'PATCH') {
    const product = await Products.update(productId as string, req.body);
    res.status(httpStatus.OK).json(product);
  } else if (req.method === 'DELETE') {
    await Products.delete(productId as string);
    res.status(httpStatus.OK).send({});
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: 'The API Route does not exist' });
  }
}
