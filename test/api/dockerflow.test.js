/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// @flow

import chakram from 'chakram';
//import fs from 'fs';

import { startServer, stopServer, serverUrl } from './utils/server-manager';

beforeEach(async () => {
  await startServer();
});

afterEach(async () => {
  await stopServer();
});

describe('dockerflow endpoints', () => {
  it('answers to the heartbeat', async () => {
    const response = await chakram.get(`${serverUrl}/__heartbeat__`);
    chakram.expect(response).status(200);
  });

  it('answers to the live balancer heartbeat', async () => {
    const response = await chakram.get(`${serverUrl}/__lbheartbeat__`);
    chakram.expect(response).status(200);
  });

  /*
  it('answers to the version endpoint when the file is absent', async () => {
    const error = new Error("Can't find the requested file.");
    (error: any).code = 'ENOENT';
    jest.spyOn(fs.promises, 'readFile').mockRejectedValue(error);
    const agent = setup();
    await agent.get('/__version__').expect(404);
  });

  it('answers to the version endpoint when the file is present', async () => {
    const fixture = require('./fixtures/version.json');
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fixture);
    const agent = setup();
    const response = await agent
      .get('/__version__')
      .expect('Content-Type', /^application\/json/)
      .expect(200);

    expect(response.body).toEqual(fixture);
  });
*/
});
