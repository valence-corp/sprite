import { SpriteServer } from '../../../src/SpriteServer.js';

import {
  StartedTestContainer,
  StoppedTestContainer,
  GenericContainer
} from 'testcontainers';

async function initialize() {
  const container = await GenericContainer.fromDockerfile('./test/integration/database/')
    .withTarget('my-stage')
    .build();

  const startedContainer: StartedTestContainer = await container.start();
  const stoppedContainer: StoppedTestContainer = await startedContainer.stop();

  const host = startedContainer.getHost();
  const port = startedContainer.getMappedPort(2480);

  // Wait for the database to be ready
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const client = new SpriteServer({
    username: 'root',
    password: 'playwithdata',
    address: `http://${host}:${port}`
  });
}

initialize();