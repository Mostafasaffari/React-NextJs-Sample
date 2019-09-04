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
    <Layout>
      <Header />
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const response = await fetch("https://plan.1stquest.com/api/v1/cities");
  const data = await response.json();
  return { cities: data.data };
};

export default Index;
