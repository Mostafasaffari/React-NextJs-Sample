import { NextComponentType } from "next";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

import Layout from "../components/layout";
//import { useEffect } from "react";
//import Router from "next/router";

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
  //   useEffect(() => {
  //     Router.beforePopState(({ as }) => {
  //       location.href = as;
  //       return false;
  //     });
  //   });
  return (
    <Layout>
      <h1 className="flex-col bg-gray-500 justify-center">
        Hello Mostafa{" " + cities[0].name}
        <Link href="/results" as={"/results"} prefetch>
          <a className="flex bg-purple-500">Go to results</a>
        </Link>
      </h1>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const response = await fetch("https://plan.1stquest.com/api/v1/cities");
  const data = await response.json();
  return { cities: data.data };
};

export default Index;
