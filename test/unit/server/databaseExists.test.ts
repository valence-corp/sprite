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
      status: 200,
      json: async () => ({
        result: true
      })
    } as Response);

    // Act
    await client.databaseExists(variables.databaseName);

    // Assert
    expect(fetch).toHaveBeenCalledWith(
      `${variables.address}${endpoints.exists}/${variables.databaseName}`,
      options
    );
  });

  it('should forward the "true" result for a 200 status response from the server', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        result: true
      })
    } as Response);
    const response = await client.databaseExists(variables.databaseName);

    expect(response).toBe(true);
  });
});
