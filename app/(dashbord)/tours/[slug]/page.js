import Link from "next/link";
import { getSingleTour } from "../../../utils/utils.actions";
import { redirect } from "next/navigation";
import TourInfo from "../../../components/TourInfo";
import Image from "next/image";
import axios from "axios";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourpage = async ({ params }) => {
  const tour = await getSingleTour(params.slug);
  if (!tour) redirect("/tours");

  //? Unsplash API
  const { data } = await axios.get(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls.raw;

  //? openai
  //const tourImage = await generateTourImage({
  //  city: tour.city,
  //  country: tour.country,
  //});

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-auto px-4 my-12">
        <Link href="/tours" className="btn btn-primary">
          back to tour
        </Link>
      </div>
      {tourImage ? (
        <div className="max-w-2xl rounded-xl shadow-lg mx-4 mb-16">
          <Image
            src={tourImage}
            alt={tour.title}
            title={tour.title}
            width={672}
            height={672}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
            priority
            className="rounded-xl h-96"
          />
        </div>
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourpage;
