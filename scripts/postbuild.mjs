import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const source = resolve("public", ".htaccess");
const target = resolve("dist", ".htaccess");

try {
  await copyFile(source, target);
  console.log("postbuild: copied .htaccess to dist");
} catch (error) {
  console.error("postbuild: failed to copy .htaccess", error);
  process.exit(1);
}
