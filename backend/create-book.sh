#! /bin/bash

TOKEN=$1

if [ -z "${TOKEN}" ]; then
  echo "Missing Token!"
  exit 1;
fi;

curl -v http://localhost:3000/api/books \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"authorId":"a1","title":"JS Basics","pages":200,"year":2026,"isbn":"4234-31231-3122"}'