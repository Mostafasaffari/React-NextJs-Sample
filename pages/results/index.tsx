import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { IFilter } from "../../interfaces/IFilter";

import Layout from "../../components/layout";

const Results = () => {
  const filters: IFilter = useSelector<IFilter>(state => state.Filters);
  const dispatch = useDispatch();
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
