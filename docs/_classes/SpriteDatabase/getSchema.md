---

layout: default

title: getSchema

permalink: /classes/SpriteDatabase/getSchema.html

---

### _SpriteDatabase_.getSchema

Return the current schema.

#### Example

```ts
async function getSchemaExample() {
  try {
    const schema = await database.getSchema();
    console.log(schema);
    // [...]
    return schema;
  } catch (error) {
    console.log(error);
    // handle error conditions
  }
}

getSchemaExample();
```

