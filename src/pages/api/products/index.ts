import httpStatus from 'http-status';
import type { Filter } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import type { IListOptions } from '@/lib/definitions/query';
import { Products } from '@/lib/products';
import type { IProduct } from '@/lib/products/products.types';
import formatSort from '@/lib/utils/formatSort';
import pick from '@/lib/utils/pick';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const product = await Products.create(req.body);
    if (!product) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Something went wrong while saving your details. Please try again next time'
      );
    }
    res.status(httpStatus.CREATED).json(product);
  } else if (req.method === 'GET') {
    const { offset, count, sortBy }: IListOptions = req.query;
    const query = pick(req.query, [
      'name',
      'category',
      'size',
      'brand',
      'price',
    ]) as Filter<IProduct>;
    const sort = formatSort(sortBy);
    const products = await Products.list({ offset, count }, { sort, query });
    res.status(httpStatus.OK).json(products);
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: 'The API Route does not exist' });
  }
}
