// import "dotenv/config";
// import { drizzle } from "drizzle-orm/bun-sqlite";
// import { Database } from "bun:sqlite";

// const sqlite = new Database(process.env.DB_FILE_NAME!);
// const db = drizzle({ client: sqlite });

// const server = Bun.serve({
//   port: 3000,
//   fetch(request) {
//     return new Response("Welcome to Bun!");
//   },
// });

// console.log(`Listening on localhost:${server.port}`);
import "dotenv/config";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { eq } from "drizzle-orm";
import { usersTable } from "./db/schema";

const db = drizzle(process.env.DB_FILE_NAME!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");
}

main();
