import { NextComponentType } from "next";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

interface ICity {
  name: string;
  slug: string;
  latitude: string;
  longitude: string;
}
interface IProps {
  cities: Array<ICity>;
}
const Index: NextComponentType<{}, {}, IProps> = ({ cities }) => {
  return (
    <h1>
      Hello Mostafa{" "}
      <Link href="/results">
        <a>Go to results</a>
      </Link>
    </h1>
  );
};

Index.getInitialProps = async () => {
  const response = await fetch("https://plan.1stquest.com/api/v1/cities");
  const data = await response.json();
  return { cities: data.data };
};

export default Index;
