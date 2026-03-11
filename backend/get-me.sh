#! /bin/bash

# Ruft zum testen den /api/me-Endpunkt auf
#
#  - Dieser Endpunkt ist nur vorhanden, wenn in der .env-Datei
#    ENABLE_AUTH auf true gesetzt ist!
#
# Als Parameter muss der Token übergeben werden.
#  Token kann erzeugt werden mit: get-token.sh

TOKEN="${1:-}"

if [ -z "$TOKEN" ]; then
  echo "Verwendung: $0 <TOKEN>"
  exit 1
fi

curl -v http://localhost:3000/api/me \
  -H "Authorization: Bearer $TOKEN"

