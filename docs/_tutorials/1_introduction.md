---
layout: tutorial
permalink: /tutorials/introduction.html
title: Sprite Tutorials - Introduction
name: Introduction
nextDesc: Installation
nextUrl: /tutorials/installation.html
filename: 1_introduction.md
---

Sprite is a TypeScript (or JavaScript) driver/client for ArcadeDB, designed to work with data in document and graph formats. Future releases will include support for [timeseries](https://github.com/ArcadeData/arcadedb/discussions/1180) functionality.

The Sprite architecture is organized into focused modules, each serving a specific purpose.

1. [SpriteServer](#spriteserver)
2. [SpriteDatabase](#spritedatabase)
3. [Modalities](#modalities)
4. [What's Next?](#whats-next)

#### SpriteServer
---

The SpriteServer module provides methods for executing server-level commands, including:

* Creating and dropping databases
* User administration
* Settings / Configuration

#### SpriteDatabase
---

The SpriteDatabase module offers methods for performing core database operations, such as:

* Orchestrating transactions
* Issuing database commands
* Executing queries

#### Modalities
---

To provide a higher-level abstraction, Sprite includes two modalities: `DocumentModality` and `GraphModality`. These modalities contain methods for performing CRUD (Create, Read, Update, Delete) operations and queries on specific record types.

The modalities' design reduces overhead by instantiating functionality as required, keeping namespaces focused and organized.

#### What's next?
---

The next step in this tutorial is to explore the installation process, outlined in the following section.
