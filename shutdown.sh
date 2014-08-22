#!/bin/bash

CUR_DIR=$(cd $(dirname $0); pwd)

echo "begin exec shutdown"

${CUR_DIR}/kill.sh

echo "end exec shutdown"