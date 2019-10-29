#!/bin/sh
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

# This script generates the version file, as requested by the dockerflow
# requirements described in
# https://github.com/mozilla-services/Dockerflow/blob/master/docs/version_object.md.
# It uses the environment variables set by CircleCI.

checkEnvironment() {
  if [ -z "$CIRCLE_BUILD_URL" ] ; then
    echo 'The environment variable CIRCLE_BUILD_URL is missing. Are we running in CircleCI?'
    exit 1
  fi
  echo 'All needed environment variables have been found, good!'

  if [ ! -d .git ] ; then
    echo 'This script must be run at the root of the repository.'
    exit 1
  fi
  echo 'We are in the root directory, good!';
}

writeVersionFile() {
  target='dist/version.json'
  commitHash=`git rev-parse HEAD`
  versionObject="{
  \"source\": \"$npm_package_repository_url\",
  \"version\": \"\",
  \"commit\": \"$commitHash\",
  \"build\": \"$CIRCLE_BUILD_URL\"
}"

  echo "Writing to $target:"
  echo $versionObject

  # -p makes that it doesn't fail when the directory doesn't exist
  mkdir -p dist
  echo $versionObject > $target
}

checkEnvironment
writeVersionFile
