"use client";

import TourInfo from "./TourInfo.jsx";

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const destination = Object.fromEntries(formData.entries());
  console.log(destination);
};

const NewTour = () => {
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
          <input type="text" className="input" placeholder="city" name="city" />
          <input
            type="text"
            className="input"
            placeholder="country"
            name="country"
          />
          <button type="submit" className="btn btn-primary join-item">
            generate tour
          </button>
        </div>
      </form>
      <div className="mt-16">
        <TourInfo />
      </div>
    </>
  );
};

export default NewTour;
