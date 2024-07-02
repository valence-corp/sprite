import { SpriteServer } from './SpriteServer.js';
import { SpriteDatabase } from './SpriteDatabase.js';

export { SpriteServer };
export { SpriteDatabase };
export * from './types/index.js';

const db = new SpriteDatabase({
  address: 'http://localhost:2480',
  databaseName: 'SpriteIntegrationTesting',
  username: 'root',
  password: '999999999'
});

interface Documents {
  aDocument: {
    aProperty: string;
  };
}

const docs = db.documentModality<Documents>();

async function main() {
  const one = await db.command('sql', 'CREATE document TYPE aDocument');
  const two = await db.command(
    'sql',
    'CREATE document TYPE aDocument IF NOT EXISTS'
  );

  console.log(one, two);
}

main();