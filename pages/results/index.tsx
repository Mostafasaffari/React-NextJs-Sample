import axios from "axios";
import { useRouter } from "next/router";
import Map from "pigeon-maps";
import Overlay from "pigeon-overlay";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseContext, NextComponentType } from "next-server/dist/lib/utils";

import { IItinerary } from "../../interfaces/IItinerary";
import { IFilter } from "../../interfaces/IFilter";
import { ICity } from "../../interfaces/ICity";

import filterActions from "../../redux/filters/actions";

import { getItinerariesByFilters } from "../../services/apiItinerary";

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
  const [showMap, setShowMap] = useState<boolean>(false);
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
      const resultResponse = await getItinerariesByFilters(filters);
      return resultResponse;
    };
    newResult().then(data => {
      // TODO: Set Loading for data fetch
      setSearchResults(data);
    });
  }, [filters]);

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
  if (!searchResults) {
    return null; // TODO: set a beautiful Loading here
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
            item.cities.map((city, index) => (
              <CardInfo
                cities={item.cities.map(city => city.name)}
                days={city.days}
                images={city.images}
                price={item.totalPrice}
                key={index}
              />
            ))
          )}
        </div>
        <div className="maps">
          <Map
            defaultCenter={[33.6416913, 53.6375954]}
            defaultZoom={5}
            width={600}
            height={400}
          >
            {searchResults.map(item => {
              return item.cities.map((city, index) => {
                console.log(parseFloat(city.latitude),parseFloat(city.longitude));

                return (
                  <Overlay anchor={[parseFloat(city.latitude),parseFloat(city.longitude)]} key={index}>
                    <img
                      src={require("../../assets/images/pin.png")}
                      width={32}
                      height={32}
                      alt=""
                    />
                  </Overlay>
                );
              });
            })}
          </Map>
        </div>
      </div>
    </Layout>
  );
};

Results.getInitialProps = async ({ reduxStore }: BaseContext) => {
  //  const filters = reduxStore.getState().Filters;
  const citiesResponse = await axios.get(
    "https://plan.1stquest.com/api/v1/cities"
  );
  return {
    cities: citiesResponse.data.data as ICity
  };
};
export default Results;
