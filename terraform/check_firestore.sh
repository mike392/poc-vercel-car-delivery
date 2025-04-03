#!/bin/bash
DOCUMENT_NAME="projects/poc-car-delivery/databases/(default)/documents/settings/adminList"
echo 'HELLLOOOOO'
if gcloud firestore documents describe "$DOCUMENT_NAME" --format="json" > /dev/null 2>&1; then
    echo '{"status": "found"}'
else
    echo '{"status": "not_found"}'
fi