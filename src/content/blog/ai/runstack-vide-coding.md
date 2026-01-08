---
title: "Building RunStack: A journey through vibe coding"
slug: "ai/runstack-vibe-coding"
description: "RunStack is a desktop application that allows you to manage and run Node.js, Deno, and Bun projects from a single place. This post documents the development journey, exploring the technologies used, the most complex technical challenges we faced, and the solutions we implemented to create a robust and efficient tool."
pubDate: 2026-01-08
---

This idea came about many months ago, I tried a couple of times but it definitely required a deep knowledge of Rust to be able to do some things, so I left it in oblivion until a couple of days ago when I wanted to try the famous vibe coding.

**RunStack** is a desktop application that allows you to manage and run Node.js, Deno, and Bun projects from a single place. This post documents the development journey, exploring the technologies used, the most complex technical challenges we faced, and the solutions we implemented to create a robust and efficient tool.

## The Technology Stack

### Frontend

- **React 19** with TypeScript in strict mode
- **Tailwind CSS v4**
- **Vite 7** for bundling and development
- **Radix UI** for accessible components
- **Sonner** for toast notifications

### Backend

- **Rust** with Tauri v2 (a framework for building desktop apps)
- **Serde** for data serialization
- **Tauri Plugins**: Shell, Dialog, Opener, File System

### Architecture Highlights

- Optimized communication between frontend and backend
- Caching system to avoid redundant operations
- Efficient algorithms for processing large directories
- Fast lookups using optimized data structures

---

## The Most Complex Technical Challenges

### 1. Real-Time Port Detection

One of the most complex challenges was detecting which port a development server is using after starting it. The problem is that servers can take several seconds to start up and begin listening on a port.

#### The Problem

When you run `npm run dev`, it's not as simple as it seems. The process structure looks like this:

```bash
RunStack App → Shell → Package Manager → Dev Server → Background Workers
```

The actual server might be 3 or 4 levels deep in this process tree. We need to find which child process is actually listening on the port, and we need to do it quickly and reliably.

#### The Solution

We built a multi-level detection system that works like a detective:

1. **First, check the main process**: We ask the system "Is this process listening on any port?"
2. **If not, check all children**: We find all child processes (like finding all employees under a manager)
3. **Check each child**: For each child process, we ask "Are you listening on a port?"
4. **Last resort - check common ports**: If we still can't find it, we check common ports (like 3000 for React, 4321 for Astro) and verify if the process using that port belongs to our project

The key insight was that we needed to search recursively through the process tree, not just check the immediate process. It's like searching for a file in a folder structure - you need to check subfolders too.

#### Why This Was Hard

- Processes can take time to start listening
- The server might be a grandchild process, not a direct child
- Different frameworks use different ports
- We needed to be fast - users don't want to wait

---

### 2. Safely Killing Process Trees

Killing a process and all its children seems simple, but it's surprisingly complex when you need to avoid killing system processes or, worse, the application itself.

#### The Problem

When you click "Stop" in **RunStack**, we need to kill the entire process tree. But here's the tricky part: if we're not careful, we could accidentally kill **RunStack** itself!

The process structure looks like this:

```bash
RunStack App → Shell → Package Manager → Dev Server → Background Workers
```

If we just kill the parent process, some child processes might become "orphaned" - they keep running but have no parent. But if we try to kill everything at once, we might accidentally kill **RunStack** if it's in the same process group.

#### The Solution

We implemented a multi-layer safety system:

1. **Verify the process exists**: Before doing anything, we check "Does this process actually exist?"
2. **Find all children recursively**: We search up to 4 levels deep to find all related processes
3. **Protect ourselves**: We collect all "ancestor" processes (processes that **RunStack** came from) and make sure we never kill them
4. **Kill in the right order**: We kill children first, then the parent (like cleaning up a room - you put away toys before closing the door)
5. **Verify it worked**: After killing, we double-check that the process is actually gone

Think of it like organizing a party cleanup: you need to make sure you're not throwing away your own belongings while cleaning up the guests' mess.

#### Why This Was Critical

- Accidentally killing **RunStack** would crash the app
- Orphaned processes waste system resources
- We needed to be 100% sure we only killed the right processes
- Different operating systems handle processes differently

---

### 3. The PATH Challenge: Version Managers and Shells

This was probably the most frustrating challenge. Node.js version managers (like NVM, FNM, Volta, or asdf) modify your system's PATH in shell configuration files. But when you run a process from a desktop app, these configuration files aren't automatically loaded.

#### The Problem

When you open a terminal and type `node --version`, you get the version configured by your version manager. But when **RunStack** tries to run `node --version` directly, it gets the system version instead.

This means:

- The wrong version of Node.js might be used
- Required environment variables might not be set
- Package manager binaries (npm, yarn, pnpm) might not be found

It's like trying to use a tool from a toolbox, but the toolbox is locked and you can't access the tools inside.

#### The Solution: Execute Through a Login Shell

The only reliable way to load all configurations is to execute commands through a login shell - the same type of shell you use in your terminal. This shell automatically loads all your configuration files, just like when you open a terminal.

We built a smart fallback system:

1. **Try the user's preferred shell first**: We check what shell you use (zsh, bash, fish, etc.)
2. **Load configuration files**: We tell the shell to load your config files (like `.zshrc` or `.bashrc`)
3. **Then run the command**: Once everything is loaded, we run your project command
4. **Fallback to alternatives**: If your preferred shell doesn't work, we try common alternatives

It's like having a master key that opens all the toolboxes, and if one key doesn't work, we try another.

#### The Security Challenge

Running commands through a shell introduces security risks. We mitigate this by:

- **Validating commands**: We only allow specific, safe commands
- **Validating arguments**: We check for dangerous characters
- **Proper escaping**: We wrap everything in quotes to prevent malicious code injection

Think of it like a security checkpoint - we check everything before it goes through.

#### The Production Build Problem

In development, everything works because the environment is the same. But in production, when the app is bundled:

- The PATH might be different
- Configuration files might not be accessible
- System environment variables might not be available

**Our solution**: Always use the user's shell from their system settings, and only fallback to system shells if absolutely necessary. We also notify users when a fallback shell is used so they know the environment might be slightly different.

---

### 4. Performance Optimization

During development, we identified several performance bottlenecks and optimized them. These optimizations might seem small, but they add up to make the app feel fast and responsive.

#### Caching Runtime Versions

Initially, every time we scanned projects, we would run `node --version`, `deno --version`, etc. for each project. This was extremely slow - imagine asking someone their name every time you see them, even though you already know it.

**Our solution**: We implemented a global cache. The first time we check a runtime version, we store it. Every subsequent check just reads from the cache. This is like remembering someone's name after the first introduction.

#### Efficient Directory Scanning

Directory scanning was slow because we were making multiple system calls per directory. Think of it like checking if a door is locked by trying the handle, then checking if it's a door, then checking if you have the key - all separate trips.

**Our solution**: We combined these checks into a single system call. Now it's like checking everything in one trip - much faster.

#### Reducing Memory Allocations

Every time we created a string, we were allocating memory. For operations that run hundreds of times, this adds up. We optimized by reusing strings where possible and using more efficient data structures.

It's like reusing containers instead of throwing them away and getting new ones every time.

---

### 5. Production Build Issues

#### The Blank Screen Problem

When we made the first production build, the application showed a blank screen. This was frustrating because everything worked perfectly in development!

After investigating, we discovered several problems:

1. **Asset paths**: The build system was generating absolute paths that didn't work in the packaged app
2. **Loading order**: Some code was trying to use React before React was loaded
3. **Security policies**: The app's security settings were blocking some resources

#### The Solutions

**Relative paths**: We changed the build configuration to use relative paths instead of absolute paths. Think of it like using "turn left at the corner" instead of "go to this specific GPS coordinate" - it works regardless of where you start.

**React in the main bundle**: We ensured React loads first, before any code that needs it. It's like making sure the foundation of a house is built before the walls.

These might seem like small fixes, but they were critical for the app to work in production.

---

## Lessons Learned

### 1. Desktop App Development Requires Deep System Knowledge

Building desktop applications is different from web development. You need to understand:

- How your app communicates with the operating system
- How to safely handle system processes
- How to optimize data transfer between different parts of your app

It's like the difference between driving a car and being a mechanic - you need to understand how things work under the hood.

### 2. Security is Fundamental

Every time you execute system commands or process user input, you must:

- Validate all input (don't trust anything)
- Properly escape data (prevent injection attacks)
- Use whitelists instead of blacklists (only allow what you know is safe)
- Assume users can be malicious (defensive programming)

Security isn't optional - it's a requirement.

### 3. Performance Matters

Small optimizations can have a big impact:

- Cache expensive operations
- Use efficient data structures
- Reduce system calls
- Use optimized algorithms

Users notice when an app is slow, even if they can't explain why. Making things fast is part of making a good user experience.

### 4. Details Matter

Things that seem simple (like killing a process) can be surprisingly complex when you consider:

- Orphaned processes
- Process groups
- Nested process trees
- Protection against self-destruction

The devil is in the details, and handling edge cases is what separates a good app from a great one.

---

## Conclusion

Building **RunStack** has been an incredibly educational journey. From port detection challenges to PATH problems in production, each problem taught us something new about desktop application development, system programming, and how operating systems work.

The result is an application that not only works, but is fast, secure, and robust. And best of all: every challenge overcome made me a better developer.

The journey wasn't always easy - there were frustrating moments, especially with the PATH issues and production builds. But each problem solved was a victory, and each optimization made the app better.

---

## Current Limitations

While **RunStack** is functional and useful, there are some limitations we're aware of and working on:

### Platform Support

- **macOS and Linux only**: Currently, **RunStack** only works on macOS and Linux. Windows support is not planned (I hardly know how Unix systems work, so trying to understand an OS I never use is a stretch). This is because some of the process management features rely on Unix-specific commands.

### Performance: The White Screen Issue

One of the most noticeable limitations is a brief white screen that appears for about 2 seconds when the app first launches. This happens because:

1. **Initial bundle loading**: The app needs to load the main JavaScript bundle before React can render anything
2. **Tauri initialization**: The Rust backend needs to initialize and establish communication with the frontend
3. **No loading screen yet**: We haven't implemented a splash screen or loading indicator for the initial load

This is a common issue with desktop applications that bundle web technologies. We're working on solutions like:

- Adding a splash screen that shows immediately
- Implementing code splitting to reduce initial bundle size
- Lazy loading components that aren't needed immediately
- Showing a loading indicator while the app initializes

While 2 seconds might not seem like much, it can feel like an eternity when you're waiting for an app to start. This is definitely on our priority list for improvements.

### Version Manager Detection

While we support the most common version managers (NVM, FNM, Volta, asdf), there might be edge cases or less common managers that aren't fully supported. If your setup uses a custom configuration or a less common version manager, you might need to adjust your shell configuration.

### Large Directory Scanning

Scanning directories with hundreds or thousands of projects can take some time. While we've optimized the scanning process, very large project collections might still take 10-30 seconds to scan initially. Once scanned, the app is fast and responsive.

### Process Detection Edge Cases

In rare cases, especially with custom build scripts or unusual process structures, port detection might not work perfectly. The app will still run your projects, but it might not automatically detect the port, requiring you to manually check which port your server is using.

---

## Next Steps

- Integration with more version managers
- Support for more frameworks and runtimes
- UI/UX improvements based on user feedback
- **Fix the white screen issue** with a proper splash screen and faster initial load
- User Settings
- Theme Switch (Light/Dark themes)

Want to see the code? The project is available on <a class="hover:no-underline text-blue underline" href="https://github.com/Angelfire/runstack" target="_blank" rel="noreferrer">RunStack - GitHub</a>.

---

## Disclaimer

I want to be transparent about the development process: **the entire backend codebase (Tauri and Rust) was developed with the assistance of AI**. This includes all the complex process management, port detection, shell handling, and optimization logic described in this post.

Using AI as a development tool was incredibly valuable for:

- Learning Rust and Tauri v2 while building a real project
- Implementing complex system-level features that would have taken much longer to research and implement manually
- Getting help with debugging and optimization
- Understanding best practices for security and performance

However, this doesn't mean the code is any less real or functional. Every line was reviewed, tested, and refined. The challenges we faced were real, the solutions work, and the learning experience was genuine. The AI was a tool in the development process, similar to how we use linters, formatters, and other development tools.

This project demonstrates that AI can be a powerful tool for learning and building, especially when working with technologies you're less familiar with. It's not about replacing understanding - it's about accelerating the learning process while still ensuring quality and correctness.
