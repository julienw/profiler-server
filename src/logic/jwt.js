/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// @flow

// This file contains the utils we use to deal with JWT tokens.
// A JWT token is generated for each profile, and contains the "profile token"
// (previously known as the profile hash) that uniquely identifies some profile.
// Because a JWT is signed, we can verify it's been generated by the same
// server.
// Some more information about JWT is available at the following sites:
// - https://jwt.io
// - https://auth0.com/learn/json-web-tokens/
// - https://www.chosenplaintext.ca/2015/03/31/jwt-algorithm-confusion.html
// - https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/

import jwt from 'jsonwebtoken';
import { config } from '../config';

type Payload = {|
  +profileToken: string,
|};

class JwtConfigurationError extends Error {
  name = 'JwtConfigurationError';
  status = 500;
  expose = true; // The message will be exposed to users
}

export function generateToken(payload: Payload): string {
  if (config.jwtSecret) {
    // We use the default algorithm HS256 but are explicit about it.
    // HS256 is used because it's safe and we don't need the private/public
    // capabilities that other algorithms have, nor the longer digest size.
    return jwt.sign(payload, config.jwtSecret, { algorithm: 'HS256' });
  }

  throw new JwtConfigurationError('The secret for JWT generation is missing.');
}
