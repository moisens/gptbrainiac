import Link from "next/link";
import { generateTourImage, getSingleTour } from "../../../utils/utils.actions";
import { redirect } from "next/navigation";
import TourInfo from "../../../components/TourInfo";
import Image from "next/image";

const SingleTourpage = async ({ params }) => {
  const tour = await getSingleTour(params.id);
  if (!tour) redirect("/tours");

  const tourImage = await generateTourImage({
    city: tour.city,
    country: tour.country,
  });

  return (
    <div>
      <Link href="/tours" className="btn btn-primary mb-12">
        back to tour
      </Link>
      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            alt={tour.title}
            title={tour.title}
            width={512}
            height={512}
            priority
            className="rounded-xl shadow-sm mb-16 max-full h-96 object-cover"
          />
        </div>
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourpage;
