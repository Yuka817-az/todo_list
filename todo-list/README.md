This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### データベースのセットアップ

このアプリケーションはMySQLまたはPostgreSQLを使用してデータを永続化します。

詳細なセットアップ手順は [`DATABASE_SETUP.md`](./DATABASE_SETUP.md) を参照してください。

#### クイックスタート

1. **環境変数の設定**

   プロジェクトルートに `.env` ファイルを作成：

```env
# MySQLを使用する場合
DATABASE_URL="mysql://root:password@localhost:3306/todo_db"

# PostgreSQLを使用する場合
DATABASE_URL="postgresql://postgres:password@localhost:5432/todo_db"
```

2. **Prismaクライアントの生成**

```bash
npx prisma generate
```

3. **データベースのマイグレーション**

```bash
npx prisma migrate dev --name init
```

### 開発サーバーの起動

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## データベース

このプロジェクトはPrisma ORMを使用してデータベース操作を行います：
- **ORM**: Prisma
- **対応データベース**: MySQL, PostgreSQL
- **スキーマファイル**: `prisma/schema.prisma`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
