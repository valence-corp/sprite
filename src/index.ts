import { SpriteServer } from './SpriteServer.js';
import { SpriteDatabase } from './SpriteDatabase.js';

export { SpriteServer };
export { SpriteDatabase };
export * from './types/index.js';

// type DocumentTypes = {
//   aDocument: ADocumentType;
// };

// type AnotherType = {
//   anotherDoc: {
//     aProperty: string;
//   };
// };

const db = new SpriteDatabase({
  username: 'root', // root will be ok for this tutorial
  password: '999999999', // your password,
  address: 'http://localhost:2480', // default address for ArcadeDB
  databaseName: 'ExampleDatabase' // the existing database
});

interface ExampleVertexes {
  User: {
    name: string;
  };
  Something: {
    name: string;
  };
}

interface ExampleEdges {
  Friends: {
    since: number;
  };
  NotFriends: {
    since: number;
  };
}

const client = db.graphModality<ExampleVertexes, ExampleEdges>();

client.transaction(async (trx) => {
  client.dropType('Something', trx).then(console.log);
});

// async function graphModalityExample() {
//   try {
//     client.transaction(async (trx) => {
//       await client.createVertexType("User", trx, {
//         ifNotExists: true,
//       });
//       await client.createEdgeType("Friends", trx, {
//         ifNotExists: true,
//       });

//       const [record1, record2] = await client.newVertex("User", trx, {
//         data: [
//           {
//             name: "John",
//           },
//           {
//             name: "Jane",
//           },
//         ],
//       });

//       const edge = await client.newEdge(
//         "Friends",
//         record1["@rid"],
//         record2["@rid"],
//         trx,
//         {
//           data: {
//             since: new Date().getDate(),
//           },
//         }
//       );

//       console.log({
//         record1,
//         record2,
//         edge,
//       });
//     });
//   } catch (error) {
//     throw new Error(`There was a problem while running the example.`, {
//       cause: error,
//     });
//   }
// }

// graphModalityExample();

// const server = new SpriteServer({
//   username: "root",
//   password: "999999999",
//   address: "http://localhost:2480",
// });

// async function createDatabaseExample() {
//   try {
//     const ready = await server.serverReady();
//     if (ready) {
//       // creating a database with the server client
//       const database = await server.createDatabase("ExampleDatabase");
//       // logging the name of the returned Database instance
//       console.log(`${database.name} was created`);
//       // "ExampleDatabase was created"
//     }
//   } catch (error) {
//     throw new Error(`There was a problem while running the example.`, {
//       cause: error,
//     });
//   }
// }

// createDatabaseExample();

// server.dropDatabase("tester").then(() => {
//   server.createDatabase("tester").then(async (db) => {
//     const client = db.documentModality<DocumentTypes>();

//     await client.transaction(async (trx) => {
//       const aDocumentType = await client.createType("aDocument", trx);

//       const thing = await aDocumentType.model(
//         {
//           aProperty: {
//             type: "string",
//             default: "aProperty",
//             min: 5,
//           },
//           bProperty: {
//             type: "map",
//             default: { thing: 4 },
//             mandatory: true,
//             notnull: true,
//           },
//         },
//         trx
//       );
//       client.newDocument("aDocument", trx);
//       console.log(thing);
//     });
//     const doc = await client.selectFrom("aDocument", {
//       where: ["@rid", "!=", "#2:0"],
//     });
//     console.log(doc);
//   });
// });
