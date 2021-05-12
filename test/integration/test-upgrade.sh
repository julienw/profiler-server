#!/bin/bash

set -e
set -x

yarn start &
server_pid=$!

cleanup() {
  kill $server_pid
}

trap cleanup 0

while ! curl -i --silent --show-error --fail http://localhost:5252/__lbheartbeat__ ; do
  sleep 1
done

(
  cd loadtest
  . venv/bin/activate
  API_ENDPOINT=http://localhost:5252 molotov --single-mode publish_and_delete -r 1 publish.py
)

echo "Was there an error?"
read -r enter

