# Dockerでデータベースをセットアップする方法

## 前提条件

- Docker Desktopがインストールされていること
- Docker Desktopが起動していること

## セットアップ手順

### 1. Docker ComposeでMySQLを起動

プロジェクトルート（todo-listディレクトリ）で以下のコマンドを実行：

```powershell
docker-compose up -d
```

これにより、以下の設定でMySQLが起動します：
- ユーザー名: `root`
- パスワード: `rootpassword`
- データベース名: `todo_db`
- ポート: `3306`

### 2. 環境変数の設定

プロジェクトルートに `.env` ファイルを作成し、以下を記述：

```env
DATABASE_URL="mysql://root:rootpassword@localhost:3306/todo_db"
```

または、作成済みのユーザーを使用する場合：

```env
DATABASE_URL="mysql://todo_user:todo_password@localhost:3306/todo_db"
```

### 3. Prismaマイグレーションの実行

```powershell
npx prisma migrate dev --name init
```

### 4. Dockerの停止

データベースを停止する場合：

```powershell
docker-compose down
```

データベースを削除して完全にリセットする場合：

```powershell
docker-compose down -v
```

## トラブルシューティング

### ポートが既に使用されている場合

docker-compose.ymlのポート番号を変更：

```yaml
ports:
  - "3307:3306"  # 左側を変更（例: 3307）
```

`.env`も対応するポートに変更：

```env
DATABASE_URL="mysql://root:rootpassword@localhost:3307/todo_db"
```

### Dockerの状態を確認

```powershell
docker ps
```

### ログを確認

```powershell
docker-compose logs mysql
```



