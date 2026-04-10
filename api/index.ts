/**
 * Vercel runs Express when the default export is the app (no serverless-http wrapper).
 * @see https://vercel.com/guides/using-express-with-vercel
 */
import { createServer } from "../server/index.js";

export default createServer();
