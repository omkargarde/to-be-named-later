# Cloudflare Skills for Opencode

This project is a TanStack React app deployed on Cloudflare Workers with D1 database.

## Environment Variables

Create a `.env` file with these variables:

```typescript
CLOUDFLARE_ACCOUNT_ID = your_account_id;
CLOUDFLARE_DATABASE_ID = your_database_id;
CLOUDFLARE_D1_TOKEN = your_d1_token;
```

## Common Commands

### Development

NOTE: always use bun, do not use npm

- `bun run dev` - Start development server on port 3000
- `bun run preview` - Build and preview locally with Wrangler

### Build & Deploy

- `bun run build` - Build for production
- `bun run deploy` - Build and deploy to Cloudflare Workers

### Database (D1)

- `bunx drizzle-kit generate` - Generate database migrations
- `bunx drizzle-kit migrate` - Run database migrations
- `bunx drizzle-kit studio` - Open Drizzle Studio for database management
- `bunx wrangler d1 execute
ecommerce_d1 --local --file=./drizzle/0000_xxxx.sql` - Execute SQL locally

### Type Generation

- `bun run cf-typegen` - Generate Cloudflare Worker types (updates `worker-configuration.d.ts`)

### Testing

- `bun run test` - Run Vitest tests

## Project Structure

- `src/env.ts` - Environment variable validation using t3env
- `src/database/` - Database schema and connection
- `drizzle.config.ts` - Drizzle ORM configuration
- `worker-configuration.d.ts` - Cloudflare Worker bindings types

## Key Dependencies

- **@cloudflare/vite-plugin**: Cloudflare Vite integration
- **wrangler**: Cloudflare CLI for deployment
- **drizzle-orm**: TypeScript ORM
- **drizzle-kit**: Database toolkit
- **@t3-oss/env-core**: Environment variable validation

## Cloudflare Bindings

The project uses these Cloudflare resources:

- **D1 Database**: `ecommerce_d1` - SQLite database for data persistence

## Notes

- This project uses the Cloudflare Vite plugin for local development
- Database operations in development use the local D1 database
- Always run `cf-typegen` after modifying `wrangler.toml` or adding bindings
