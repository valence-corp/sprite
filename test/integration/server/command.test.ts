import { variables } from '../variables.js';
import { testClient } from './testClient.js';

describe('SpriteServer.command', () => {
  it('should execute a command', async () => {
    // Arrange & Act
    const databaseList: Array<string> =
      await testClient.command('LIST DATABASES');

    // Assert
    expect(databaseList.includes(variables.databaseName)).toBe(true);
  });

  it('should propagate errors from the database', async () => {
    // Arrange & Act
    const invalidCommandPromise = testClient.command('INVALID COMMAND');

    // Assert
    await expect(invalidCommandPromise).rejects.toMatchSnapshot();
  });
});
