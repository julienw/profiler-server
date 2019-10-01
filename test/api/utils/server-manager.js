/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// @flow

import { spawn } from 'child_process';
import path from 'path';
import tcpPortUsed from 'tcp-port-used';

const entryPoint = path.join(__dirname, '../../../src/index.js');

let handler;
const httpPort = 24243;
export const serverUrl = `http://localhost:${httpPort}`;

export function startServer() {
  handler = spawn('babel-node', [entryPoint, '--httpPort', String(httpPort)], {
    stdio: 'inherit',
  });
  const timeBetweenRetriesInMs = 500;
  const timeOutInMs = 5000;
  return tcpPortUsed.waitUntilUsed(
    httpPort,
    timeBetweenRetriesInMs,
    timeOutInMs
  );
}

export function stopServer(): Promise<void> {
  return new Promise(resolve => {
    handler.on('exit', () => resolve());
    handler.kill();
  });
}
