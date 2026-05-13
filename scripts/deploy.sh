#!/bin/bash
# deploy.sh — Full build + deploy to S3 + CloudFront invalidation
# Usage: bash scripts/deploy.sh
# Always run this after any code change. Never deploy individual files manually.

set -e

BUCKET="www.redheart.in"
DISTRIBUTION_ID="E1LXWMZF10FAA2"
REGION="ap-southeast-2"

echo "🔨 Building..."
npm run build

echo ""
echo "📦 Deploying static assets (JS/CSS/media) — immutable cache..."
python3.11 -m awscli s3 sync build/static/ s3://$BUCKET/static/ \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --delete

echo ""
echo "📄 Deploying index.html — no cache..."
python3.11 -m awscli s3 cp build/index.html s3://$BUCKET/index.html \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html" \
  --region $REGION

echo ""
echo "♻️  Invalidating CloudFront cache..."
python3.11 -m awscli cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/index.html" \
  --region us-east-1

echo ""
echo "✅ Deploy complete!"
