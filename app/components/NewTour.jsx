"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import TourInfo from "./TourInfo.jsx";
import {
  createNewTour,
  fetchUserTokenById,
  generateTourResponse,
  getExistingTour,
  substractUserTokens,
} from "../utils/utils.actions.js";
import toast from "react-hot-toast";
import { capitalize } from "../utils/utils.capitalize";
import { useAuth } from "@clerk/nextjs";

const NewTour = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;

      const currentTokens = await fetchUserTokenById(userId);
      if (currentTokens < 300) {
        toast.error("Token balance too low... 😱");
        return;
      }

      const newTour = await generateTourResponse(destination);
      if (!newTour) {
        toast.error("I couldn't found the city! 🤖");
        return null;
      }

      const response = await createNewTour(newTour.tour);
      //console.log(response);
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      const newTokens = await substractUserTokens(userId, newTour.tokens);
      toast.success(`${newTokens} tokens remaining. ⏳`);
      return newTour.tour;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());

    if (destination.city) destination.city = capitalize(destination.city);
    if (destination.country)
      destination.country = capitalize(destination.country);

    mutate(destination);
  };

  if (isPending)
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="max-w-2xl my-12">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="city"
            name="city"
          />
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="country"
            name="country"
          />
          <button type="submit" className="btn btn-primary join-item">
            generate tour
          </button>
        </div>
      </form>
      <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
    </div>
  );
};

export default NewTour;
