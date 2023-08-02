import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      download_url: string | null;
      jwt: string;
    };
  }
}
