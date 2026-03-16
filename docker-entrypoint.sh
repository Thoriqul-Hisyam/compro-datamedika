#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "Waiting for database to be ready..."
# We can use a simple loop or just rely on the fact that migrations will retry 
# if the DB isn't ready yet, or add a more robust check.

echo "Synchronizing database schema..."
prisma db push --accept-data-loss --skip-generate

echo "Seeding database..."
prisma db seed

echo "Starting application..."
exec node server.js
