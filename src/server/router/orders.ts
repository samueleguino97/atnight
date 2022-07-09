import { createRouter } from "./context";
import { z } from "zod";
import Pusher from "pusher";
const pusher = new Pusher({
  appId: "1435237",
  key: "f48d597a5baeec8518de",
  secret: "db760ffc027bd2ac05dd",
  cluster: "sa1",
  useTLS: true,
});

export const orderRouter = createRouter()
  .mutation("place", {
    meta: {
      openapi: {
        enabled: true,
        method: "POST",
        path: "/place" /* 👈 */,
      },
    },
    input: z.object({ name: z.string() /* 👈 */, description: z.string() }),
    output: z.object({
      success: z.boolean(),
      prod: z.object({
        name: z.string(),
        description: z.string(),
        id: z.string(),
        created_at: z.date(),
      }),
    }),
    resolve: async ({ input, ctx }) => {
      console.log(ctx.prisma);
      const prod = await ctx.prisma.product.create({
        data: { name: input.name, description: input.description },
        select: { description: true, name: true, id: true, created_at: true },
      });
      pusher.trigger("orders", "new-order", {
        prod,
      });
      return {
        success: true,
        prod: prod,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.product.findMany({
        orderBy: { created_at: "desc" },
      });
    },
  });
