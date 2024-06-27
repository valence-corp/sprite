import { endpoints } from '../../../src/endpoints/server.js';
import { testAuth, variables } from '../../variables.js';
import { client } from './testClient.js';

describe('SpriteServer.databaseExists()', () => {
  it('should make a properly formatted fetch request with supplied options', async () => {
    // Arrange
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${testAuth}`,
        'Content-Type': 'application/json'
      }
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 200
    } as Response);

    // Act
    await client.databaseExists(variables.databaseName);

    // Assert
    expect(fetch).toHaveBeenCalledWith(
      `${variables.address}${endpoints.exists}/${variables.databaseName}`,
      options
    );
  });

  it('should return a boolean "true" for a 200 status response from the server', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 200,
      json: async () => variables.jsonResponse
    } as Response);

    const response = await client.databaseExists(variables.databaseName);

    expect(response).toBe(true);
  });

  it('should return a boolean "false" for a 400 status response from the server', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 400
    } as Response);
    const response = await client.databaseExists(variables.databaseName);
    expect(response).toBe(false);
  });
});
