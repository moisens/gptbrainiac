import Link from "next/link";
import { getSingleTour } from "../../../utils/utils.actions";
import { redirect } from "next/navigation";
import TourInfo from "../../../components/TourInfo.jsx";

const SingleTourpage = async ({ params }) => {
  const tour = await getSingleTour(params.id);
  if (!tour) redirect("/tours");

  return (
    <div>
      <Link href="/tours" className="btn btn-primary mb-12">
        back to tour
      </Link>
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourpage;
