---
layout: default
title: Sprite Example Usage
---

## Example Usage

```ts
import { SpriteServer } from '@valence-corp/sprite';


const server = new SpriteServer({
  username: 'aUsername', // root, etc
  password: 'aPassword', // insert your password,
  address: 'http://localhost:2480' // default address for arcade
});

async function spriteExample() {
  try {
    const database = await server.createDatabase('aDatabase');

    // NOTE: schemas are optional, although recommended.
    // They can also be defined later with the types
    // class, accessed through SpriteDatabase.type()
    await database.createVertexType('developer', {
      schema: {
        properties: {
          name: {
            type: 'string'
          }
        }
      }
    });
    const developer = await database.newVertex('developer', {
      data: {
        name: 'aName'
      }
    });
    
  } catch (error) {
    throw new Error('Error running example :(', { cause: error });
  }
};
```
