import { variables } from '../variables.js';
import { testClient } from './testClient.js';

describe('SpriteServer.createDatabase', () => {
  it('should create a database', async () => {
    try {
      // Arrange
      await testClient.createDatabase(variables.newDatabaseName);

      // Act
      const list = await testClient.listDatabases();

      // Assert
      const databaseCreated = list.includes(variables.newDatabaseName);
      expect(databaseCreated).toBe(true);
    } finally {
      testClient.dropDatabase(variables.newDatabaseName);
    }
  });

  it('should propagate errors from the database', async () => {
    // Arrange
    const createPromise = testClient.createDatabase(variables.databaseName);

    // Assert
    await expect(createPromise).rejects.toMatchSnapshot();
  });
});
