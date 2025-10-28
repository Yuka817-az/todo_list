"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"

export default function SignIn() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (status === "loading") {
    return <div>読み込み中...</div>
  }

  if (session) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">ログイン済み</h1>
        <p className="mb-4">こんにちは、{session.user?.email}さん！</p>
        <button
          onClick={() => signOut()}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          ログアウト
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          signIn("credentials", { email, password })
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          ログイン
        </button>
      </form>
    </div>
  )
}
