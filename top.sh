#!/bin/bash


PIDS=$(ps -ef|grep node_bigpipe_edu-0.0|gawk '$0 !~/grep/ {print $2}' |tr -s '\n' ','|sed 's/,$/\n/')

if [ "$PIDS" ]
then
	top -c -p $PIDS
else
	echo "do nothing,there is no pids"
fi


