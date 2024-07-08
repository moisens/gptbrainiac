"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import TourInfo from "./TourInfo.jsx";
import {
  createNewTour,
  generateTourResponse,
  getExistingTour,
} from "../utils/utils.actions.js";
import toast from "react-hot-toast";

const NewTour = () => {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;

      const newTour = await generateTourResponse(destination);
      if (newTour) {
        const response = await createNewTour(newTour);
        //console.log(response);
        queryClient.invalidateQueries({ queryKey: ["tours"] });
        return newTour;
      }

      toast.error("Brainiac couldn't found the city! 🤖");
      return null;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination);
  };

  if (isPending)
    return <span className="loading loading-ring loading-lg"></span>;

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
