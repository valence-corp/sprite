"use strict";
// import { testClient as client, testClient } from './testClient.js';
// import { endpoints } from '../../../utilities/endpoints.js';
// import { variables, testAuth } from '../variables.js';
Object.defineProperty(exports, "__esModule", { value: true });
// describe('SpriteDatabase.updateRecord()', () => {
//   it(`should make a properly formatted POST request to ${endpoints.command}/${variables.databaseName}`, async () => {
//     jest.spyOn(global, 'fetch').mockResolvedValueOnce({
//       status: 200,
//       json: async () => variables.jsonResponse,
//     } as Response);
//     await client.updateRecord(variables.rid, variables.jsonData);
//     expect(global.fetch).toHaveBeenCalledWith(
//       `${variables.address}${endpoints.command}/${variables.databaseName}`,
//       {
//         method: 'POST',
//         headers: {
//           'Authorization': `Basic ${testAuth}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           language: 'sql',
//           command: `UPDATE ${variables.rid} CONTENT ${JSON.stringify(
//             variables.jsonData,
//           )} RETURN AFTER @this`,
//         }),
//       },
//     );
//   });
//   it('handles "merge" option by appending "MERGE" + stringified JSON data to the command when passed a boolean true', async () => {
//     jest
//       .spyOn(client, 'command')
//       .mockImplementationOnce(() => ({ result: ['no'] } as any));
//     await client.updateRecord(variables.rid, variables.jsonData, true);
//     expect(client.command).toHaveBeenCalledWith(
//       'sql',
//       `UPDATE ${variables.rid} MERGE ${JSON.stringify(
//         variables.jsonData,
//       )} RETURN AFTER @this`,
//     );
//   });
//   // it('should throw an error if it receives an empty string for parameters', async () => {
//   //   const explanation = async () => testClient.explain('');
//   //   expect(explanation).rejects.toMatchSnapshot();
//   // });
//   // it('should throw an error if it receives a string of whitespace for parameters', async () => {
//   //   const explanation = async () => testClient.explain('   ');
//   //   expect(explanation).rejects.toMatchSnapshot();
//   // });
//   // it('should throw an error if it receives no parameters', async () => {
//   //   // @ts-expect-error
//   //   const explanation = async () => testClient.explain();
//   //   expect(explanation).rejects.toMatchSnapshot();
//   // });
// });
//# sourceMappingURL=updateOne.js.map