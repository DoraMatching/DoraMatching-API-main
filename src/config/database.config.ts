export const type = process.env.DATABASE_TYPE;
export const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
export { port as dbPort };
export const username = process.env.DATABASE_USERNAME;
export const password = process.env.DATABASE_PASSWORD;
export const database = process.env.DATABASE_NAME;
export const synchronize = true;
export const dropSchema = false;
export const logging = false;
export const cacheDuration = process.env.DATABASE_CACHE_DURATION;
export const isEnableCache = Boolean(process.env.DATABASE_ENABLE_CACHE);
export const cache = isEnableCache ? { duration: cacheDuration } : false;
export const entities = ['./dist/**/*.entity{.ts,.js}']