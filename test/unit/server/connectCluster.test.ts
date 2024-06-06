
import { endpoints } from '../../../src/endpoints/server.js';
import { testAuth, variables } from '../../variables.js';
import { client } from './testClient.js';

describe('SpriteServer.connectCluster()', () => {
  it(`should make a properly formatted POST request to ${endpoints.command}`, async () => {
    // Arrange
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${testAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command: `CONNECT CLUSTER ${variables.address}`,
      }),
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => variables.jsonResponse,
    } as Response);

    // Act
    await client.connectCluster(variables.address);

    // Assert
    expect(fetch).toHaveBeenCalledWith(
      `${variables.address}${endpoints.command}`,
      options,
    );
  });

  it('should throw an error if no "address" is supplied', async () => {
    // @ts-expect-error
    expect(() => client.connectCluster()).rejects.toMatchSnapshot();
  });

  it('should throw an error if "address" is an empty string', async () => {
    expect(() => client.connectCluster('')).rejects.toMatchSnapshot();
  });

  it('should throw an error if "address" is a string containing only whitespace', async () => {
    expect(() => client.connectCluster('   ')).rejects.toMatchSnapshot();
  });

  it('should throw an error if supplied "address" is a number', async () => {
    // @ts-expect-error
    expect(() => client.connectCluster(9)).rejects.toMatchSnapshot();
  });

  it('should throw an error if supplied "address" is an object', async () => {
    // @ts-expect-error
    expect(() => client.connectCluster({})).rejects.toMatchSnapshot();
  });

  it('should throw an error if supplied "address" is boolean', async () => {
    // @ts-expect-error
    expect(() => client.connectCluster(false)).rejects.toMatchSnapshot();
  });
});
