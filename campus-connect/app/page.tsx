import PostingCard from "@/components/PostingCard";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

async function page() {
  const session = await getServerSession(options);

  const response = await fetch("http://127.0.0.1:8000/api/post/", {
    headers: { Authorization: `bearer ${session?.user.jwt}` },
  });

  const data: Post[] = await response.json();
  console.log(data);

  return <div>{session ? <PostingCard session={session} /> : <div></div>}</div>;
}

export default page;
