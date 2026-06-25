import { drizzle } from "drizzle-orm/node-postgres";
import * as authSchema from "./schemas/auth.schema";
import * as postsSchema from "./schemas/posts.schema";

const db = drizzle(process.env.DATABASE_URL!, {
	schema: { ...authSchema, ...postsSchema },
});

export default db;
