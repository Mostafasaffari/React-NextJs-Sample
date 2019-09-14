import { useEffect } from "react";
import { useRouter } from "next/router";
import { BaseContext, NextComponentType } from "next-server/dist/lib/utils";

import { IError } from "../../interfaces/IError";
import { IItinerary } from "../../interfaces/IItinerary";

import { getItinerariesBySlug } from "../../services/apiItinerary";

import Layout from "../../components/layout/layout";
import Header from "../../components/header/header";

import "../../assets/css/detail.css";

interface IProps {
  itinerary: IItinerary | null;
  initSlug: string | null;
  error?: IError;
}
const Detail: NextComponentType<{}, {}, IProps> = ({
  itinerary,
  initSlug,
  error
}) => {
  const router = useRouter();
  const { slug = initSlug } = router.query;

  useEffect(() => {
    if (error && error.message) {
      alert(error.message);
    }
    if (itinerary === null) {
      //  router.push("/");
    }
  }, []);
  if (itinerary === null) {
    // return null;
  }
  return (
    <Layout className="bgdefault bg-no-repeat xl:bg-cover">
      <Header />
      <div
        id="details"
        className="container mx-auto max-w-6xl text-white pt-20 md:pl-10 xl:pl-0 md:mb-10"
      >
        <span>1stQuest / Iran Trip Planner</span>
        <h2 className="text-5xl md:text-3xl font-bold tracking-wide">
          9 days in Tehran, Shiraz, and Isfahan
        </h2>
        <p className="max-w-3xl text-1xl tracking-wide">
          During your Persia travel, you will explore Iran’s rich history and
          amazing culture visiting the most famous historical cities of Persia
          in 11 days of Persia Tour. This package fits those who seek to have a
          unique experience of Iran’s culture and history. Our guides are
          handpicked locals who know the cities well, are friendly, and have
          experience in what they do. They will help you with everything during
          your Persia tour.
        </p>
        <a href="https://1stquest.com" className="underline">Read Story of this plan on <span className="text-yellow-500"> 1stQuest Blog</span></a>
      </div>
      <div className="timeline">
        <div className="start-timeline">
          <span>Trip Timeline</span>
        </div>
      </div>
    </Layout>
  );
};
Detail.getInitialProps = async ({ query }: BaseContext) => {
  if (query && query.slug) {
    try {
      const data = await getItinerariesBySlug(query.slug);
      return { itinerary: data, initSlug: query.slug };
    } catch (error) {
      return { itinerary: null, initSlug: null, error: error };
    }
  }
  return { itinerary: null, initSlug: null };
};

export default Detail;
