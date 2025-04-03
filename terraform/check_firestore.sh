#!/bin/bash
DOCUMENT_NAME="projects/poc-car-delivery/databases/(default)/documents/settings/adminList"

if gcloud firestore documents describe "$DOCUMENT_NAME" --format="json" > /dev/null 2>&1; then
    echo '{\"exists\": true}'
else
    echo '{\"exists\": false}'
fi