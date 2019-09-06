import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { IFilter } from "../../interfaces/IFilter";

import Layout from "../../components/layout";
import { useEffect } from "react";

const Results = () => {
  const filters: IFilter = useSelector<IFilter>(state => state.Filters);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (
      !filters.cities.length ||
      !filters.durations.length ||
      !filters.dates.length ||
      !filters.passengers.length
    ) {
      router.push("/");
    }
  }, []);

  if (
    !filters.cities.length ||
    !filters.durations.length ||
    !filters.dates.length ||
    !filters.passengers.length
  ) {
    return null;
  }
  return (
    <Layout>
      <h1>{filters.cities}</h1>
      <Link href="/detail/[slug]" as="detail/234">
        <a>Go to Details</a>
      </Link>
    </Layout>
  );
};
export default Results;
