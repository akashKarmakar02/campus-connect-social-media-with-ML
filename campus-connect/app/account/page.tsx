import { getServerSession } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { options } from "../api/auth/[...nextauth]/options";
import ProfileHeader from "@/components/ProfileHeader";

export default async function Home() {
  const session = await getServerSession(options);

  const response = await fetch("http://127.0.0.1:8000/api/post/", {
    headers: { Authorization: `bearer ${session?.user.jwt}` },
  });

  const data: Post[] = await response.json();
  console.log(data);

  return (
    <main className="justify-between">
      {session ? (
        <>
          <ProfileHeader session={session} />
        </>
      ) : (
        <h1>Please Login</h1>
      )}
    </main>
  );
}
