# Demo Data

This project now includes a Prisma seed script for quickly filling the database with demo users, categories, and transactions.

## Run

```bash
npm run prisma:seed
```

## Seeded accounts

All seeded accounts use the same password:

```text
Demo12345!
```

Accounts:

- `admin.demo@finance.local` - role `ADMIN`
- `olena.demo@finance.local` - role `USER`
- `taras.demo@finance.local` - role `USER`

## What gets created

- 3 demo users
- personal income and expense categories for each user
- realistic demo transactions spread across recent dates

## Behavior

- The seed is idempotent for the demo accounts.
- Re-running it updates the same demo users and recreates only their categories and transactions.
- Existing non-demo users are not touched.
