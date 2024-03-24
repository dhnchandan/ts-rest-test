import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const PostSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
});

export const contract = c.router({
    createPost: {
        method: "POST",
        path: "/",
        body: z.object({
            title: z.string(),
            description: z.string(),
        }),
        responses: {
            201: PostSchema,
        },
        summary: "Create new post",
    },
    getPosts: {
        method: "GET",
        path: "/",
        responses: {
            200: PostSchema.array(),
        },
        summary: "Get all posts",
    },
    getPost: {
        method: 'GET',
        path: `/:id`,
        pathParams: z.object({
            id: z.coerce.number(),
        }),
        responses: {
            200: PostSchema.nullable(),
        },
        summary: 'Get a post by id',
    },
});