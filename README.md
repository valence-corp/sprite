# Sprite

Sprite is a TypeScript driver for ArcadeDB. It is still in early development, and should be considered experimental.

## Installation

`pnpm install @valence-corp/sprite`

## Examples

### SpriteServer

```ts
@import { SpriteServer } from '@valence-corp/sprite';

const server = new SpriteServer({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480'
});

async function example() {

  const ready = await server.serverReady();
  console.log(ready);
  // true;

  try {
    const db = await server.createDatabase('aDatabase');
    console.log(db.name);
    // 'aDatabase'
  } catch (error) {
    throw new Error('Could not create database', { cause: error });
  }
}

example();

```


### SpriteDatabase

```ts
@import { SpriteDatabase } from '@valence-corp/sprite';

const database = new SpriteDatabase({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

async function example() {
  try {
    const result = await database.getSchema();
    console.log(result);
    // [...]
  } catch (error) {
    throw new Error('Could not get database schema', { cause: error });
  }
}

example();

```

#### Working with Documents

```ts
@import { SpriteDatabase } from '@valence-corp/sprite';

const database = new SpriteDatabase({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

type DocumentTypes = {
  aDocument: {
    aProperty: string
  }
}

const client = database.documents<DocumentTypes>()

async function example() {
  try {
    await client.transaction(async (trx) => {
      // non-idempotent operations must be
      // conducted within a transaction
      await client.createType('aDocument', trx);
      const document = await client.newDocument('aDocument', trx, {
        data: {
          aProperty: 'aValue'
        }
      });
      console.log(document);
      // {
      //   '@rid': '#0:0',
      //   '@cat': 'd',
      //   '@type': 'aDocument',
      //   aProperty: 'aValue' 
      // }
    });
  } catch (error) {
    throw new Error('Could not create database', { cause: error });
  }
}

example();

```


#### Working with Graphs

```ts
@import { SpriteDatabase } from '@valence-corp/sprite';

const database = new SpriteDatabase({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

type VertexTypes = {
  aVertex: {
    aProperty: string
  }
}


type EdgeTypes = {
  anEdge: {
    aProperty: string
  }
}

const graph = database.graph<VertexTypes, EdgeTypes>()

function example() {
  try {
    graph.transaction(async (trx) => {
      // non-idempotent operations must be
      // conducted within a transaction
      await graph.createVertexType('aVertex', trx);
      await graph.createEdgeType('anEdge', trx);
      const vertexA = await graph.newVertex('aVertex', trx, {
        data: {
          aProperty: 'aValue'
        }
      });
      const vertexB = await graph.newVertex('aVertex', trx, {
        data: {
          aProperty: 'anotherValue'
        }
      });
      const edge = await graph.newEdge(
        'anEdge',
        vertexA['@rid'],
        vertexB['@rid'],
        trx,
        {
          data: {
            aProperty: 'aValue',
          },
        },
      );
      console.log(edge)
      // {
      //  '@rid': '#3:0',
      //  '@cat': 'e',
      //  '@type': 'anEdge',
      //  '@in': '#2:0',
      //  '@out': '#1:0,
      //  aProperty: 'aValue' 
      // }
    });
  } catch (error) {
    throw new Error('Could not create database', { cause: error });
  }
}

example();

```

