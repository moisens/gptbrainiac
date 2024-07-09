import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { fetchUserTokenById } from "../../utils/utils.actions";
const Profilepage = async () => {
  const { userId } = auth();
  const currentTokens = await fetchUserTokenById(userId);
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-1 ml-8 text-xl font-extrabold bg">
        Token Ammount:{" "}
        <span className="text-2xl font-light">{currentTokens}</span>{" "}
      </h2>
      <p className="mb-8 text-sm text-red-900 bg-red-100 rounded-md p-1 border border-red-200 mx-4 text-center">
        Note that under 300 tokens, you can no longer chat or create new tour!
        ☝🏼
      </p>
      <UserProfile routing="hash" />
    </div>
  );
};

export default Profilepage;
