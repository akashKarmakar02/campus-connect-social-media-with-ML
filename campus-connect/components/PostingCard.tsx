import { Session } from "next-auth";
import React from "react";

function PostingCard({ session }: { session: Session }) {
  return (
    <div className="flex justify-center">
      <div className="bg-white shadow rounded-lg px-8 py-4 flex space-x-4">
        <img
          src={session.user.download_url!}
          alt="Profile image"
          className="w-12 h-12 object-cover rounded-full"
        />
        <input
          type="text"
          placeholder={`What's on your mind, ${session.user.first_name}?`}
          className="w-96 px-4 py-2 outline-none bg-gray-100 rounded-full"
        />
      </div>
    </div>
  );
}

export default PostingCard;
