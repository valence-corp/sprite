import { SpriteServer } from './SpriteServer.js';
import { SpriteDatabase } from './SpriteDatabase.js';
import { SpriteTransaction } from './SpriteTransaction.js';
import { AsArcadeRecords } from './api.js';

export { SpriteServer };
export { SpriteDatabase };
export * from './types/index.js';

type ADocumentType = {
  aProperty: string;
};

type DocumentTypes = {
  aDocument: ADocumentType;
};

export type DocumentTypesWithMeta = AsArcadeRecords<DocumentTypes>;


const db = new SpriteServer({
  username: 'root', // root will be ok for this tutorial
  password: '999999999', // your password,
  address: 'http://localhost:2480' // default address for ArcadeDB
  //databaseName: 'ExampleDatabase' // the existing database
});

interface ExampleVertexes {
  aVertex: {
    aProperty: string;
  };
}

interface ExampleEdges {
  anEdge: {
    aProperty: string;
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
    password: 'playwithdata',
    address: 'http://localhost:2480'
  });

  //const db = client.database('SpriteIntegrationTestingDatabase');

  client.command('LIST BUTTHOLE').then(console.log);

  // const transaction = await db.newTransaction();

  //   // await db
  //   // .command<{ fProperty: string }>('sql', 'CREATE document TYPE aDocument')
  //   // .then(console.log);

  // console.log(transaction.id);

  // const [created] = await db.command<DocumentTypesWithMeta['aDocument'][]>(
  //   'sql',
  //   `INSERT INTO aDocument`,
  //   transaction
  // );

  // console.log(created);

  // const queried = await db.query<DocumentTypesWithMeta['aDocument']>(
  //   'sql',
  //   `SELECT FROM aDocument WHERE @rid == ${created['@rid']}`
  // );

  // console.log('before!', queried);


  // await transaction.commit();

  // const queried2 = await db.query<DocumentTypesWithMeta['aDocument']>(
  //   'sql',
  //   `SELECT FROM aDocument WHERE @rid == ${created['@rid']}`
  // );

  // console.log('again!', queried2)



  // await db.command('sql', 'CREATE BUCKET fType').then(console.log);
  // await db.command('sql', 'DROP BUCKET fType').then(console.log);
  // await db.command('sql', 'DROP TYPE fType').then(console.log);
  // await db.command('sql', 'DROP TYPE aType').then(console.log);

  // await db
  //   .command<{ fProperty: string }>('sql', 'CREATE document TYPE fType')
  //   .then(console.log);

  // await db
  //   .command<{ aProperty: string }>('sql', 'CREATE document TYPE aType')
  //   .then(console.log);

  // const trx = await db.newTransaction();
  // await db.command(
  //   'sql',
  //   'INSERT INTO aType CONTENT { "aProperty": "aValue" }',
  //   trx
  // );
  // await trx.commit();

  // await db
  //   .command<{ fProperty: string }>('sql', 'ALTER TYPE fType SUPERTYPE +aType')
  //   .then(console.log);

  // client.createDatabase('SpriteIntegrationTestingDatabase').then(async (db) => {
  //   const docs = db.documentModality<DocumentTypes>();

  //   await docs.createType('aDocument');
  //   await docs.transaction(async (trx) => {
  //     await docs.newDocument('aDocument', trx, {
  //       data: {
  //         aProperty: 'aValue'
  //       }
  //     });
  //     await docs.newDocument('aDocument', trx, {
  //       data: {
  //         aProperty: 'bValue'
  //       }
  //     });
  //     await docs.newDocument('aDocument', trx, {
  //       data: {
  //         aProperty: 'cValue'
  //       }
  //     });
  //   });

  //   const graph = db.graphModality<ExampleVertexes, ExampleEdges>();

  //   await graph.createVertexType('aVertex');
  //   await graph.createEdgeType('anEdge');

  //   await graph.transaction(async (trx) => {
  //     const [vertex1, vertex2, vertex3] = await graph.newVertex(
  //       'aVertex',
  //       trx,
  //       {
  //         data: [
  //           {
  //             aProperty: 'aValue'
  //           },
  //           {
  //             aProperty: 'bValue'
  //           },
  //           {
  //             aProperty: 'cValue'
  //           }
  //         ]
  //       }
  //     );

  //     const edge1 = await graph.newEdge(
  //       'anEdge',
  //       vertex1['@rid'],
  //       vertex2['@rid'],
  //       trx,
  //       {
  //         data: {
  //           aProperty: 'aValue'
  //         }
  //       }
  //     );

  //     const edge2 = await graph.newEdge(
  //       'anEdge',
  //       vertex2['@rid'],
  //       vertex3['@rid'],
  //       trx,
  //       {
  //         data: {
  //           aProperty: 'aValue'
  //         }
  //       }
  //     );

  //   });
  // });

  // await db.command('sql', 'DROP TYPE aType');
  // await db.command('sql', 'CREATE document TYPE aType');

  // await db.command('sql', 'INSERT INTO aType CONTENT { my: "eye" }', trx);

  // await db.commitTransaction(trx.id);

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
