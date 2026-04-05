import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    balance: number;
    role: string;
  }

  interface Session {
    user: User & {
      id: string;
      balance: number;
      role: string;
    };
  }
}
