import { NextApiRequest, NextApiResponse } from "next";

import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "../../server/router";
// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Example CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl: "http://localhost:3000/api",
  docsUrl: "https://github.com/jlalmes/trpc-openapi",
  tags: ["auth", "users", "posts"],
});
// Respond with our OpenAPI schema
const hander = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send(openApiDocument);
};

export default hander;
