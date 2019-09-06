import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { BaseContext, NextComponentType } from "next-server/dist/lib/utils";

import { IItinerary } from "../../interfaces/IItinerary";
import { IFilter } from "../../interfaces/IFilter";
import { ICity } from "../../interfaces/ICity";

import filterActions from "../../redux/filters/actions";

import Layout from "../../components/layout";
import Filters from "../../components/complexComponents/filters/filters";

import "../../assets/css/results.css";
import CardInfo from "../../components/cards/info/info";

interface IProps {
  cities: Array<ICity>;
  result: IItinerary[];
}
const Results: NextComponentType<{}, {}, IProps> = ({ cities, result }) => {
  const [searchResults, setSearchResults] = useState<IItinerary[]>(result);
  const filters: IFilter = useSelector<IFilter>(state => state.Filters);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (
      !filters.cities.length &&
      !filters.durations.length &&
      !filters.dates.length &&
      !filters.passengers.length
    ) {
      router.push("/");
    }
    const newResult = async () => {
      const citiesStr = filters.cities.length
        ? `cities[]=${filters.cities.join("&cities[]=")}`
        : "";
      const resultResponse = await axios.get(
        `https://plan.1stquest.com/api/v1/itineraries?${citiesStr}`
      );
      return resultResponse.data.data;
    };
    newResult().then(data => {
      setSearchResults(data);
    });
  }, [filters, result]);

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

  if (
    !filters.cities.length &&
    !filters.durations.length &&
    !filters.dates.length &&
    !filters.passengers.length
  ) {
    return null;
  }
  return (
    <Layout>
      <div className="pl-5 flex items-center h-20">
        <h1 className="sm:text-2xl md:text-3xl uppercase font-bold">
          Iran trip planner
        </h1>
      </div>

      <Filters
        cities={cities}
        filters={filters}
        setDatesFilter={setDatesFilter}
        setDistinationsFilter={setDistinationsFilter}
        setDurationsFilter={setDurationsFilter}
        setPassengersFilter={setPassengersFilter}
        showSubmitButton={false}
      />
      <div className="result-container">
        <div className="results">
          <h2>Plans for 2019 Summer</h2>
          {searchResults.map(item =>
            item.cities.map(city => (
              <CardInfo
                cities={item.cities.map(city => city.name)}
                days={city.days}
                images={city.images}
                price={item.totalPrice}
              />
            ))
          )}
        </div>
        <div className="maps"></div>
      </div>
    </Layout>
  );
};

Results.getInitialProps = async ({ reduxStore }: BaseContext) => {
  const filters = reduxStore.getState().Filters;
  const citiesStr = filters.cities.length
    ? `cities[]=${filters.cities.join("&cities[]=")}`
    : "";
  const citiesResponse = await axios.get(
    "https://plan.1stquest.com/api/v1/cities"
  );

  const resultResponse = await axios.get(
    `https://plan.1stquest.com/api/v1/itineraries?${citiesStr}`
  );

  return {
    cities: citiesResponse.data.data as ICity,
    result: resultResponse.data.data as IItinerary
  };
};
export default Results;
