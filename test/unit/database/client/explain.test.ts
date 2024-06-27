import { client } from './testClient.js';
import { endpoints } from '../../../../src/endpoints/database.js';
import { variables, testAuth } from '../../../variables.js';

describe('SpriteDatabase.explain()', () => {
  it(`should make a properly formatted POST request to ${endpoints.query}/${variables.databaseName}`, async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 200,
      json: async () => variables.jsonResponse
    } as Response);
    const toExplain = 'SELECT * FROM bucketName';
    await client.explain(toExplain);

    expect(global.fetch).toHaveBeenCalledWith(
      `${variables.address}${endpoints.query}/${variables.databaseName}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${testAuth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: 'sql',
          command: `EXPLAIN ${toExplain}`
        })
      }
    );
  });

  it('should throw an error if it receives an empty string for parameters', async () => {
    const explanation = async () => client.explain('');
    expect(explanation).rejects.toMatchSnapshot();
  });

  it('should throw an error if it receives a string of whitespace for parameters', async () => {
    const explanation = async () => client.explain('   ');
    expect(explanation).rejects.toMatchSnapshot();
  });

  it('should throw an error if it receives no parameters', async () => {
    // @ts-expect-error - Testing for no parameters
    const explanation = async () => testClient.explain();
    expect(explanation).rejects.toMatchSnapshot();
  });
});
