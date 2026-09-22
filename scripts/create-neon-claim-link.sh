#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .neon-claim/identity.json ]]; then
  echo "Metadados do projeto Neon temporário não encontrados." >&2
  exit 1
fi

IDENTITY_ASSERTION="$(jq -r '.identity_assertion' .neon-claim/identity.json)"
PROJECT_ID="$(jq -r '.project.id' .neon-claim/identity.json)"
PROJECT_EXPIRES_AT="$(jq -r '.project.expires_at' .neon-claim/identity.json)"

curl --fail --silent --show-error \
  --request POST https://claimable.neon.tech/v1/oauth2/token \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer' \
  --data-urlencode "assertion=$IDENTITY_ASSERTION" \
  --data-urlencode 'resource=https://claimable.neon.tech/' \
  > .neon-claim/token.json

ACCESS_TOKEN="$(jq -r '.access_token' .neon-claim/token.json)"

curl --fail --silent --show-error \
  --request POST "https://claimable.neon.tech/v1/projects/$PROJECT_ID/claim" \
  --header "Authorization: Bearer $ACCESS_TOKEN" \
  > .neon-claim/claim.json

CLAIM_URL="$(jq -r '.verification_uri_complete' .neon-claim/claim.json)"
CLAIM_EXPIRES_IN="$(jq -r '.expires_in' .neon-claim/claim.json)"

jq -n \
  --arg projectId "$PROJECT_ID" \
  --arg projectExpiresAt "$PROJECT_EXPIRES_AT" \
  --arg claimUrl "$CLAIM_URL" \
  --argjson claimExpiresIn "$CLAIM_EXPIRES_IN" \
  '{projectId: $projectId, projectExpiresAt: $projectExpiresAt, claimUrl: $claimUrl, claimExpiresInSeconds: $claimExpiresIn}' \
  > .neon-claim/summary.json

printf 'PROJECT_ID=%s\nPROJECT_EXPIRES_AT=%s\nCLAIM_URL=%s\nCLAIM_EXPIRES_IN_SECONDS=%s\n' \
  "$PROJECT_ID" "$PROJECT_EXPIRES_AT" "$CLAIM_URL" "$CLAIM_EXPIRES_IN"
