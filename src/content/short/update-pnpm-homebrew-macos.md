---
title: "How to update PNPM on macOS using Homebrew"
pubDate: "2025-02-05"
description: "How to update PNPM on macOS using Homebrew when the normal update command doesn't work as expected."
author: "Andres Bedoya"
tags: ["notes"]
type: "short"
---

For some strange reason I was unable to update `PNPM` using homebrew, the normal update command doesn't work as expected, so I had to force this process.

```bash
where pnpm
```

The location of the `PNPM` binary might be different, but in my case, it was located at `/opt/homebrew/bin/pnpm`.

```bash
rm -rf /opt/homebrew/bin/pnpm
```

Then I reinstalled `PNPM` using homebrew.

```bash
brew install pnpm
```
