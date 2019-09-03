import Link from "next/link";

const Index = () => {
  return (
    <h1>
      Hello Mostafa{" "}
      <Link href="/results">
        <a>Go to results</a>
      </Link>
    </h1>
  );
};

export default Index;
