import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    SSPACEX_API_URL: z.url(),
  },
  /*
   * Environment variables available on the client (and server).
   */
  client: {},
  /*
   * Specify what values should be validated by your schemas above.
   */
  runtimeEnv: {
    SSPACEX_API_URL: process.env.SSPACEX_API_URL,
  },
});
