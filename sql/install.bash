#!/bin/bash

for file in gen user proc data; do
	echo Ejecutando SQL: $file
	mysql < $file.sql
done;
