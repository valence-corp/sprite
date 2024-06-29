import { RID_REGEX } from '../regex.js';
import { testClient } from './testclient.js';

interface EdgeTypes {
  FlavourInGroup: {
    aProperty: string;
  };
}

interface VertexTypes {
  Flavour: {
    name: string;
  };
}

const typeName = 'FlavourInGroup';
const dbClient = testClient.database;
type TypeName = typeof typeName;

const data = {
  aProperty: 'aValue'
};

const indexDescriptor = {
  type: 'Flavour',
  key: 'name',
  value: 'Honey'
} as const;

const createEdgeTyped = testClient.createEdge<
  EdgeTypes,
  VertexTypes,
  TypeName,
  'Flavour',
  'Flavour'
>;

const [vertexOne, vertexTwo] = [
  {
    name: 'Sherry',
    '@cat': 'v',
    '@type': 'Flavour',
    '@rid': '#33:0'
  },
  {
    name: 'Peat',
    '@cat': 'v',
    '@type': 'Flavour',
    '@rid': '#33:1'
  }
];

describe('SqlDialect.createEdge()', () => {
  it(`should create an edge`, async () => {
    const trx = await dbClient.newTransaction();

    // Act
    const [edge] = await createEdgeTyped(
      typeName,
      vertexOne['@rid'],
      vertexTwo['@rid'],
      trx,
      {
        data
      }
    );

    // reverse the creation
    trx.rollback();

    // Assert
    expect(edge['@rid']).toMatch(RID_REGEX);
    expect(edge['@cat']).toBe('e');
    expect(edge['@type']).toBe(typeName);
    expect(edge['@in']).toBe(vertexTwo['@rid']);
    expect(edge['@out']).toBe(vertexOne['@rid']);
    expect(edge.aProperty).toBe('aValue');
  });

  it(`should create an edge(s) using the vertex descriptor instead of an @rid`, async () => {
    const trx = await dbClient.newTransaction();

    // Act

    const [edge] = await createEdgeTyped(
      typeName,
      indexDescriptor,
      vertexTwo['@rid'],
      trx,
      {
        data
      }
    );

    // reverse the creation
    trx.rollback();

    // Assert
    expect(edge['@rid']).toMatch(RID_REGEX);
    expect(edge['@cat']).toBe('e');
    expect(edge['@type']).toBe(typeName);
    expect(edge['@in']).toMatch(RID_REGEX);
    expect(edge['@out']).toMatch(RID_REGEX);
    expect(edge.aProperty).toBe('aValue');
  });

  it(`should propagate errors from the database`, async () => {
    const trx = await dbClient.newTransaction();

    // Assert
    await expect(
      createEdgeTyped(typeName, 'INVALID_RID', 'INVALID_RID', trx, {
        data
      })
    ).rejects.toMatchSnapshot();

    // reverse the creation
    trx.rollback();
  });
});
