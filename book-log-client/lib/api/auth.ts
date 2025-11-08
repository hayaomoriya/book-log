import { Result, ok, err } from "neverthrow";
import { UserSchema } from "../schema";

export async function signin(email: string, password: string) {
  try {
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && typeof data.token === "string") {
      return ok(data.token);
    } else if (typeof data.message === "string") {
      return err(data.message);
    } else {
      return err(response.statusText);
    }
  } catch (error) {
    return err(error);
  }
}

export async function signup(email: string, password: string, name: string) {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (response.ok && typeof data.token === "string") {
      return ok(data.token);
    } else if (typeof data.message === "string") {
      return err(data.message);
    } else {
      return err(response.statusText);
    }
  } catch (error) {
    return err(error);
  }
}

export async function signout(token: string) {
  try {
    const response = await fetch("/api/signout", {
      method: "GET",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return ok(true);
    } else {
      return err(response.statusText);
    }
  } catch (error) {
    return err(error);
  }
}

export async function getUser(token: string) {
  try {
    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const result = UserSchema.safeParse(data);

    if (response.ok && result.success) {
      return ok(result.data);
    } else {
      return err(response.statusText);
    }
  } catch (error) {
    return err(error);
  }
}
