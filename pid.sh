#!/bin/bash


CUR_DIR=$(cd $(dirname $0); pwd) 
echo $CUR_DIR

PIDS=$(ps -ef|grep node_bigpipe_edu-0.0/bin/|grep /bin/node|gawk '$0 !~/grep/ {print $2}' |tr -s '\n' ' ')
if [ "$PIDS" ]
then
	echo "pids:$PIDS"
else
	echo "do nothing,there is no pids"
fi


PIDS=$(ps -ef|grep node_bigpipe_edu-0.0/direct|gawk '$0 !~/grep/ {print $2}' |tr -s '\n' ' ')
if [ "$PIDS" ]
then
	echo "pids:$PIDS"
else
	echo "do nothing,there is no pids"
fi
