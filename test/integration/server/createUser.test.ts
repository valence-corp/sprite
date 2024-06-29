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

let newUserClient: SpriteServer;

describe('SpriteServer.createUser', () => {
  beforeAll(async () => {
    newUserClient = new SpriteServer({
      username: variables.newUsername,
      password: variables.newPassword,
      address: 'http://localhost:2480'
    });

    // Ensure the user does not exist before starting the tests
    await testClient.dropUser(config.username).catch(() => {});
  });

  it('should create a user and return true', async () => {
    const created = await testClient.createUser(config);
    expect(created).toBe(true);
  });

  it('should allow new user to check status of database', async () => {
    const isReady = await newUserClient.serverReady();
    expect(isReady).toBe(true);
  });

  it('should propagate errors from the database', async () => {
    await expect(testClient.createUser(config)).rejects.toMatchSnapshot();
  });

  it('should prevent dropped user from checking status', async () => {
    const dropped = await testClient.dropUser(config.username);
    expect(dropped).toBe(true);
    await expect(newUserClient.serverReady()).rejects.toThrow();
  });
});
