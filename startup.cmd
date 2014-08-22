@echo off
mode con cols=140 lines=30
title %CD%/%1

@echo nodejs proxy server is running...

node index > ../../log/run.log.0