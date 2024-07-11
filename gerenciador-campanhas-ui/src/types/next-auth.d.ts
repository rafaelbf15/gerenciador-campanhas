import NextAuth from "next-auth";

// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
// Define a role enum



// common interface for JWT and Session
interface IUser extends DefaultUser {
  id: string;
  accessToken: string;
  nome: string;
  email: string;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user: User;
  }
  interface SignInResponse extends Session {
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
