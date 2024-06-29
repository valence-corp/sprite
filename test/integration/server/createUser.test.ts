import { variables } from '../variables.js';
import { client as testClient } from './testClient.js';

const config = {
  username: variables.newUsername,
  password: variables.newPassword,
  databases: {
    [variables.databaseName]: '*'
  }
};

describe('SpriteServer.createUser', () => {
  it('should create a user', async () => {
    const created = await testClient.createUser(config);
    expect(created).toBe(true);
  });

  it('should propagate errors from the database', async () => {
    await expect(testClient.createUser(config)).rejects.toMatchSnapshot();
  });
});
