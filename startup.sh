#!/bin/bash

CUR_DIR=$(cd $(dirname $0); pwd) 
echo "startup，the current path is : $CUR_DIR"

echo "begin exec start"
PIDS=$(ps -ef|grep node_bigpipe_edu-0.0/bin/|grep /bin/node|gawk '$0 !~/grep/ {print $2}' |tr -s '\n' ' ')

if [ "$PIDS" ]
then
	echo "pids:$PIDS"
	exit 0
else
	echo "do nothing,there is no pids"
fi



if [ -f "/usr/lib64/libdcapi_cpp-64.so" ]
then
echo "libdcapi_cpp-64.so ok!";
else
echo "copy libdcapi_cpp-64.so ok!";
cp  "${CUR_DIR}/../node_modules/api/libdcapi/x86_64/libdcapi_cpp-64.so" /usr/lib64/libdcapi_cpp-64.so
fi


if [ -f "/usr/lib64/libqos_client_64.so" ]
then
echo "libqos_client_64.so ok!";
else
echo "copy libqos_client_64.so ok!";
cp  "${CUR_DIR}/../node_modules/api/L5/L5_sys64/libqos_client_64.so" /usr/lib64/libqos_client_64.so
fi



if [ -f "${CUR_DIR}/../node-v0.8.26/bin/node" ]
then
	${CUR_DIR}/../node-v0.8.26/bin/node ${CUR_DIR}/web.js >> ${CUR_DIR}/../../log/run.log.0 2>&1 &
else
	node ${CUR_DIR}/index.js >> ${CUR_DIR}/../../log/run.log.0 2>&1 &
fi

PIDS=$(ps -ef|grep node_bigpipe_edu-0.0|gawk '$0 !~/grep/ {print $2}' |tr -s '\n' ' ')
echo "pids:$PIDS"

echo start ok

