import { client, dbClient as SpriteDatabase } from "./testClient.js";
import { variables } from "../../../../variables.js";
import { ArcadeCommandResponse } from "../../../../../src/types/database.js";
import { testTransaction } from "../../client/testClient.js";

const typeName = "anEdge";

const newEdge = {
  "@rid": variables.rid,
  "@cat": "e",
  "@type": typeName,
  "@in": variables.rid,
  "@out": variables.rid,
  aProperty: "aValue",
};

const newEdgeCommandResponse = {
  user: variables.username,
  serverName: "",
  version: "",
  result: [newEdge],
};

describe("GraphModality.newEdge()", () => {
  // Arrange
  beforeEach(() => {
    jest
      .spyOn(SpriteDatabase, "command")
      .mockImplementationOnce(
        async (): Promise<ArcadeCommandResponse<unknown>> =>
          newEdgeCommandResponse,
      );
  });

  it(`correctly passes typeName, to, from, options.data, and options.transactionId to SpriteOperations._createEdge`, async () => {
    // Act
    await client.newEdge(
      typeName,
      variables.rid,
      variables.rid,
      testTransaction,
      {
        data: {
          aProperty: "aValue",
        },
      },
    );

    // Assert
    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      `sql`,
      `CREATE EDGE ${typeName} FROM ${variables.rid} TO ${
        variables.rid
      } CONTENT ${JSON.stringify({
        aProperty: "aValue",
      })}`,
      testTransaction,
    );
  });

  it(`correctly passes handles options.bucket`, async () => {
    //Act
    await client.newEdge(
      typeName,
      variables.rid,
      variables.rid,
      testTransaction,
      {
        bucket: variables.bucketName,
      },
    );

    // Assert
    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      `sql`,
      `CREATE EDGE ${typeName} BUCKET ${variables.bucketName} FROM ${variables.rid} TO ${variables.rid}`,
      testTransaction,
    );
  });

  it("should return the newly created edge", async () => {
    // Act
    const record = await client.newEdge(
      typeName,
      variables.rid,
      variables.rid,
      testTransaction,
      {
        data: {
          aProperty: "aValue",
        },
      },
    );

    // Assert
    expect(record).toMatchObject(newEdge);
  });
});
