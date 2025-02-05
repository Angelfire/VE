---
title: "A handy tip for re-running CI/CD pipelines"
pubDate: "2025-02-05"
description: "When you need to re-run your CI/CD pipeline but have no code changes, this command creates an empty commit to trigger the build."
author: "Andres Bedoya"
tags: ["notes"]
type: "short"
---

When you need to re-run your CI/CD pipeline but have no code changes, this command creates an empty commit to trigger the build.

Benefits:

- Clean and traceable
- Doesn't pollute your codebase
- Documents intent through commit message

```bash
git commit --allow-empty -m 'chore: trigger pipeline'
```

_Originally shared by Giorgio Boa, Sr. Software Engineer @ Qarik_
