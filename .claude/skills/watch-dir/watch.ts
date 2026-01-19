#!/usr/bin/env bun

import { watch } from "fs";
import { resolve } from "path";

const dir = resolve(process.argv[2] || ".");

console.log(`Watching ${dir}...`);

const watcher = watch(dir, { recursive: true }, (event, path) => {
  if (path?.startsWith(".git")) return;
  console.log(`${event}: ${path}`);
});

process.on("SIGINT", () => {
  watcher.close();
  process.exit(0);
});
