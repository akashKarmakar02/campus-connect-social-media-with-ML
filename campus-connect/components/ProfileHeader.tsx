import { Session } from "next-auth";
import Image from "next/image";

function ProfileHeader({ session }: { session: Session }) {
  return (
    <div className="flex bg-white shadow rounded-xl px-8 py-3">
      <div className="relative w-40 h-40 rounded-xl">
        <Image
          src={session.user.download_url!}
          className="rounded-full border-4 border-white"
          fill
          objectFit="cover"
          alt={""}
        />
      </div>
      <div className="flex flex-rows items-start ml-4 mt-4 bg-white text-3xl font-bold">
        {`${session.user.first_name} ${session.user.last_name}`}
      </div>
    </div>
  );
}

export default ProfileHeader;
