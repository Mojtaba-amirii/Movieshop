import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "~/env.js";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import type { NextApiRequest, NextApiResponse } from "next";

// export API handler
const handler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});

export default handler as (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;
