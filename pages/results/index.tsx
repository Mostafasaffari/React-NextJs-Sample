import Link from "next/link";

const Results = () => {
  return (
    <>
      <h1>Results</h1>
      <Link href="/detail/[slug]" as="detail/234">
        <a>Go to Details</a>
      </Link>
    </>
  );
};
export default Results;
