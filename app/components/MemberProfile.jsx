import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { fetchOrGenerateTokensForUser } from "../utils/utils.actions";

const MemberProfile = async () => {
  const user = await currentUser();
  const { firstName, lastName, imageUrl } = user;
  const { userId } = auth();

  await fetchOrGenerateTokensForUser(userId);

  return (
    <div className="px-4 flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
      <div className="flex flex-col gap-0">
        <p className="text-base text-white bg-gray-700 semibold px-2 rounded-md">{`${user.firstName} ${user.lastName}`}</p>
        <p className="text-xs text-gray-600 font-light px-2">
          {user.emailAddresses[0].emailAddress}
        </p>
      </div>
    </div>
  );
};

export default MemberProfile;
