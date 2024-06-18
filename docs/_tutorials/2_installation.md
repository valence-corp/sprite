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

---

###### Note
Sprite is a pure-ESM package. This means it will not work with CommonJS format packages. If there is interest in a CommonJS build, please [submit a feature request on GitHub](https://www.github.com/valence-corp/sprite).

---

Sprite supports the following environments:

- [Node.js](#nodejs)
- [Deno](#deno)

<h4 id="nodejs">Node.js</h4>

##### Prerequisites
1. Ensure ArcadeDB 24.5.x (or greater) is installed [per the official documentation]().
2. Ensure NodeJS > 16.x is installed [per the official documentation]().
3. Ensure you have a nodejs project ready to work with. There is an optional [example repo]() for the tutorials.

##### Installation
In a terminal, navigate to your project's root directory, and install Sprite with npm (or your preferred package manager).

```
$ cd path/to/your/project
$ npm install @valence-corp/sprite
```

<h4 id="nodejs">Deno</h4>
(coming soon)
