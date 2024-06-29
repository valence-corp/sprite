import { variables } from '../variables.js';
import { client as testClient } from './testClient.js';

describe('SpriteServer.databaseExists', () => {
  it('should return true if the test database exits', async () => {
    const exists = await testClient.databaseExists(variables.databaseName);
    expect(exists).toBe(true);
  });

  it('should return false if the database does not exist', async () => {
    const exists = await testClient.databaseExists('FAKE_DATABASE');
    expect(exists).toBe(false);
  });
});
