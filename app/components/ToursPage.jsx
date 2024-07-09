"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../utils/utils.actions";
import ToursList from "./ToursList";
import { useState } from "react";
import { capitalize } from "../utils/utils.capitalize";

const ToursPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["tours", searchTerm],
    queryFn: () => getAllTours(searchTerm),
  });

  return (
    <div>
      <form className="max-w-lg px-4 my-12">
        <div className="join w-full">
          <input
            type="text"
            value={capitalize(searchTerm)}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            className="input input-bordered join-item w-full"
            placeholder="search a city or a country..."
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
    </div>
  );
};

export default ToursPage;
