import { useState } from "react";
import { NextComponentType } from "next";
import fetch from "isomorphic-unfetch";
import { useDispatch, useSelector } from "react-redux";

import { BaseContext } from "next-server/dist/lib/utils";
import { ICity } from "../interfaces/ICity";
import { IFilter } from "../interfaces/IFilter";

import filterActions from "../redux/filters/actions";

import Layout from "../components/layout";
import Header from "../components/header";
import Select from "../components/select/select";
import Button from "../components/button";
import Box from "../components/box/box";

import "../assets/css/home/home.css";
import CheckBox from "../components/checkbox/checkbox";
interface IProps {
  cities: Array<ICity>;
}
const Dates = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const Index: NextComponentType<{}, {}, IProps> = ({ cities }) => {
  const [showCities, setShowCities] = useState<boolean>(false);
  const [showDates, setShowDates] = useState<boolean>(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const filters = useSelector<IFilter>(state => state.Filters);
  const dispatch = useDispatch();

  //#region Cities
  const handleShowCities = () => setShowCities(!showCities);
  const handleApplyCitiesFilter = () => {
    dispatch(filterActions.setDistinations(selectedCities));
    setShowCities(false);
  };
  const handleCancelCitiesFilter = () => {
    setShowCities(false);
    setSelectedCities([]);
  };
  const handleSelectCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    if (!selectedCities.includes(city))
      setSelectedCities([...selectedCities, city]);
    else {
      setSelectedCities([...selectedCities.filter(s => s !== city)]);
    }
  };
  //#endregion

  //#region Dates
  const handleShowDates = () => setShowDates(!showDates);
  const handleApplyDatesFilter = () => {
    dispatch(filterActions.setDates(selectedDates));
  };
  const handleCancelDatesFilter = () => {
    setShowDates(false);
    setSelectedDates([]);
  };
  //#endregion
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
      <div
        id="filterDivider"
        className="h-20 bg-gray-100 mt-10 flex items-center"
      >
        <div className="container mx-auto max-w-5xl flex items-center">
          <div className="relative">
            <Select
              text={filters.cities.length > 0 ? filters.cities : "Destinations"}
              onClick={handleShowCities}
            />
            {showCities && (
              <Box
                showBox={showCities}
                footerComponent={
                  <>
                    <Button
                      color="blue"
                      text="Apply"
                      onClick={handleApplyCitiesFilter}
                    ></Button>
                    <Button
                      color="gray"
                      text="Cancel"
                      onClick={handleCancelCitiesFilter}
                    ></Button>
                  </>
                }
              >
                {cities.map(item => (
                  <CheckBox
                    checked={selectedCities.includes(item.slug)}
                    key={item.slug}
                    title={item.name}
                    value={item.slug}
                    onChange={handleSelectCity}
                  />
                ))}
              </Box>
            )}
          </div>
          <div className="relative">
            <Select
              text={
                filters.dates.length > 0
                  ? filters.date.length === 12
                    ? "All Months"
                    : filters.dates
                  : `Dates`
              }
              onClick={handleShowDates}
            />
            {showDates && (
              <Box
                showBox={showCities}
                footerComponent={
                  <>
                    <Button
                      color="blue"
                      text="Apply"
                      onClick={handleApplyDatesFilter}
                    ></Button>
                    <Button
                      color="gray"
                      text="Cancel"
                      onClick={handleCancelDatesFilter}
                    ></Button>
                  </>
                }
              >
                {Dates.map(item => item)}
              </Box>
            )}
          </div>
          <div className="relative">
            <Select text={`Duration`} />
          </div>
          <div className="relative">
            <Select text={`Passengers`} />
          </div>
          <div className="relative">
            <Select text={`Budget Range`} />
          </div>
          <div className="relative">
            <Button color="orange" text="Search" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async ({ reduxStore }: BaseContext) => {
  const response = await fetch("https://plan.1stquest.com/api/v1/cities");
  const data = await response.json();
  return { cities: data.data };
};

export default Index;
