import { variables } from '../variables.js';
import { client as testClient } from './testClient.js';

describe('SpriteServer.createDatabase', () => {
  it('should create a database', async () => {
    await testClient.createDatabase(variables.newDatabaseName);
    const list = await testClient.listDatabases();

    expect(list.includes(variables.newDatabaseName)).toBe(true);
  });

  it('should propagate errors from the database', async () => {
    await expect(testClient.createDatabase(variables.newDatabaseName)
    ).rejects.toMatchSnapshot();
  });
});
