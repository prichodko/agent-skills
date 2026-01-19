---
name: bun-watch
description: Watch directories for file changes using Bun's fs.watch. Use when monitoring files, detecting changes, or building watch-based workflows.
---

# Bun Watch

Watch directory and subdirectories for changes using `fs.watch`.

## Basic (recursive)

```ts
import { watch } from "fs";

const watcher = watch("./src", { recursive: true }, (event, path) => {
  console.log(`${event}: ${path}`);
});
```

## Async iterator

```ts
import { watch } from "fs/promises";

const watcher = watch("./src", { recursive: true });
for await (const { eventType, filename } of watcher) {
  console.log(`${eventType}: ${filename}`);
}
```

## Cleanup on SIGINT

```ts
import { watch } from "fs";

const watcher = watch("./src", { recursive: true }, (event, path) => {
  console.log(`${event}: ${path}`);
});

process.on("SIGINT", () => {
  watcher.close();
  process.exit(0);
});
```

## Events

- `rename`: file created, deleted, or renamed
- `change`: file content modified

## Notes

- `recursive: true` required for subdirectories
- `import.meta.dir` = current file's directory
- call `watcher.close()` to stop watching
