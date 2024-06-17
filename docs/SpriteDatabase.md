---
layout: default
title: SpriteDatabase
---

## SpriteDatabase

A client / driver for interaction with databases on a ArcadeDB server.
Tasks such as creating types, defining schemas for types, creating,
updating, and deleting records, and performing queries on the target database.

#### Example

```ts
const db = new SpriteDatabase({
  username: 'aUsername',
  password: 'aPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

db.exists().then(console.log);
// true or false
```

### beginTransaction

Begins a transaction on the server, managed as a session. Please note that this
method is not the recommended approach, but is provided for those that wish to
manage the transaction themselves for any reason. The recommend method for
transactions is via the SpriteDatabase.transaction() method, which returns
and instance of a SpriteTransaction, and automatically adds operations within
its scope to the transaction.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|isolationLevel|READ_COMMITTED, REPEATABLE_READ|'READ_COMMITTED'||


#### Example

```ts
db.beginTransaction()
  .then(console.log);
  // AS-ee056170-dc9b-4956-8d71-d7cfa01900d4
```

### close

### command

Executes a query against the target database. This method only executes
non-idempotent statements (that can change the database), such as `INSERT`,
`CREATE`, and `DELETE`. The execution of idempotent commands will throw an
`IllegalArgumentException` exception. If you are trying to execute
idempotent commands, see the `SpriteDatabase.query()` method.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|language|sql, sqlscript, graphql, cypher, gremlin, mongo|undefined|The language the command is written in.|
|command|string|undefined|The command to execute in the given language.|
|options||undefined||


#### Example

```ts
// Async/Await
const database = new SpriteDatabase({
  username: 'root',
  password: 'yourPassword',
  address: 'http://localhost:2480',
  databaseName: 'MyDatabase'
});

async function spriteQueryExample() {
  try {
    const result = await database.command('sql', 'CREATE document TYPE user');
    console.log(result);
    // true
    return result;
  } catch (error) {
    // handle error conditions
    console.error(error);
  }
};

spriteQueryExample();
```

#### Example

```ts
// Promises
const database = new SpriteDatabase({
  username: 'root',
  password: 'yourPassword',
  address: 'http://localhost:2480',
  databaseName: 'MyDatabase'
});

database
 .command('sql', 'CREATE document TYPE user')
 .then((result) => {
   console.log(result);
   // true
 })
 .catch((error) => {
   // handle error conditions
   console.error(error);
 });
```

### commitTransaction

Commits a transaction on the server.
Provide the `sessionId` obtained with the `SpriteDatabase.beginTransaction()` method.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|sessionId|string|undefined||


### compose

Compose a query using SpriteBuilder method chaining.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|index|string|undefined|The index, if any, to save the query as.|
|overwrite|boolean|false|Overwrite an existing query if the index already exists, otherwise it will throw an error.|


#### Example

```ts
const server = new SpriteServer({
  username: 'root',
  password: 'yourPassword',
  address: 'http://localhost:2480',
});

const query = server.compose('createDatabase', true);
query.create().database('myDatabase').build();
console.log(query);
// "CREATE DATABASE myDatase"
```

### createDocumentType

Creates a new `document` type in the schema of the target database.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|name|string|undefined|The name of the `document` type to create|
|options|ISpriteCreateTypeOptions|undefined|Options to create the `document` type with.|


#### Example

```ts
// Async/Await

const database = new SpriteDatabase({
  username: 'root',
  password: 'rootPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

async function createDocumentTypeExample() {
  try {
    // NOTE: Defining a Schema during type creation is optional,
    // and could be defined later using the define method on the
    // object returned from selecting a type, such as:
    // SpriteDatabase.type('aDocumentType').define(schema);
    const result = await database.createDocumentType('aDocumentType', {
      schema: {
        type: 'object',
        properties: {
          first: {
            type: 'string',
            minLength: 3,
            maxLength: 32
          },
          second: {
            type: 'string',
            minLength: 8,
            maxLength: 12
          }
        }
      }
    });
    console.log(result);
    // true
  } catch (error) {
    // handle error conditions
    console.error(error);
  }
};

createDocumentTypeExample();
```

#### Example

```ts
// Promises

const database = new SpriteDatabase({
  username: 'root',
  password: 'rootPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});
// NOTE: Defining a Schema during type creation is optional,
// and could be defined later using the define method on the
// object returned from selecting a type, such as:
// SpriteDatabase.type('aDocumentType').define(schema);
database
 .createDocumentType('aDocumentType', {
  schema: {
    type: 'object',
    properties: {
      first: {
        type: 'string',
        minLength: 3,
        maxLength: 32
      },
      second: {
        type: 'string',
        minLength: 8,
        maxLength: 12
      }
    }
  }
 })
 .then((result) => {
   console.log(result);
   // true
 })
 .catch((error) => {
   // handle error conditions
   console.error(error);
 });
```

### createEdgeType

Creates a new `edge` type in the schema.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|name|string|undefined|The name of the `edge` type to create|
|options|ISpriteCreateTypeOptions|undefined|The options to create the type with.|


#### Example

```ts
const created = await database.createEdgeType('rocking', {
  schema: {
    type: 'object',
    properties: {
      since: {
        type: 'dateTime'
      }
    }
  }
});

console.log(created);
// true
```

### createVertexType

Creates a new `vertex` type in the schema of the target database.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|name|string|undefined|The name of the `vertex` type to create|
|options|ISpriteCreateTypeOptions|undefined|Options to create the `vertex` type with.|


#### Example

```ts
// Async/Await

const database = new SpriteDatabase({
  username: 'root',
  password: 'rootPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

async function createVertexTypeExample() {
  try {
    // NOTE: Defining a Schema during type creation is optional,
    // and could be defined later using the define method on the
    // object returned from selecting a type, such as:
    // SpriteDatabase.type('aVertexType').define(schema);
    const result = await database.createVertexType('aVertexType', {
      schema: {
        type: 'object',
        properties: {
          first: {
            type: 'string',
            minLength: 3,
            maxLength: 32
          },
          second: {
            type: 'string',
            minLength: 8,
            maxLength: 12
          }
        }
      }
    });
    console.log(result);
    // true
  } catch (error) {
    // handle error conditions
    console.error(error);
  }
};

createVertexTypeExample();
```

#### Example

```ts
// Promises

const database = new SpriteDatabase({
  username: 'root',
  password: 'rootPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});
// NOTE: Defining a Schema during type creation is optional,
// and could be defined later using the define method on the
// object returned from selecting a type, such as:
// SpriteDatabase.type('aVertexType').define(schema);
database
 .createVertexType('aVertexType', {
  schema: {
    type: 'object',
    properties: {
      first: {
        type: 'string',
        minLength: 3,
        maxLength: 32
      },
      second: {
        type: 'string',
        minLength: 8,
        maxLength: 12
      }
    }
  }
 })
 .then((result) => {
   console.log(result);
   // true
 })
 .catch((error) => {
   // handle error conditions
   console.error(error);
 });
```

### dropType

Removes an existing type from the schema. Does not remove the property values
in the records, it just changes the schema information (existing records
keep their existing property values).

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|typeName|string|undefined||
|options|ISpriteDropTypeOptions|undefined||


#### Example

```ts
// Async/Await

const database = new SpriteDatabase({
  username: 'root',
  password: 'rootPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

async function dropTypeExample() {
  try {
    const result = await database.dropType('aType');
    console.log(result);
    // true
    return result;
  } catch (error) {
    // handle error conditions
    console.error(error);
  }
};

dropTypeExample();
```

#### Example

```ts
// Promises

const database = new SpriteDatabase({
  username: 'root',
  password: 'rootPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

database
 .dropType('aType')
 .then((result) => {
   console.log(result);
   // true
 })
 .catch((error) => {
   // handle error conditions
   console.error(error);
 });
```

### explain

Returns information about query execution planning of a specific statement,
without executing the statement itself.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|command|string|undefined|The command to explain|


#### Example

```ts
const explanation = await client.explain("SELECT * FROM UserAuthorization");
```

### newDocument

Insert a new document, of a specified type, into the database.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|type|string|undefined|The type of document to create. It must be a type that currently exists in the schema (created using `SpriteDatabase.createDocumentType()`, or another method).|
|options|ISpriteInsertRecordOptions|undefined||


#### Example

```ts
await database.createDocumentType('user', {
  schema: {
    username: {
      type: string
    },
    role: {
      type: string
    }
  }
});
const created = await database.newDocument('user', {
  username: 'aUsername',
  role: 'aRole'
});
console.log(created);
// {
//   '@rid': '#49:0',
//   '@type': 'user',
//   '@cat': 'd',
//   role: 'aRole',
//   username: 'aUsername'
// }
```

### newEdge

Create a new edge, of a specified type, in the database.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|type|string|undefined|The type of edge to create. It must be a type that currently exists in the schema (created using `SpriteDatabase.createEdgeType()`, or another method).|
|from|SpriteEdgeVertexDescriptor|undefined|The starting vertex of the edge. It can be either the rid of the vertex (`@44:9`), or an index described by an object (`{type: 'user', key: 'name', value: 'Jeremiah'}`).|
|to|SpriteEdgeVertexDescriptor|undefined|The starting vertex of the edge. It can be either the rid of the vertex (`@44:9`), or an index described by an object (`{type: 'car', key: 'color', value: 'yellow'}`).|
|options|ISpriteEdgeOptions|undefined||


### newVertex

Create a new vertex, of a specified type, in the database.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|type|string|undefined|The type of vertex to create. It must be a type that currently exists in the schema (created using `SpriteDatabase.createVertexType()`, or another method).|
|options|ISpriteInsertRecordOptions|undefined||


#### Example

```ts
await database.createVertexType('machine', {
  schema: {
    process: {
      type: string
    },
  }
});
const created = await database.newVertex('machine', {
  process: 'laser'
});
console.log(created);
// {
//   '@rid': '#49:0',
//   '@type': 'user',
//   '@cat': 'v',
//   process: 'laser',
// }
```

### open

### query

Executes a query against the target database. This method only executes
idempotent statements (that cannot change the database), namely `SELECT`
and `MATCH`. The execution of non-idempotent commands will throw an
`IllegalArgumentException` exception. If you are trying to execute
non-idempotent commands, see the `SpriteDatabase.command()` method.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|language|sql, sqlscript, graphql, cypher, gremlin, mongo|undefined|The language of the query.|
|command|string|undefined|The command to execute in the given language.|
|params|Record|undefined|The key-value pairs of parameters to use in the command.|


#### Example

```ts
// Async/Await
const database = new SpriteDatabase({
  username: 'root',
  password: 'yourPassword',
  address: 'http://localhost:2480',
  databaseName: 'MyDatabase'
});

async function spriteQueryExample() {
  const result = await database.query('sql', 'SELECT * FROM user');
  console.log(result);
  // [...]
  // NOTE: In order for the result to be anything but an empty array,
  // you must populate the database with a few 'user' records.
  return result;
};

spriteQueryExample();
```

#### Example

```ts
// Promises
const database = new SpriteDatabase({
  username: 'root',
  password: 'yourPassword',
  address: 'http://localhost:2480',
  databaseName: 'MyDatabase'
});

database
  .query('sql', 'SELECT * from user)
  .then(console.log);
  // [...]
  // NOTE: In order for the result to be anything but an empty array,
  // you must populate the database with a few 'user' records.
  return result;
```

### rollbackTransaction

Rolls back a transaction on the server. Provide the session id obtained with the `SpriteDatabase.beginTransaction()` method.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|sessionId|string|undefined||


### serverReady

Returns a `boolean` value indicating if the ArcadeDB server is ready.\
Useful for remote monitoring of server readiness.

#### Example

```ts
// Async/Await
const database = new SpriteDatabase({
  username: 'root',
  password: 'yourPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase',
});

async function serverReadyExample() {
  const serverReady = await database.serverReady();
  console.log(serverReady);
  // true
};

serverReadyExample();
```

#### Example

```ts
// Promises
const database = new SpriteDatabase({
  username: 'root',
  password: 'yourPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase',
});

database.serverReady().then(console.log)
// true
```

### settings

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|settings|ISpriteArcadeDatabaseSettings|undefined||


### transaction

Returns a new object representing the transaction along with
supplied methods for all database operations, to which it
automatically passes the `transactionId`. This is a convenience feature,
however you may still manually acheive this by using `SpriteDatabase.beginTransaction()`,
SpriteDatabase.commitTransaction(), etc, and manually passing the returned `transactionId`
as an option to all operations to be grouped as a transaction.

#### Example

```ts
const transaction = await client.transaction();
console.log(transaction.id);
// AS-ee056170-dc9b-4956-8d71-d7cfa01900d4
await transaction.newDocument('user', {
  data: {
    name: 'aName',
    age: 49
  }
});
transaction.commit();
```

### type

Return an instance of `SpriteType`, for interacting with the targeted `typeName`. This class allows for
defining a schema with a JSON-schema definition, creating & dropping individual
properties, or truncating the type.

#### Parameters

|name|type|default|description|
|:--------|:--------|:--------|:--------|
|typeName|string|undefined|The name of the type in the schema to target.|


#### Example

```ts
const type = database.type('aType');
await type.define({
  type: 'object',
  properties: {
    first: {
      type: 'string'
    }
  }
});
```

