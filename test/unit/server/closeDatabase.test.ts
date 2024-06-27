import { endpoints } from '../../../src/endpoints/server.js';
import { testAuth, variables } from '../../variables.js';
import { client } from './testClient.js';

describe('SpriteServer.closeDatabase()', () => {
  it(`should make a properly formatted POST request to ${endpoints.command}`, async () => {
    // Arrange
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${testAuth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        command: `CLOSE DATABASE ${variables.databaseName}`
      })
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ result: 'ok' })
    } as Response);

    // Act
    await client.closeDatabase(variables.databaseName);

    // Assert
    expect(fetch).toHaveBeenCalledWith(
      `${variables.address}${endpoints.command}`,
      options
    );
  });

  it('should throw an error if no "databaseName" is supplied', async () => {
    // Act
    // @ts-expect-error - Testing error handling for no arguments in closeDatabase
    expect(() => client.closeDatabase()).rejects.toMatchSnapshot();
  });

  // it('should throw an error if "databaseName" is an empty string', async () => {
  //   // Act
  //   expect(() => client.closeDatabase('')).rejects.toMatchSnapshot();
  // });

  // it('should throw an error if "databaseName" is a string containing only whitespace', async () => {
  //   // Act
  //   expect(() => client.closeDatabase('   ')).rejects.toMatchSnapshot();
  // });

  // it('should throw an error if supplied "databaseName" is a number', async () => {
  //   // Act
  //   expect(() => client.createDatabase(9)).rejects.toMatchSnapshot();
  // });

  it('should throw an error if supplied "databaseName" is an object', async () => {
    // Act
    expect(() => client.createDatabase('')).rejects.toMatchSnapshot();
  });

  it('should throw an error if supplied "databaseName" is boolean', async () => {
    // Act
    // @ts-expect-error - Testing error handling for a boolean argument in createDatabase
    expect(() => client.createDatabase(false)).rejects.toMatchSnapshot();
  });
});
