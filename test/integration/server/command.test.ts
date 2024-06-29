import { variables } from '../variables.js';
import { client as testClient } from './testClient.js';

describe('SpriteServer.command', () => {
  it('should execute a command', async () => {
    const list: Array<string> = await testClient.command('LIST DATABASES');

    expect(list.includes(variables.databaseName)).toBe(true);
  });

  it('should propagate errors from the database', async () => {
    await expect(
      testClient.command('INVALID COMMAND')
    ).rejects.toMatchSnapshot();
  });
});
