#!/bin/sh

# Set the directory to monitor
DIR="/var/www/html/images"

# Set the output file
OUTFILE="/var/www/html/registro.log"
echo "version 3"
# Initialize last modified file
LASTMODFILE=""

# Monitor the directory for create, modify and delete events
inotifywait -m -e create -e modify -e delete --format '%T %:e %f' --timefmt '%F %T' "$DIR" | while read -r LINE; do
    # Parse the line into timestamp, event and file
    TIMESTAMP=$(echo "$LINE" | cut -d ' ' -f 2)
    EVENT=$(echo "$LINE" | cut -d ' ' -f 3)
    FILE=$(echo "$LINE" | cut -d ' ' -f 4)

    # Check if this is a modify event for the same file as the last one
    if [ "$EVENT" = "MODIFY" ] && [ "$FILE" = "$LASTMODFILE" ]; then
        # Ignore this event
        continue
    fi

    # Write the line to the output file
    echo "$LINE" >> "$OUTFILE"

    # Update last modified file
    if [ "$EVENT" = "MODIFY" ]; then
        LASTMODFILE="$FILE"
    else
        LASTMODFILE=""
    fi
done &

# Run the app.js script
node /var/www/html/app.js
