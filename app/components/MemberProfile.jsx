import { currentUser, UserButton, auth } from "@clerk/nextjs";

const MemberProfile = async () => {
  const user = await currentUser();
  //console.log(user);
  return (
    <div className="px-4 flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
      <div className="flex flex-col gap-0">
        <p className="text-base text-black semibold">{`${user.firstName} ${user.lastName}`}</p>
        <p className="text-xs text-gray-600 font-light">
          {user.emailAddresses[0].emailAddress}
        </p>
      </div>
    </div>
  );
};

export default MemberProfile;
