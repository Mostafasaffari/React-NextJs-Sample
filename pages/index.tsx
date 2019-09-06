import { NextComponentType } from "next";
import fetch from "isomorphic-unfetch";
import { useDispatch, useSelector } from "react-redux";

import { BaseContext } from "next-server/dist/lib/utils";

import { ICity } from "../interfaces/ICity";
import { IFilter } from "../interfaces/IFilter";

import filterActions from "../redux/filters/actions";

import Layout from "../components/layout";
import Header from "../components/header";

import "../assets/css/home/home.css";
import Filters from "../components/complexComponents/filters/filters";

interface IProps {
  cities: Array<ICity>;
}

const Index: NextComponentType<{}, {}, IProps> = ({ cities }) => {
  const filters: IFilter = useSelector<IFilter>(state => state.Filters);
  const dispatch = useDispatch();

  const setDistinationsFilter = selectedCities => {
    dispatch(filterActions.setDistinations(selectedCities));
  };
  const setDatesFilter = selectedDates => {
    dispatch(filterActions.setDates(selectedDates));
  };
  const setDurationsFilter = selectedDuration => {
    dispatch(filterActions.setDurations(selectedDuration));
  };
  const setPassengersFilter = selectedPassenger => {
    dispatch(filterActions.setPassengers(selectedPassenger));
  };

  return (
    <Layout className="bgdefault bg-no-repeat xl:bg-cover">
      <Header />
      <div
        id="slogan"
        className="container mx-auto max-w-5xl text-white pt-20 md:pl-10 xl:pl-0"
      >
        <h2 className="text-5xl font-bold tracking-wide">
          Plan Your trip to Iran
        </h2>
        <p className="max-w-2xl text-2xl tracking-wide">
          Find or create your best plan to visit Iran based on +300 plans
          designed by professional tour guides and travelers
        </p>
      </div>
      <Filters
        cities={cities}
        filters={filters}
        setDatesFilter={setDatesFilter}
        setDistinationsFilter={setDistinationsFilter}
        setDurationsFilter={setDurationsFilter}
        setPassengersFilter={setPassengersFilter}
      />
    </Layout>
  );
};

Index.getInitialProps = async ({ reduxStore }: BaseContext) => {
  const response = await fetch("https://plan.1stquest.com/api/v1/cities");
  const data = await response.json();
  return { cities: data.data };
};

export default Index;
