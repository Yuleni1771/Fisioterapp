#!/bin/bash

for file in gen user proc; do
	echo Ejecutando SQL: $file
	mysql < $file.sql
done;
