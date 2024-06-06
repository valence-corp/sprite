import { ModalityBase } from '../../../../../src/modes/ModalityBase.js';
import { client as dbClient } from '../../client/testClient.js';
import { DocumentTypes } from '../../types.js';
import { client as operators } from '../../operators/testClient.js';

export { dbClient };
const client = new ModalityBase<DocumentTypes>(dbClient, operators);

export { client };
