import { SpriteServer } from './SpriteServer.js';
import { SpriteDatabase } from './SpriteDatabase.js';
import { SpriteTransaction } from './SpriteTransaction.js';

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

const db = new SpriteServer({
  username: 'root', // root will be ok for this tutorial
  password: '999999999', // your password,
  address: 'http://localhost:2480', // default address for ArcadeDB
  //databaseName: 'ExampleDatabase' // the existing database
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

//const client = db.graphModality<ExampleVertexes, ExampleEdges>();


// docs.transaction((trx)=>{
//   docs.dropType('aType', trx);
//   // docs.dropType('bType', trx);
//   // docs.dropType('cType', trx);
//   // docs.dropType('dType', trx);
// })

async function neener() {
  const client = new SpriteServer({
    username: 'root',
    password: '999999999',
    address: 'http://localhost:2480',
  });

  const db = await client.database('SpriteIntegrationTestingDatabase');

  const docs = db.documentModality<any>();

  await docs.createType('aType');

  const trx = await db.newTransaction();



  await db.command('sql', 'DROP TYPE aType');
  await db.command('sql', 'CREATE document TYPE aType');

  await db.command('sql', 'INSERT INTO aType CONTENT { my: "eye" }', trx);

  await db.commitTransaction(trx.id);

  //await db.commitTransaction(trx.id);
  //await db.rollbackTransaction(trx.id);
  // const trx = await docs.transaction(async (trx) => {
  //   await docs.createType('aType', trx);
  //   // await docs.newDocument('aType', trx, {
  //   //   data: {
  //   //     aProperty: 'aProperty',
  //   //     bProperty: {
  //   //       thing: 4
  //   //     }
  //   //   }
  // });
}

neener();

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
