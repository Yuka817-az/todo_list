import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 簡易ログイン: 任意のメール/パスワードで通すデモ
        // 実運用ではDB検証に置き換えてください
        return {
          id: "1",
          email: credentials.email,
          name: "User",
        } as any;
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-expect-error add id to token
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // @ts-expect-error augment id on session.user
        session.user.id = (token as any).id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // ログイン後のリダイレクト先を設定
      if (url === `${baseUrl}/auth/signin`) {
        return `${baseUrl}/`;
      }
      // 相対URLの場合はbaseUrlを追加
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // 同じドメインの場合はそのまま
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    }
  },
  session: {
    strategy: "jwt",
  },
};


