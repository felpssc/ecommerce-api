import "reflect-metadata";
import "dotenv/config";

import { app } from "./app";

import "./database";

import "./shared/container";

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port: ${process.env.PORT}`);
});
