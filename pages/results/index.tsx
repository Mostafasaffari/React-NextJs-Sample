import Link from "next/link";
import Layout from "../../components/layout";

const Results = () => {
  return (
    <Layout>
      <h1>Results</h1>
      <Link href="/detail/[slug]" as="detail/234">
        <a>Go to Details</a>
      </Link>
    </Layout>
  );
};
export default Results;
