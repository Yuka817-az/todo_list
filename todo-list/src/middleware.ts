export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * 認証が必要なパスを指定
     * - トップページ（/）: 認証必須
     * - 除外: /api/* (APIエンドポイント)
     * - 除外: /auth/* (認証関連ページ)
     */
    "/((?!api|auth|_next/static|_next/image|favicon.ico).*)",
  ],
};


