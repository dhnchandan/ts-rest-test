import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createExpressEndpoints, initServer } from '@ts-rest/express';
import { contract, PostSchema } from "@ts-rest-test/contracts/dist";
import { z } from "zod";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();

const posts: z.infer<typeof PostSchema>[] = [];

const router = s.router(contract, {
    createPost: async ({ body }) => {
        posts.push({ ...body, id: 1 });
        return {
            status: 201,
            body: { ...body, id: 1 }
        }
    },
    getPosts: async () => {
        return {
            status: 200,
            body: posts,
        }
    },
    getPost: async ({ params: { id } }) => {
        return {
            status: 200,
            body: posts[id],
        }
    },
});

createExpressEndpoints(contract, router, app);

const port = 3333;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
