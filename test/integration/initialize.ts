/**
 * Sets up the test environment, by create a new database on the local
 * server and populating it with the ArcadeDB brewery dataset.
 */

import { SpriteServer } from '../../src/SpriteServer.js';

// Create a new server instance

export const client = new SpriteServer({
  username: 'root',
  password: '999999999',
  address: 'http://localhost:2480'
});

// Create a new database on the server

const variables = {
  databaseName: 'SpriteIntegrationTestingDatabase'
};

async function initialize() {
  try {
    const ready = await client.serverReady();
    if (ready) {
      // creating a database with the server client
      const database = await client.createDatabase(variables.databaseName);

      // "ExampleDatabase was created"
      return database;
    }
  } catch (error) {
    throw new Error(
      `There was a problem creating the integration testing database.`,
      {
        cause: error
      }
    );
  }
}

initialize();
