---
layout: tutorial
permalink: /tutorials/introduction.html
title: Sprite Tutorials - Introduction
name: Introduction
nextDesc: Installation
nextUrl: /tutorials/installation.html
---

### Introduction

Sprite is a TypeScript (or JavaScript) driver/client for ArcadeDB. It supports working with data in document, and graph formats. Timeseries and vector functionality will be added when those features are officially released for ArcadeDB.

Functionality is split into focused modules.

#### SpriteServer 

Provides methods for working with server level commands, such as: creating (or dropping) databases, user administration, and settings.

---

#### SpriteDatabase 

Provides methods for performing core database operations, such as: orchestrating transactions, issuing commands, performing queries, etc.

#### Modalities

Many users would rather have some abstraction over these core driver functionalities. That abstraction happens via the modalities of the database client. There are currently two: `DocumentModality`, and `GraphModality`. The modalities contain methods for performing CRUD operations, and queries on specific record types.

This arrangement reduces overhead by ensuring the methods contained in the modalities are instantiated as required, and keeping the namespaces focused.
