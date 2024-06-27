import { endpoints } from "../../../src/endpoints/server.js";
import { testAuth, variables } from "../../variables.js";
import { client } from "./testClient.js";

describe("SpriteServer.openDatabase()", () => {
  it(`should make a properly formatted POST request to ${endpoints.command}`, async () => {
    // Arrange
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Basic ${testAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: `OPEN DATABASE ${variables.databaseName}`,
      }),
    };

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({
        result: "ok",
      }),
    } as Response);

    // Act
    await client.openDatabase(variables.databaseName);

    // Assert
    expect(fetch).toHaveBeenCalledWith(
      `${variables.address}${endpoints.command}`,
      options,
    );
  });

  it('should throw an error if no "databaseName" is supplied', async () => {
    // Act
    // @ts-expect-error - Testing error handling f0r no arguments in openDatabase
    expect(() => client.openDatabase()).rejects.toMatchSnapshot();
  });
});
