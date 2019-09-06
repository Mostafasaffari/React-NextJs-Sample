import { NextComponentType } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

import TableCheck from "../../checkbox/table";
import CheckBox from "../../checkbox";
import Select from "../../select";
import Button from "../../button";
import Box from "../../box";
import { IFilter } from "../../../interfaces/IFilter";
import { ICity } from "../../../interfaces/ICity";

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
const Durations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const Passengers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface IProps {
  filters: IFilter;
  cities: ICity[];
  setDistinationsFilter: (selectedCities: string[]) => void;
  setDatesFilter: (selectedDates: string[]) => void;
  setDurationsFilter: (selectedDuration: number[]) => void;
  setPassengersFilter: (selectedPassenger: number[]) => void;
}
const Filters: NextComponentType<{}, {}, IProps> = ({
  filters,
  cities,
  setDistinationsFilter,
  setDatesFilter,
  setDurationsFilter,
  setPassengersFilter
}) => {
  const [showCities, setShowCities] = useState<boolean>(false);
  const [showDates, setShowDates] = useState<boolean>(false);
  const [showDuration, setShowDuration] = useState<boolean>(false);
  const [showPassenger, setShowPassenger] = useState<boolean>(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<number[]>([]);
  const [selectedPassenger, setSelectedPassenger] = useState<number[]>([]);
  const router = useRouter();
  //#region Cities
  const handleShowCities = () => setShowCities(!showCities);
  const handleApplyCitiesFilter = () => {
    setDistinationsFilter(selectedCities);
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
    setDatesFilter(selectedDates);
    setShowDates(false);
  };
  const handleCancelDatesFilter = () => {
    setShowDates(false);
    setSelectedDates([]);
  };
  const handleSelectDates = (value: string) => (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!selectedDates.includes(value))
      setSelectedDates([...selectedDates, value]);
    else {
      setSelectedDates([...selectedDates.filter(s => s !== value)]);
    }
  };
  //#endregion

  //#region Durations
  const handleShowDuration = () => setShowDuration(!showDuration);
  const handleApplyDurationFilter = () => {
    setDurationsFilter(selectedDuration);
    setShowDuration(false);
  };
  const handleCancelDurationFilter = () => {
    setShowDuration(false);
    setSelectedDuration([]);
  };
  const handleSelectDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const duration = parseInt(event.target.value);
    if (!selectedDuration.includes(duration))
      setSelectedDuration([...selectedDuration, duration]);
    else {
      setSelectedDuration([...selectedDuration.filter(s => s !== duration)]);
    }
  };
  //#endregion

  //#region Passengers
  const handleShowPassenger = () => setShowPassenger(!showPassenger);
  const handleApplyPassengerFilter = () => {
    setPassengersFilter(selectedPassenger);
    setShowPassenger(false);
  };
  const handleCancelPassengerFilter = () => {
    setShowPassenger(false);
    setSelectedPassenger([]);
  };
  const handleSelectPassenger = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passenger = parseInt(event.target.value);
    if (!selectedPassenger.includes(passenger))
      setSelectedPassenger([...selectedPassenger, passenger]);
    else {
      setSelectedPassenger([...selectedPassenger.filter(s => s !== passenger)]);
    }
  };
  //#endregion

  const submitFilters = () => {
    if (
      filters.cities.length ||
      filters.durations.length ||
      filters.dates.length ||
      filters.passengers.length
    ) {
      router.push("/results");
    } else {
      alert("You have to set one filter at least");
    }
  };
  return (
    <div
      id="filterDivider"
      className="mt-32 md:h-20 bg-gray-100 md:mt-10 flex md:items-center md:pl-10 xl:pl-0"
    >
      <div className="container md:mx-auto md:max-w-5xl flex md:items-center">
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
                ? filters.dates.length === 12
                  ? "All Months"
                  : filters.dates
                : `Dates`
            }
            onClick={handleShowDates}
          />
          {showDates && (
            <Box
              showBox={showDates}
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
              <TableCheck
                titles={Dates}
                values={selectedDates}
                onClick={handleSelectDates}
              />
            </Box>
          )}
        </div>
        <div className="relative">
          <Select
            text={
              filters.durations.length > 0
                ? filters.durations.map(item =>
                    item === 1 ? `${item} Week` : `${item} Weeks`
                  )
                : "Duration"
            }
            onClick={handleShowDuration}
          />
          {showDuration && (
            <Box
              showBox={showDuration}
              footerComponent={
                <>
                  <Button
                    color="blue"
                    text="Apply"
                    onClick={handleApplyDurationFilter}
                  ></Button>
                  <Button
                    color="gray"
                    text="Cancel"
                    onClick={handleCancelDurationFilter}
                  ></Button>
                </>
              }
            >
              {Durations.map(item => (
                <CheckBox
                  checked={selectedDuration.includes(item)}
                  key={item}
                  title={item === 1 ? `${item} Week` : `${item} Weeks`}
                  value={`${item}`}
                  onChange={handleSelectDuration}
                />
              ))}
            </Box>
          )}
        </div>
        <div className="relative">
          <Select
            text={
              filters.passengers.length > 0
                ? filters.passengers.map(item =>
                    item === 1 ? `${item} Passenger` : `${item} Passengers`
                  )
                : "Passengers"
            }
            onClick={handleShowPassenger}
          />
          {showPassenger && (
            <Box
              showBox={showPassenger}
              footerComponent={
                <>
                  <Button
                    color="blue"
                    text="Apply"
                    onClick={handleApplyPassengerFilter}
                  ></Button>
                  <Button
                    color="gray"
                    text="Cancel"
                    onClick={handleCancelPassengerFilter}
                  ></Button>
                </>
              }
            >
              {Passengers.map(item => (
                <CheckBox
                  checked={selectedPassenger.includes(item)}
                  key={item}
                  title={
                    item === 1 ? `${item} Passenger` : `${item} Passengers`
                  }
                  value={`${item}`}
                  onChange={handleSelectPassenger}
                />
              ))}
            </Box>
          )}
        </div>
        <div className="relative">
          <Button color="orange" text="Search" onClick={submitFilters} />
        </div>
      </div>
    </div>
  );
};
export default Filters;
