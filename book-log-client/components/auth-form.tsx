"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FormMode = "signin" | "signup";

export function AuthForm() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<FormMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result =
      mode === "signin"
        ? await signIn(email, password)
        : await signUp(email, password, name);

    if (result.isOk()) {
      router.push("/dashboard");
    } else {
      const message =
        typeof result.error === "string" ? result.error : "認証に失敗しました";
      setError(message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            {mode === "signin" ? "ログイン" : "サインアップ"}
          </CardTitle>
          <CardDescription>
            {mode === "signin"
              ? "あなたの読書記録にアクセスしましょう"
              : "新しいアカウントを作成してください"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-sm font-medium mb-1 block">名前</label>
                <Input
                  type="text"
                  placeholder="山田太郎"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">
                メールアドレス
              </label>
              <Input
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                パスワード
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "処理中..."
                : mode === "signin"
                  ? "ログイン"
                  : "サインアップ"}
            </Button>
          </form>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center mb-3">
              {mode === "signin"
                ? "アカウントを持っていませんか？"
                : "既にアカウントを持っていますか？"}
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError("");
              }}
              disabled={isLoading}
            >
              {mode === "signin" ? "サインアップ" : "ログイン"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
