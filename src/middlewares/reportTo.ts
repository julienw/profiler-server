/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */




// This middleware adds the header Report-To that's used in CSP. It specifies
// the URL that CSP (and other) reports are sent to.
// This header supersedes report-uri but isn't widely implemented yet.
// To read more about it, here is the spec:
// https://w3c.github.io/reporting/
import { Context } from "koa";

type Endpoint = {
  readonly url: string;
  readonly priority?: number;
  readonly weight?: number;
};

type ReportToOptions = Array<{
  readonly group: string;
  readonly maxAge: number;
  readonly includeSubdomains?: boolean;
  readonly endpoints: Array<Endpoint>;
}>;

const HEADER_NAME = 'Report-To';

export function reportTo(options: ReportToOptions) {
  if (!options.length) {
    throw new Error('reportTo requires at least one endpoint group.');
  }

  const readyOptions = options.map(({
    group,
    maxAge,
    includeSubdomains,
    endpoints
  }) => ({
    group,
    max_age: maxAge,
    include_subdomains: includeSubdomains,
    endpoints
  }));
  // The header value is a the stringified JSON value without the start and
  // stop brackets.
  // See:
  // - https://w3c.github.io/reporting/#header
  // - https://tools.ietf.org/html/draft-reschke-http-jfv-11#section-2
  const headerValue = JSON.stringify(readyOptions).slice(1, -1);

  return async function (ctx: Context, next: () => Promise<void>) {
    ctx.set(HEADER_NAME, headerValue);

    await next();
  };
}