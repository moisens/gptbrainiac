import TourCard from "./TourCard";

const ToursList = ({ data }) => {
  if (data.length === 0) return <h2>There is no tours to display! 🫤</h2>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 px-4">
      {data.map((tour) => {
        const { id } = tour;
        return <TourCard tour={tour} key={id} />;
      })}
    </div>
  );
};

export default ToursList;
