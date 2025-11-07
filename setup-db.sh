#!/bin/sh

set -e  # Exit on error

if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "🚀 Starting database setup..."

echo "🗄️  Checking database file..."
if [ ! -z "$DATABASE_URL" ]; then
  DB_FILE=$(echo "$DATABASE_URL" | sed 's/file://' | sed 's/?.*//')
  
  if [ ! -z "$DB_FILE" ]; then
    DB_DIR=$(dirname "$DB_FILE")
    if [ ! -d "$DB_DIR" ]; then
      echo "📁 Creating database directory: $DB_DIR"
      mkdir -p "$DB_DIR"
    fi
    
    if [ ! -f "$DB_FILE" ]; then
      echo "📝 Creating database file: $DB_FILE"
      touch "$DB_FILE"
      chmod 664 "$DB_FILE"
    else
      echo "✓ Database file exists: $DB_FILE"
    fi
    
    if [ ! -w "$DB_FILE" ]; then
      echo "🔓 Setting write permissions on database file..."
      chmod 664 "$DB_FILE"
    fi
    
    if [ ! -w "$DB_DIR" ]; then
      echo "🔓 Setting write permissions on database directory..."
      chmod 775 "$DB_DIR"
    fi
    
    echo "✅ Database file is ready and accessible"
  fi
else
  echo "⚠️  DATABASE_URL not set, skipping database file check"
fi

echo "📦 Generating Prisma Client..."
npx prisma generate

echo "🔄 Running database migrations..."
if [ "$NODE_ENV" = "production" ]; then
  npx prisma migrate deploy
else
  if [ -f "prisma/schema.prisma" ]; then
    if [ ! -d "prisma/migrations" ] || [ -z "$(ls -A prisma/migrations 2>/dev/null)" ]; then
      echo "📝 Creating initial migration..."
      npx prisma migrate dev --name init --skip-seed
    else
      echo "📝 Applying pending migrations..."
      npx prisma migrate dev --skip-seed
    fi
  else
    echo "❌ Error: prisma/schema.prisma not found!"
    exit 1
  fi
fi

echo "🌱 Seeding database..."
if [ -f "prisma/seed.ts" ]; then
  pnpm run seed
  echo "✅ Database seeded successfully!"
else
  echo "⚠️  No seed file found, skipping seeding..."
fi

echo "🔍 Verifying database..."
if [ -f "$DB_FILE" ] && [ -s "$DB_FILE" ]; then
  echo "✅ Database file exists and has content"
else
  echo "❌ Database file is missing or empty"
  exit 1
fi

echo "✅ Database setup completed successfully!"
