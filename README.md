# web-push-notification-sample

Angular9 + NestJS を使用した web push のサンプルです。
サービスワーカーがアセットをキャッシュするのでフロントエンドのファイルを変更する際は
ブラウザのキャッシュを無効にしてください。

事前に mysql で以下のクエリを実行して schema を作成してください。

```sql
CREATE SCHEMA `push_notification_sample` DEFAULT CHARACTER SET utf8mb4;
```

## Installation

```
cd ./frontend
yarn install

cd ./server
yarn install
```

## Genarate VAPID Keys

```
cd ./server
yarn web-push generate-vapid-keys
export VAPID_PUBLIC_KEY=< your Public Key >
export VAPID_PRIVATE_KEY=< your Private Key >
```

`frontend/src/app/app.component.ts`の`VAPID_PUBLIC_KEY`に作成した public key をセットしてください。

## Run the development server

```
cd ./frontend
yarn start:pwa

cd ./server
yarn start
```

## Send Notification

```
curl -X POST -H "Content-Type: application/json" -d '{"message":"Hello World!"}' http://localhost:1234/notifications
```
