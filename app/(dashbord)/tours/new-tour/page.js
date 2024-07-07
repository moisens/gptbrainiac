import NewTour from "../../../components/NewTour";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Newtourpage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary>
      <NewTour />
    </HydrationBoundary>
  );
};

export default Newtourpage;
