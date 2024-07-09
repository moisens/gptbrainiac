import { currentUser } from "@clerk/nextjs/server";
import Chat from "../../components/Chat";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Chatpage = async () => {
  const queryClient = new QueryClient();
  const { firstName, lastName, imageUrl } = await currentUser();
  const userData = { firstName, lastName, imageUrl };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat userData={userData} />
    </HydrationBoundary>
  );
};

export default Chatpage;
