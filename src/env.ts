import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    SPACEX_API_KEY: z.url(),
  },
  /*
   * Environment variables available on the client (and server).
   */
  client: {},
  /*
   * Specify what values should be validated by your schemas above.
   */
  runtimeEnv: {
    SPACEX_API_KEY: process.env.SPACEX_API_KEY,
  },
});
