const TourInfo = ({ tour }) => {
  const { title, description, stops } = tour;
  let stopId = crypto.randomUUID();
  return (
    <div className="max-w-2xl px-4">
      <h1 className="text-4xl font-semibold mb-4">{title}</h1>
      <p className="leading-loose mb-6">{description}</p>
      <ul>
        {stops.map((stop, stopId) => (
          <li
            key={stopId}
            className="mb-4 bg-base-100 p4 rounded-xl shadow-sm transition-all hover:shadow-lg hover:scale-105 hover:transition-all"
          >
            <p className="leading-normal p-4">{stop}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourInfo;
