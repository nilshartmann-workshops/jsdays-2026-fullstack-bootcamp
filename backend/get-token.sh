#!/usr/bin/env bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | grep -v '^$' | xargs)
fi

# Check if username is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <username> [--extract]"
  echo "Available users: admin, susi"
  echo " --extract: only show access_token, not full response"
  exit 1
fi

USERNAME=$1

# Set password based on username
case $USERNAME in
  admin)
    PASSWORD="pw_admin"
    ;;
  susi)
    PASSWORD="pw_susi"
    ;;
  *)
    echo "Unknown user: $USERNAME"
    echo "Available users: admin, susi"
    exit 1
    ;;
esac

# Check if KEYCLOAK_URL is set
if [ -z "$KEYCLOAK_URL" ]; then
  echo "Error: KEYCLOAK_URL not found in .env file"
  exit 1
fi

echo "Using Keycloak URL: $KEYCLOAK_URL"

# Get token
RESPONSE=$(curl -s -X POST "${KEYCLOAK_URL}/realms/bookstore/protocol/openid-connect/token" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=bookstore-cli' \
  -d 'grant_type=password' \
  -d "username=$USERNAME" \
  -d "password=$PASSWORD")

# Check if --extract flag is provided
if [ "$2" = "--extract" ]; then
  echo "$RESPONSE" | grep -o '"access_token":"[^"]*"' | sed 's/"access_token":"\([^"]*\)"/\1/'
else
  echo "$RESPONSE"
fi
