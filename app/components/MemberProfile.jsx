import { currentUser, UserButton, auth } from "@clerk/nextjs";

const MemberProfile = async () => {
  const user = await currentUser();
  return (
    <div className="px-4 flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
      {user.emailAddresses[0].emailAddress}
    </div>
  );
};

export default MemberProfile;
