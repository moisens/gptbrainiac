import { auth, UserProfile } from "@clerk/nextjs";
import { fetchUserTokenById } from "../../utils/utils.actions";
const Profilepage = async () => {
  const { userId } = auth();
  const currentTokens = await fetchUserTokenById(userId);
  return (
    <div>
      <h2 className="mb-8 ml-8 text-xl font-extrabold">
        Token Ammount:{" "}
        <span className="text-2xl font-light">{currentTokens}</span>{" "}
      </h2>
      <UserProfile />
    </div>
  );
};

export default Profilepage;
