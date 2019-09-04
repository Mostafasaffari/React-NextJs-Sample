import { NextComponentType } from "next";
import fetch from "isomorphic-unfetch";

import Layout from "../components/layout";
import Header from "../components/header";

import "../assets/css/home/home.css";

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
    <Layout className="bgdefault bg-no-repeat xl:bg-cover">
      <Header />
      <div
        id="slogan"
        className="container mx-auto max-w-5xl text-white pt-20 md:pl-10"
      >
        <h2 className="text-5xl font-bold tracking-wide">
          Plan Your trip to Iran
        </h2>
        <p className="max-w-2xl text-2xl tracking-wide">
          Find or create your best plan to visit Iran based on +300 plans
          designed by professional tour guides and travelers
        </p>
      </div>
      <div id="filterDivider" className="h-20 bg-gray-100 mt-10"></div>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const response = await fetch("https://plan.1stquest.com/api/v1/cities");
  const data = await response.json();
  return { cities: data.data };
};

export default Index;
