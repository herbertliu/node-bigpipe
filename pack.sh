#!/bin/bash


rm -rf ./pipe
rm -rf ./pipe.tgz

mkdir ./pipe

cp ./*.js ./pipe
cp ./*.sh ./pipe

chmod 644 ./pipe/*.js
chmod 755 ./pipe/*.sh

tar -zcvf pipe.tgz ./pipe

rm -rf ./pipe


