/* eslint-disable no-underscore-dangle */
import type { toZod } from "tozod";
import { z } from "zod";

import type { IProduct, IProductLean } from "./products.types";

export const Product: toZod<IProduct> = z.object({
    _id: z.string().min(1),
    _createdAt: z.date(),
    _updatedAt: z.date(),
    name: z.string().min(1),
    price: z.number().min(1),
    productInfo: z.string().min(1),
    materialUsed: z.string().min(1),
    images: z.array(z.string().min(1)),
    category: z.string().min(1),
    brand: z.string().min(1).optional(),
    size: z.string().min(1).optional(),
    quantity: z.number().min(0),
});

export const ProductCreateParams: toZod<IProductLean> = Product.omit({ _id: true, _createdAt: true, _updatedAt: true });

export const ProductUpdateParams = ProductCreateParams.partial();

export const ProductsRouteQuery = z.object({ productId: Product.shape._id });

export const ProductsListQuery = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
    sortBy: z.string().min(1),
    name: Product.shape.name,
    category: Product.shape.category,
    size: Product.shape.size,
    brand: Product.shape.brand,
}).partial();

export const productSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ['name', 'price', 'productInfo', 'materialUsed', 'images', 'category', 'quantity'],
        additionalProperties: false,
        properties: {
            _id: {},
            name: {
                bsonType: "string",
                description: "'name' is required and is a string"
            },
            price: {
                bsonType: "number",
                description: "'price' is required and is a number"
            },
            productInfo: {
                bsonType: "string",
                description: "'productInfo' is required and is a string"
            },
            materialUsed: {
                bsonType: "string",
                description: "'materialUsed' is required and is a string"
            },
            images: {
                bsonType: ["array"],
                minItems: 1,
                description: "at least 1 'images' item is required and is a string",
                items: {
                bsonType: "string",
                description: "'images item' must be a string"
                }
            },
            category: {
                bsonType: "string",
                description: "'category' is required and is a string"
            },
            quantity: {
                bsonType: "number",
                description: "'quantity' is required and is a number"
            },
            brand: {
                bsonType: "string",
                description: "'brand' is optional and is a string"
            },
            size: {
                bsonType: "string",
                description: "'size' is optional and is a string"
            },
            _createdAt: {
                bsonType: "date",
                description: "'_createdAt' is optional and is a date"
            },
            _updatedAt: {
                bsonType: "date",
                description: "'_updatedAt' is optional and is a date"
            },
        }
    },
};