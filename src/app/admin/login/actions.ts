"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, checkAdminCredentials, createSessionToken } from "@/lib/admin-auth";

export interface LoginState {
  error: string | null;
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const valid = await checkAdminCredentials(email, password);
  if (!valid) {
    return { error: "Email ou mot de passe incorrect." };
  }

  const token = await createSessionToken(email);
  cookies().set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60,
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  cookies().delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
