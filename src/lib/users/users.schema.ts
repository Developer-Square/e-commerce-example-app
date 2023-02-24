/* eslint-disable no-underscore-dangle */
import type { toZod } from "tozod";
import { z } from "zod";

import type { IUserCreateParams } from "./users.types";

export const User = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    role: z.enum(['admin', 'seller', 'buyer']),
    isEmailVerified: z.boolean(),
    salt: z.string().min(1),
    _id: z.string().min(1),
    _createdAt: z.date(),
    _updatedAt: z.date(),
  });

export const UserCreateParams: toZod<IUserCreateParams> = User.pick({ name: true, password: true, email: true });

export const UserUpdateParams = User.pick({ name: true, password: true, email: true, role: true, isEmailVerified: true }).partial();

export const ForgotPasswordParams = User.pick({ email: true });

export const LoginParams = User.pick({ name: true, password: true });

export const ResetPasswordParams = User.pick({ password: true });
export const ResetPasswordQuery = z.object({ token: z.string().min(1) });

export const VerifyEmailQuery = z.object({ token: z.string().min(1) });

export const UsersRouteQuery = z.object({ userId: User.shape._id });

export const UsersListQuery = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
    sortBy: z.string().min(1),
    name: User.shape.name,
}).partial();

export const userSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ['name', 'email', 'role', 'password', 'salt', 'isEmailVerified'],
        additionalProperties: false,
        properties: {
            _id: {},
            name: {
                bsonType: "string",
                description: "'name' is required and is a string"
            },
            email: {
                bsonType: "string",
                description: "'email' is required and is a string"
            },
            role: {
                bsonType: "string",
                description: "'role' is required and is a string"
            },
            password: {
                bsonType: "string",
                description: "'password' is required and is a string"
            },
            salt: {
                bsonType: "string",
                description: "'salt' is required and is a string"
            },
            isEmailVerified: {
                bsonType: "bool",
                description: "'isEmailVerified' is required and is a bool"
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