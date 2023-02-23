import httpStatus from 'http-status';
import type { Filter } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import type { IListOptions } from '@/lib/definitions/query';
import { catchError } from '@/lib/error-handling';
import { Products } from '@/lib/products';
import type { IProduct } from '@/lib/products/products.types';
import { formatPriceFilter, formatSort, pick } from '@/lib/utils';

async function handler(
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
    const { page, limit, sortBy, priceRange }: IListOptions = req.query;
    const query = pick(req.query, [
      'name',
      'category',
      'size',
      'brand',
    ]) as Filter<IProduct>;

    // Example of sortBy => "name:asc,price:desc"
    // There is no need to have multiple sort criteria
    const sort = formatSort(sortBy);

    // Example of priceRange => "100:1000"
    // The first value is the lower value while the second is the upper one
    // Results are inclusive of both values
    if (priceRange) {
      query.price = formatPriceFilter(priceRange);
    }

    const products = await Products.list({ page, limit }, { sort, query });
    res.status(httpStatus.OK).json(products);
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: 'The API Route does not exist' });
  }
}

export default catchError(handler);
