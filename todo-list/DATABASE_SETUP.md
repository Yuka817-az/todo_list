# データベースセットアップガイド

このアプリケーションはMySQLまたはPostgreSQLを使用してデータを永続化します。

## 必要なパッケージ

以下のパッケージがインストールされています：
- `prisma` - Prisma ORM
- `@prisma/client` - Prismaクライアント
- `mysql2` - MySQLドライバー（MySQLを使用する場合）

## セットアップ手順

### 1. 環境変数の設定

プロジェクトルートに `.env` ファイルを作成し、以下の環境変数を設定してください。

**MySQLを使用する場合：**
```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

**PostgreSQLを使用する場合：**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

例：
- MySQL（ローカル）
  ```env
  DATABASE_URL="mysql://root:password@localhost:3306/todo_db"
  ```
- PostgreSQL（ローカル）
  ```env
  DATABASE_URL="postgresql://postgres:password@localhost:5432/todo_db"
  ```

### 2. データベースの作成

MySQLの場合：
```bash
mysql -u root -p
CREATE DATABASE todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

PostgreSQLの場合：
```bash
createdb todo_db
```

### 3. Prismaクライアントの生成

```bash
npx prisma generate
```

### 4. マイグレーションの実行

```bash
npx prisma migrate dev --name init
```

これにより、データベースにTodoテーブルが作成されます。

### 5. 開発サーバーの起動

```bash
npm run dev
```

## トラブルシューティング

### Prismaクライアントが見つからないエラー

```bash
npx prisma generate
```

### マイグレーションのリセット（開発環境のみ）

```bash
npx prisma migrate reset
```

### マイグレーションの状態確認

```bash
npx prisma migrate status
```

### Prisma Studio（データベースの視覚的な管理）

```bash
npx prisma studio
```

ブラウザで `http://localhost:5555` にアクセスして、データベースの内容を確認できます。

## プロダクション環境

プロダクション環境では、適切な接続プールサイズとリトライロジックを設定してください。

## データベース接続URLの形式

- **MySQL**: `mysql://USER:PASSWORD@HOST:PORT/DATABASE`
- **PostgreSQL**: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`



