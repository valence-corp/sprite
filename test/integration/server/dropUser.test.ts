import { SpriteServer } from '../../../src/SpriteServer.js';
import { variables } from '../variables.js';
import { client as testClient } from './testClient.js';

const config = {
  username: variables.newUsername,
  password: variables.newPassword,
  databases: {
    [variables.databaseName]: '*'
  }
};

describe('SpriteServer.dropUser', () => {
  beforeAll(async () => {
    // Ensure the user does not exist before starting the tests
    await testClient.createUser(config).catch(() => {});
  });

  it('should drop a user and return true', async () => {
    const dropped = await testClient.dropUser(config.username);
    expect(dropped).toBe(true);
  });

  it('should not allow dropped user to check status of database', async () => {
    const newUserClient = new SpriteServer({
      username: variables.newUsername,
      password: variables.newPassword,
      address: 'http://localhost:2480'
    });

    await expect(newUserClient.serverReady()).rejects.toMatchSnapshot();
  });

  it('should propagate errors from the database', async () => {
    await expect(
      testClient.dropUser(config.username)
    ).rejects.toMatchSnapshot();
  });
});
