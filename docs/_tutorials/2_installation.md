---
layout: tutorial
permalink: /tutorials/installation.html
title: Sprite Tutorials - Installation
name: Installation
prevDesc: Introduction
prevUrl: /tutorials/introduction.html
nextDesc: Create a Database
nextUrl: /tutorials/createDatabase.html
filename: 2_installation.md
---

This tutorial will outline the steps necessary to install Sprite in your project. It works in Node.js, Bun, or Deno.

1. [Supported Environments](#supported-environments)
2. [Node.js](#nodejs)
3. [Bun](#bun)
3. [Deno](#deno)
4. [What's Next?](#whats-next)

#### Node.js
---

1. Ensure ArcadeDB 24.5.x (or greater) is installed [per the official documentation](https://www.arcadedb.com/docs/installation).
2. Ensure Node.js 16.x or greater is installed [per the official documentation](https://nodejs.org/en/download/).
3. Ensure you have a Node.js project ready to work with. There is an optional [example repository](https://github.com/valence-corp/sprite-tutorials) for the tutorials.
4. In a terminal, navigate to your project's root directory and install Sprite with `npm` (or your preferred package manager):

```
$ cd path/to/your/project
$ npm install @valence-corp/sprite
```

#### Bun
---

1. Ensure ArcadeDB 24.5.x (or greater) is installed [per the official documentation](https://www.arcadedb.com/docs/installation).
2. Ensure the latest version of Deno is installed [per the official documentation](https://docs.deno.com/runtime/manual/getting_started/installation).
3. Ensure you have a Deno project ready to work with.
4. In a terminal, navigate to your project's root directory and install Sprite with `bun`:

```
$ cd path/to/your/project
bun install @valence-corp/sprite
```

#### Deno
---

1. Ensure ArcadeDB 24.5.x (or greater) is installed [per the official documentation](https://www.arcadedb.com/docs/installation).
2. Ensure the latest version of Deno is installed [per the official documentation](https://docs.deno.com/runtime/manual/getting_started/installation).
3. Ensure you have a Deno project ready to work with.
4. Import the necessary Sprite modules into your project.

```ts
import { SpriteServer } from "npm:@valence-corp/sprite";

// and/or
// import { SpriteDatabase } from "npm:@valence-corp/sprite;
```

#### What's Next?
---

The next tutorial explains using the `SpriteServer` module to create a database.