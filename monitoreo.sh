#!/bin/bash

DIRECTORY_TO_WATCH="/var/www/html/images"
LOG_FILE="/var/www/html/registro.log"

inotifywait -m -r -e modify -e create --format '%w%f' "${DIRECTORY_TO_WATCH}" | while read MODFILE
do
    echo "$(date) ${MODFILE} fue modificado o creado" >> "${LOG_FILE}"
done