"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Result, ok, err } from "neverthrow";

import { getUser, signin, signout, signup } from "./api/auth";
import { User } from "./schema";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    name: string,
  ) => Promise<Result<void, unknown>>;
  signIn: (email: string, password: string) => Promise<Result<void, unknown>>;
  signOut: () => Promise<Result<void, unknown>>;
  getToken: () => Result<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("reading-log-token");
    if (token) {
      getUser(token).then((result) => {
        if (result.isOk()) {
          setUser(result.value);
        } else {
          setUser(null);
          console.error(result.error);
        }
        setIsLoading(false);
      });
    } else {
      console.error("Token not found");
      setIsLoading(false);
    }
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const tokenResult = await signup(email, password, name);
    if (tokenResult.isOk()) {
      const token = tokenResult.value;
      localStorage.setItem("reading-log-token", token);
      const userResult = await getUser(token);
      if (userResult.isOk()) {
        setUser(userResult.value);
        return ok();
      } else {
        setUser(null);
        return err(userResult.error);
      }
    } else {
      return err(tokenResult.error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const tokenResult = await signin(email, password);
    if (tokenResult.isOk()) {
      const token = tokenResult.value;
      localStorage.setItem("reading-log-token", token);
      const userResult = await getUser(token);
      if (userResult.isOk()) {
        setUser(userResult.value);
        return ok();
      } else {
        setUser(null);
        return err(userResult.error);
      }
    } else {
      return err(tokenResult.error);
    }
  };

  const signOut = async () => {
    const token = localStorage.getItem("reading-log-token");
    if (token) {
      const result = await signout(token);
      if (!result.isOk()) {
        return err(result.error);
      }
    }
    setUser(null);
    localStorage.removeItem("reading-log-token");
    return ok();
  };

  const getToken = () => {
    const token = localStorage.getItem("reading-log-token");
    if (!token) {
      return err("Token not found");
    }
    return ok(token);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signUp, signIn, signOut, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
