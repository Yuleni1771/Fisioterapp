#!/bin/bash

for file in gen user ; do
	echo Ejecutando SQL: $file
	mysql < $file.sql
done;
