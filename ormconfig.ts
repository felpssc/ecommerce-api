import "dotenv/config";

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export default {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
