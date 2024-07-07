"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../utils/utils.actions";
import ToursList from "./ToursList";
import { useState } from "react";

const ToursPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["tours", searchTerm],
    queryFn: () => getAllTours(searchTerm),
  });

  return (
    <>
      <form className="max-w-lg my-12">
        <div className="join w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            className="input input-bordered join-item w-full"
          />
          <button
            className="btn btn-primary join-item"
            type="button"
            disabled={isPending}
            onClick={() => setSearchTerm("")}
          >
            {isPending ? "wait..." : "reset"}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : (
        <ToursList data={data} />
      )}
    </>
  );
};

export default ToursPage;
