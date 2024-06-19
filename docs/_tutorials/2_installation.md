---
layout: tutorial
permalink: /tutorials/installation.html
title: Sprite Tutorials - Installation
name: Installation
prevDesc: Introduction
prevUrl: /tutorials/introduction.html
nextDesc: Create a Database
nextUrl: /tutorials/createDatabase.html
---

### Installation

1. [Supported Environmnets](#supported-environments)
2. [Node.js](#nodejs)
3. [Deno](#deno)
4. [What's Next?](#whats-next)

#### Supported Environments

Sprite supports the following environments:

* [Node.js](#nodejs)
* [Deno](#deno)

#### Node.js

##### Prerequisites

1. Ensure ArcadeDB 24.5.x (or greater) is installed [per the official documentation](https://www.arcadedb.com/docs/installation).
2. Ensure Node.js 16.x or greater is installed [per the official documentation](https://nodejs.org/en/download/).
3. Ensure you have a Node.js project ready to work with. There is an optional [example repository](https://github.com/valence-corp/sprite-tutorials) for the tutorials.

##### Installation

In a terminal, navigate to your project's root directory and install Sprite with npm (or your preferred package manager):

```
$ cd path/to/your/project
$ npm install @valence-corp/sprite
```

#### Deno

(Coming soon)

#### What's Next?

The next tutorial explains using the `SpriteServer` module to create a database.