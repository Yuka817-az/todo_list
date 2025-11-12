"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"
import "../../globals.scss"

export default function SignIn() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (status === "loading") {
    return (
      <div className="signin_container">
        <div className="signin_card">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            読み込み中...
          </div>
        </div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="signin_container">
        <div className="signin_card">
          <div className="signin_message">
            <h1>ログイン済み</h1>
            <p>こんにちは、{session.user?.email}さん！</p>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="logout_button"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn("credentials", { 
        email, 
        password,
        callbackUrl: "/"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signin_container">
      <div className="signin_card">
        <h1>ログイン</h1>
        <form onSubmit={handleSubmit} className="signin_form">
          <div className="form_group">
            <label htmlFor="email">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="form_group">
            <label htmlFor="password">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="signin_button"
            disabled={isLoading}
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  )
}
