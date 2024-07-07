import Link from "next/link.js";

const TourCard = ({ tour }) => {
  const { id, title, city, country } = tour;
  return (
    <Link
      href={`/tours/${id}`}
      className="card card-compact rounded-xl bg-base-100 shadow-sm transition-all hover:shadow-lg hover:scale-110 hover:transition-all"
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title text-center">{`${title}.`}</h2>
        <h4 className="text-base justify-end">
          {city}, {country}
        </h4>
      </div>
    </Link>
  );
};

export default TourCard;
