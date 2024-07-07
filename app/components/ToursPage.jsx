"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../utils/utils.actions";
import ToursList from "./ToursList";

const ToursPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getAllTours(),
  });
  return (
    <>
      {isPending ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : (
        <ToursList data={data} />
      )}
    </>
  );
};

export default ToursPage;
